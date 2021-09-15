# co

## 前情提示

Generator based control flow goodness for nodejs and the browser, using promises, letting you write non-blocking code in
a nice-ish way.

### 如何快速了解源码的大致作用

直接看相关部分的测试用例

### 生成器函数的constructor.name => 'GeneratorFunction'

```js
function* gen () {}

console.log('gen.constructor.name =>', gen.constructor.name)
```

### 生成器函数写法

> [generator function](https://es6.ruanyifeng.com/#docs/generator)

ES6 没有规定，function关键字与函数名之间的星号，写在哪个位置。这导致下面的写法都能通过。

```
function * foo(x, y) { ··· }
function *foo(x, y) { ··· }
function* foo(x, y) { ··· }
function*foo(x, y) { ··· }
```

由于 Generator 函数仍然是普通函数，所以一般的写法是上面的第三种，即星号紧跟在function关键字后面。

### generator function return a generator

### assert 的用法

别名是 assert.ok

要求输入的是一个真值

```
assert(1) => 断言通过
assert(-1) => 断言通过
assert(0) => 断言失败
assert(~-1) => 断言失败
```

### `~` 运算符

正数补码：原码取反加一得补码，补码减一取反得原码。 负数补码：符号位不变，原码取反再加一

```
~100 => -101
~-101 => 100
```

## 分模块解析

### 主函数 co

```js
function co (gen) {
  // 提示 gen 应该是一个生成器函数 


  var ctx = this;
  // 获取传给 co 的第二个及以后的参数
  var args = slice.call(arguments, 1);

  // we wrap everything in a promise to avoid promise chaining,
  // which leads to memory leak errors.
  // see https://github.com/tj/co/issues/180
  return new Promise(function (resolve, reject) {
    // 如果传进来的是个函数，则把后面的参数传给函数，执行，然后赋值给gen， 此时 gen 变成了遍历器对象
    if (typeof gen === 'function') gen = gen.apply(ctx, args);
    // 如果原先的 gen 是一个普通函数，那么新的 gen 应该就是结果，没结果的话直接 resolve 
    // 这里认为如果 新的gen 没有 next 方法， 则 新的gen 就是结果, 直接 resolve
    if (!gen || typeof gen.next !== 'function') return resolve(gen);

    onFulfilled();

    /**
     * @param {Mixed} res
     * @return {Promise}
     * @api private
     */

    function onFulfilled (res) {
      var ret;
      try {
        // 执行
        ret = gen.next(res);
      } catch (e) {
        return reject(e);
      }
      next(ret);
      return null;
    }

    /**
     * @param {Error} err
     * @return {Promise}
     * @api private
     */

    function onRejected (err) {
      var ret;
      try {
        ret = gen.throw(err);
      } catch (e) {
        return reject(e);
      }
      next(ret);
    }

    /**
     * Get the next value in the generator,
     * return a promise.
     *
     * @param {Object} ret
     * @return {Promise}
     * @api private
     */

    function next (ret) {
      // 遍历是否结束，是则返回最后的值
      if (ret.done) return resolve(ret.value);
      // 否则先转成 promise 再继续传递
      var value = toPromise.call(ctx, ret.value);
      if (value && isPromise(value)) return value.then(onFulfilled, onRejected);
      // 不符合条件抛出异常
      return onRejected(new TypeError('You may only yield a function, promise, generator, array, or object, '
        + 'but the following object was passed: "' + String(ret.value) + '"'));
    }
  });
}
```

### 辅助函数

#### toPromise

```js
function toPromise (obj) {
  if (!obj) return obj;
  // 如果 obj 是 promise 对象的话, 直接return
  if (isPromise(obj)) return obj;
  // 如果 obj 是 生成器函数 或者 遍历器对象, 直接调用
  if (isGeneratorFunction(obj) || isGenerator(obj)) return co.call(this, obj);
  // 如果 obj 只是 普通函数, 则转换成 promise
  if ('function' == typeof obj) return thunkToPromise.call(this, obj);
  // 如果 obj 是 一个数组, 则转换成 promise 数组
  if (Array.isArray(obj)) return arrayToPromise.call(this, obj);
  // 如果 obj 是 一个纯对象, 则尝试转换成 promise 对象
  if (isObject(obj)) return objectToPromise.call(this, obj);
  return obj;
}
```

#### thunkToPromise

```js
function thunkToPromise (fn) {
  // 保证不管是谁调用的，this 指针都能指向调用者
  var ctx = this;
  return new Promise(function (resolve, reject) {
    fn.call(ctx, function (err, res) {
      if (err) return reject(err);
      // 注意 这边的 arguments 实际上说的是 err, res 这个 function 的 arguments
      if (arguments.length > 2) res = slice.call(arguments, 1);
      resolve(res);
    });
  });
}

// for example
function test () {
  var ctx = this;
  return new Promise(function (resolve, reject) {
    console.log('ctx =>', ctx)
  });
}

test() // ctx => [globalThis]
test2.call({name: 'for example'}) // ctx => {name: 'for example'} 

function test2 () {
  return new Promise(function (resolve, reject) {
    console.log('this =>', this)
  });
}

testw() // this => [globalThis]
test2.call({name: 'for example'}) // this => [globalThis] 


// other
// 再无其他要素的情况下 其实可以使用箭头函数
// 但是由于这边要使用 arguments，奈何箭头函数没有 arguments

function test3 () {
  return new Promise((resolve, reject) => {
    console.log('this =>', this)
  });
}
```

#### arrayToPromise

```js

function arrayToPromise (obj) {
  return Promise.all(obj.map(toPromise, this));
}

```

#### objectToPromise

```js
function objectToPromise (obj) {
  var results = new obj.constructor();
  var keys = Object.keys(obj);
  var promises = [];
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var promise = toPromise.call(this, obj[key]);
    // 值得注意
    if (promise && isPromise(promise)) defer(promise, key);
    // 不是 promise 对象，直接标记到结果上就行了
    else results[key] = obj[key];
  }
  
  // 仅执行 obj 中的 promise，执行完返回全部结果 
  return Promise.all(promises).then(function () {
    return results;
  });

  function defer (promise, key) {
    // predefine the key in the result
    results[key] = undefined;
    promises.push(promise.then(function (res) {
      // promise 执行完，标记到结果上
      results[key] = res;
    }));
  }
}

```

#### some check function

```js

// 简单的判断是不是 promise 对象
function isPromise (obj) {
  return 'function' == typeof obj.then;
}

// 判断是不是遍历器对象
function isGenerator (obj) {
  return 'function' == typeof obj.next && 'function' == typeof obj.throw;
}

// 判断是不是生成器函数
function isGeneratorFunction (obj) {
  var constructor = obj.constructor;
  if (!constructor) return false;
  // 生成器函数的 constructor.name 是 GeneratorFunction 
  // constructor.displayName 非标语法
  if ('GeneratorFunction' === constructor.name || 'GeneratorFunction' === constructor.displayName) return true;
  return isGenerator(constructor.prototype);
}

// 简单的判断是不是一个普通对象
function isObject (val) {
  return Object == val.constructor;
}

```


### 风格转换

```js
co.wrap = function (fn) {
  createPromise.__generatorFunction__ = fn;
  return createPromise;
  function createPromise() {
    return co.call(this, fn.apply(this, arguments));
  }
};

// for example
function* gen(a,b,c) {
  console.log('a,b,c =>', a, b, c)
}
const t1 = co(gen,1,2,3)
const t2 = co.wrap(gen)(1,2,3)
```
