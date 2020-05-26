# 一、 let | const

1. 声明的变量仅在块级作用域内有效。

> 在 for 循环中

> 如果变量 i 是用 var 声明的，在全局范围内有效，所以全局只有一个变量 i，每一次循环，变量 i 的值都会发生改变；> 如果

> 如果变量 i 是用 let 声明的，当前的 i 只会在本轮循环有效，所以每一次循环的 i 其实都是一个新的变量。（javascript 引擎内部会记住上一轮循环的值，初始化本轮的变量 i 时，就在上一轮循环的基础上进行计算）

> for 循环还有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。

```js
for (let i = 0; i < 3; i++) {
  let i = "abc";
  console.log(i);
}
// abc
// abc
// abc
// abc
// 这表明函数内部的变量i与循环变量i不在同一个作用域，有各自单独的作用域。
```

2. 不存在变量提升?

   let && const 声明的变量同样会被提升到对应作用域的顶部，但是由于存在 TDZ，导致我们无法在执行声明语句之前访问它们，这会抛出一个 ReferenceError 的异常。

3. 暂时性死区(temporal dead zone，简称 TDZ)

   ES6 明确规定，如果区块中存在 let 和 const 命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。(哪怕是 typeof)

   所以在没有 let | const 之前，typeof 运算符是百分之百安全的，永远不会报错。

4. 不允许重复声明

   不允许在相同作用域内，重复声明同一个变量。（SyntaxError: Identifier 'xxx' has already been declared）

5. 块级作用域

   ES5 只有全局作用域和函数作用域，没有块级作用域，这带来很多不合理的场景。

   ```js
   // 第一种场景，内层变量可能会覆盖外层变量。
   var tmp = new Date();
   function f() {
     console.log(tmp);
     if (false) {
       var tmp = "hello world";
     }
   }
   f();

   // 第二种场景，用来计数的循环变量泄露为全局变量。
   var s = "hello";
   for (var i = 0; i < s.length; i++) {
     console.log(s[i]);
   }
   console.log(i); // 5
   ```

   ES6 的块级作用域

   let/const 为 javascript 新增了块级作用域。

   ```js
   function f1() {
     let n = 5;
     if (true) {
       let n = 10;
     }
     console.log(n); // 5
   }
   ```

   ES6 允许块级作用域的任意嵌套。

   内层作用域可以定义外层作用域的同名变量。

   块级作用域的出现，实际上使得获得广泛应用的匿名立即执行函数表达式（匿名 IIFE）不再必要了。

   ```js
   // IIFE 写法
   (function() {
     var tmp = "...";
     // ...
   })();
   // 块级作用域写法
   {
     let tmp = "...";
     // ...
   }
   ```

   ES6 的块级作用域`必须有大括号`，如果没有大括号，JavaScript 引擎就认为不存在块级作用域。

6. const 声明后需要立马赋值。基本类型赋值后不允许修改，对象可以修改（因为指针没变）。

# 二、变量的解构赋值

> 解构赋值的规则是: 只要等号右边的值不是对象或数组，就先将其转为对象。由于 undefined 和 null 无法转为对象，所以对它们进行解构赋值，都会报错。

1. 数组 | 对象的结构赋值属于常规操作在此不提。
2. 字符串的解构赋值

   此时，字符串被转换成了一个类似数组的对象。

3. 数值和布尔值的解构赋值

   解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。

   ```js
   let { toString: s } = 123;
   ```

4. 函数参数的解构赋值(道理同上)
5. 圆括号问题

   ES6 的规则是，只要有可能导致解构的歧义，就不得使用圆括号。

6. 解构赋值操作是浅拷贝

