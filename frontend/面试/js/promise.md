## Promise 缺点

1. 无法取消 promise。一旦创建它就会立即执行，无法中途取消。
2. 不设置回调函数，promise 内部抛出的错误，不会反应到外部。
3. 当处于 pending 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

## 基本用法

`Promise`对象是一个构造函数，用来生成`Promise`实例。

```js
const promise = new Promise(function(resolve, reject) {
  // ... some code
  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```

`Promise`构造函数接受一个函数作为参数，该函数的两个参数分别是`resolve`和`reject`。它们是两个函数，由 JavaScript 引擎提供，不用自己部署。

`resolve`函数的作用是，将`Promise`对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；

- resolve() 之后的操作还会执行，但是会返回第一个 resolve 生成的 Promise 实例。

  ```js
  const promise = new Promise((resolve, reject) => {
    console.log(1);
    resolve();
    console.log(2);
  });
  promise.then(() => {
    console.log(3);
  });
  console.log(4);
  // 1
  // 2
  // 4
  // 3
  ```

- then 方法返回的是一个新的 Promise 实例（注意，不是原来那个 Promise 实例）。因此可以采用链式写法，即 then 方法后面再调用另一个 then 方法。

`reject`函数的作用是，将`Promise`对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。
