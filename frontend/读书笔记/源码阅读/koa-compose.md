# koa-compose

## 1. 前情提示

### 1. 什么是 compose

compose 就是执行一系列的任务

## 2. 源码解析

### 1. compose

```js
function compose(middleware) {
  // 一些必要检查
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!');
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!');
  }

  return function (context, next) {
    // last called middleware
    let index = -1;
    return dispatch(0);

    function dispatch(i) {
      // 在一个中间件中应该只调用一次 next, 不应该多次调用
      if (i <= index) return Promise.reject(new Error('next() called multiple times'));
      index = i;
      let fn = middleware[i];
      // compose(middleware)(context, next) next 指的是这个next，不要绕晕了
      if (i === middleware.length) fn = next;
      if (!fn) return Promise.resolve();
      try {
        // bind 第一位传null的话，不改变this指向
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err);
      }
    }
  };
}
```

### 2. node 环境中的 this

#### 1. 全局中的 this

全局中的 this 默认是一个空对象。 并且在全局中的 this 与 global 没有任何关系。

#### 2. function 中的 this

严格模式下：函数中的 this 是 undefined。
非严格模式下： 函数中的 this 是 global。