7. 最后，对于已经定义的变量，想要使用解构赋值的话，需要借助圆括号（因为如果以 { 作为开头的话， JavaScript 引擎会将这里当做一个代码块）：
   ```js
   let a
   { a } = { a: "hello" } // SyntaxError: Unexpected token
   ({ a } = { a: "hello" }) // a = "hello"
   ```

# 三、字符串的拓展与新增方法

1. 模板字符串
2. 标签模板
3. String.row() 返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串，往往用于模板字符串的处理方法。
4. - includes()：返回布尔值，表示是否找到了参数字符串。
   - startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。
   - endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。
   - 这三个方法都支持第二个参数，表示开始搜索的位置。
5. repeat(): 返回一个新字符串，表示将原字符串重复 n 次。

# 四、数值的拓展

1. Number.isFinite()用来检查一个数值是否为有限的（finite），即不是 Infinity。
2. Number.isNaN()用来检查一个值是否为 NaN。

> 它们与传统的全局方法 isFinite()和 isNaN()的区别在于，传统方法先调用 Number()将非数值的值转为数值，再进行判断。

> 而这两个新方法只对数值有效。

> Number.isFinite()对于非数值一律返回 false
> Number.isNaN()只有对于 NaN 才返回 true，非 NaN 一律返回 false。

3. ES6 将全局方法 parseInt()和 parseFloat()，移植到 Number 对象上面，行为完全保持不变。目的是逐步减少全局性方法，使得语言逐步模块化。

4. Number.isInteger()用来判断一个数值是否为整数(当对数据精度的要求不高)。

5. 引入常量 `Number.EPSILON` | `Number.MAX_SAFE_INTEGER` | `Number.MIN_SAFE_INTEGER`

6. Number.isSafeInteger()是用来判断一个整数是否落在这个范围之内。

7. ES6 在 Math 对象上新增了 17 个与数学相关的方法。

8. ES7 新增指数运算符(\*\*)
   这个运算符的一个特点是右结合，而不是常见的左结合。多个指数运算符连用时，是从最右边开始计算的。
9. ES11 引入 新的数据类型 BigInt

# 五、函数的拓展

1. 函数参数的默认值

   - 定义了默认值的参数，应该是函数的尾参数
   - 指定了默认值以后，函数的 length 蜀将，将返回没有指定默认值的参数个数
   - 函数参数也是一个单独的作用域

2. rest 参数

   - 用于获取函数的多余参数，这样就不需要使用 arguments 对象。
   - rest 参数搭配的变量`是一个数组`，该变量将多余的参数放入数组中。
   - arguments 对象不是数组，而是一个类似数组的对象。所以为了使用数组的方法，必须使用 Array.prototype.slice.call 先将其转为数组。rest 参数就不存在这个问题，它就是一个真正的数组，数组特有的方法都可以使用。
   - 只能是最后一个参数，否则会报错。
   - 函数的 length 属性，不包括 rest 参数。

3. 箭头函数

   - 函数体内的 this 对象，就是定义时所在的对象，而不是使用时所在的对象。
     - 对象不构成单独的作用域。
   - 不可以当作构造函数，也就是说，不可以使用 new 命令，否则会抛出一个错误。
   - 不可以使用 arguments 对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
   - 不可以使用 yield 命令，因此箭头函数不能用作 Generator 函数。

4. 尾调用优化
5. 函数参数的尾逗号 ES8 允许函数的最后一个参数有尾逗号
6. Function.prototype.toString()
   - ES10 对函数实例的 toString()方法做出了修改。
     ```js
     function /* foo comment */ foo() {}
     foo.toString(); // "function /* foo comment */ foo () {}"
     ```
7. catch 命令的参数省略
   - ES10 允许 catch 语句省略参数。
     ```js
     try {
     } catch {}
     ```

# 六、数组的拓展

1. 扩展运算符(...[1,2,3])

   - 替代函数的 apply 方法

     ```js
     // ES5 的写法
     function f(x, y, z) {
       // ...
     }
     var args = [0, 1, 2];
     f.apply(null, args);

     // ES6的写法
     function f(x, y, z) {
       // ...
     }
     let args = [0, 1, 2];
     f(...args);
     ```

   - 复制数组
   - 合并数组

2. Array.from()
   - Array.from 方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）。
3. Array.of()
   - 用于将一组值，转换为数组。
   - 总是返回参数值组成的数组。如果没有参数，就返回一个空数组。
4. 数组实例的 copyWithin()
5. 数组实例的 find() 和 findIndex()
6. 数组实例的 fill()
   - 用给定值，填充一个数组。
   - 用于空数组的初始化。
   - 数组中已有的元素，会被全部抹去。
   - 填充的是`浅拷贝` (填充类型为对象，那么被赋值的是同一个内存地址的对象，而不是深拷贝对象。)
7. 数组实例的 entries()，keys() 和 values()
8. 数组实例的 includes()
   - ES7 引入
   - 能识别 NaN
9. 数组实例的 flat()，flatMap()
   - flat() 返回一个新数组 默认拍平一层 如果原数组有空位，flat()方法会跳过空位。
10. 数组的空位

    - ES6 则是明确将空位转为 undefined。
    - 由于空位的处理规则非常不统一，所以建议避免出现空位。

11. Array.prototype.sort() 的排序稳定性
    - ES10 明确规定，Array.prototype.sort()的默认排序算法必须稳定。

# 七、 对象的拓展

1. 属性的简洁表示法
   - ES6 允许在大括号里面，直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁。
   - 简写的对象方法不能用作构造函数，会报错。
2. 属性名表达式

   - ES6 允许字面量定义对象时，用表达式作为对象的属性名，即把表达式放在方括号内。 如: obj['a' + 'bc'] = 123;
   - 属性名表达式与简洁表示法，不能同时使用，会报错。SyntaxError
   - 属性名表达式如果是一个`对象`，`默认情况下会自动将对象转为字符串[object Object]`，这一点要`特别小心`。
     ```js
     const keyA = { a: 1 };
     const keyB = { b: 2 };
     const myObject = {
       [keyA]: "valueA",
       [keyB]: "valueB"
     };
     myObject; // Object {[object Object]: "valueB"}
     ```

3. 属性的可枚举性和遍历
4. super 关键字
5. 对象的扩展运算符
   - ES9 将数组的拓展运算符引入了对象
   - 对象的扩展运算符等同于使用 Object.assign()
6. 链判断运算符
   - ES11 引入了“链判断运算符”（optional chaining operator）`?.` 。
   - 有就执行 没有返回 undefined
   - 右侧不得为十进制数值
7. Null 判断运算符
   - ES11 引入了一个新的 Null 判断运算符`??`。它的行为类似||，但是只有运算符左侧的值为 null 或 undefined 时，才会返回右侧的值。
   - 这个运算符的一个目的，就是跟链判断运算符?.配合使用，为 null 或 undefined 的值设置默认值。
     ```js
     const animationDuration = response.settings?.animationDuration ?? 300;
     ```
   - ??有一个运算优先级问题，它与&&和||的优先级孰高孰低。现在的规则是，如果多个逻辑运算符一起使用，必须用括号表明优先级，否则会报错。

# 八、对象的新增方法

1. Object.is()
   - ES5 比较两个值是否相等，只有两个运算符：相等运算符（==）和严格相等运算符（===）。它们都有缺点，前者会自动转换数据类型，后者的 NaN 不等于自身，以及+0 等于-0。
   - 此方法来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致。
2. Object.assign()
   - 用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。
   - 如果只有一个参数，Object.assign 会直接返回该参数。
   - 如果该参数不是对象，则会先转成对象，然后返回。
   - 由于 undefined 和 null 无法转成对象，所以如果它们作为参数，就会报错。 TypeError
   - 如果 undefined 和 null 不在首参数，就不会报错。
   - `浅拷贝` | `同名属性的替换`
3. Object.getOwnPropertyDescriptors()
   - ES8 引入了 Object.getOwnPropertyDescriptors()方法，返回指定对象所有自身属性（非继承属性）的描述对象。
   - 引入目的，主要是为了解决 Object.assign()无法正确拷贝 get 属性和 set 属性的问题。
4. \_\_proto\_\_属性，Object.setPrototypeOf()，Object.getPrototypeOf()
5. ES5 引入了 Object.keys()，ES8 引入 Object.values()，Object.entries()
6. Object.fromEntries()

# 九、Proxy

Proxy 支持的拦截操作一览，一共 13 种。

1. get(target, propKey, receiver)：拦截对象属性的读取，比如 proxy.foo 和 proxy['foo']。

   ```js
   const source = {};
   const proxy = new Proxy(source, {
     get(target, propKey, receiver) {
       console.log(target === source); // true
       console.log(receiver === proxy); // true
       return Reflect.get(target, propKey, receiver);
     }
   });
   ```

2. set(target, propKey, value, receiver)：拦截对象属性的设置，比如 proxy.foo = v 或 proxy['foo'] = v，返回一个布尔值。

3. has(target, propKey)：拦截 propKey in proxy 的操作，返回一个布尔值。

4. deleteProperty(target, propKey)：拦截 delete proxy[propKey]的操作，返回一个布尔值。

5. ownKeys(target)：拦截 Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in 循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而 Object.keys()的返回结果仅包括目标对象自身的可遍历属性。

6. getOwnPropertyDescriptor(target, propKey)：拦截 Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。

7. defineProperty(target, propKey, propDesc)：拦截 Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。

8. preventExtensions(target)：拦截 Object.preventExtensions(proxy)，返回一个布尔值。

9. getPrototypeOf(target)：拦截 Object.getPrototypeOf(proxy)，返回一个对象。

10. isExtensible(target)：拦截 Object.isExtensible(proxy)，返回一个布尔值。

11. setPrototypeOf(target, proto)：拦截 Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。

12. apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作，比如 proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。

13. construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作，比如 new proxy(...args)。

# 十、Promise 见 promise.md
