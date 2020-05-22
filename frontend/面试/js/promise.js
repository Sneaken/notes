"use strict";

const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
class APromise {
  constructor(executor) {
    if (typeof executor !== "function") {
      throw new TypeError("executor is not a function");
    }

    this.state = PENDING;
    this.data = undefined;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (value instanceof APromise) {
        value.then(resolve, reject);
        return;
      }
      // 当是pending时 改变状态
      setTimeout(() => {
        if (this.state === PENDING) {
          this.state = FULFILLED;
          this.data = value;
          // 如无以下方法，则无法处理异步操作
          this.onResolvedCallbacks.forEach((callback) => callback(value));
        }
      }, 0); // 2.2.4 onFulfilled or onRejected must not be called until the execution context stack contains only platform code.
    };
    const reject = (reason) => {
      // 当是pending时 改变状态
      setTimeout(() => {
        if (this.state === PENDING) {
          this.state = REJECTED;
          this.data = reason;
          // 如无以下方法，则无法处理异步操作
          this.onRejectedCallbacks.forEach((callback) => callback(reason));
        }
      }, 0);
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value; // 2.2.1.1 | 2.2.7.3
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          }; // 2.2.1.2 | 2.2.7.4

    let promise2;
    if (this.state === FULFILLED) {
      promise2 = new APromise((resolve, reject) => {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.data); // 2.2.7.1
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error); // 2.2.7.2
          }
        }, 0); // 2.2.2.2
      });
    } else if (this.state === REJECTED) {
      promise2 = new APromise((resolve, reject) => {
        setTimeout(() => {
          try {
            const x = onRejected(this.data); // 2.2.7.1
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error); // 2.2.7.2
          }
        }, 0); // 2.2.3.2
      });
    } else if (this.state === PENDING) {
      promise2 = new APromise((resolve, reject) => {
        this.onResolvedCallbacks.push((value) => {
          setTimeout(() => {
            try {
              const x = onFulfilled(value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });

        this.onRejectedCallbacks.push((reason) => {
          setTimeout(() => {
            try {
              const x = onRejected(reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
      });
    }
    return promise2;
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  static resolve(value) {
    return new APromise((resolve, reject) => {
      resolve(value);
    });
  }

  static reject(error) {
    return new APromise((resolve, reject) => {
      reject(error);
    });
  }

  static all(promises) {
    return new APromise((resolve, reject) => {
      let values = [];
      let count = 0;
      promises.forEach((promise, index) => {
        promise.then((value) => {
          values[index] = value;
          count++;
          if (count === promises.length) {
            resolve(values);
          }
        }, reject);
      });
    });
  }

  static race(promises) {
    return new APromise((resolve, reject) => {
      promises.forEach((promise) => {
        promise.then(resolve, reject);
      });
    });
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  let isCalled = false; // 2.2.2.3 | 2.2.3.3 避免多次调用

  if (promise2 === x) {
    reject(new TypeError("循环引用")); // 2.3.1
    return;
  }

  if (x instanceof APromise) {
    // 2.3.2
    if (x.state === PENDING) {
      // 如果为等待态需等待直至 x 被执行或拒绝 并解析value值
      x.then(
        (y) => {
          resolvePromise(promise2, y, resolve, reject);
        },
        (e) => {
          reject(e);
        }
      ); // 2.3.2.1
    } else {
      x.then(resolve, reject); // 2.3.2.2 | 2.3.2.3
    }
  } else if (x !== null && (typeof x === "object" || typeof x === "function")) {
    // 2.3.3
    try {
      let then = x.then; // 2.3.3.1
      if (typeof then === "function") {
        then.call(
          x,
          (y) => {
            if (isCalled) return;
            isCalled = true;
            resolvePromise(promise2, y, resolve, reject); // 2.3.3.3.1
          },
          (e) => {
            if (isCalled) return;
            isCalled = true;
            reject(e); // 2.3.3.3.3
          }
        ); // 2.3.3.3
      } else {
        resolve(x); // 2.3.3.4
      }
    } catch (error) {
      if (isCalled) return; // 2.3.3.3.4.1
      isCalled = true;
      reject(error); // 2.3.3.2 |  2.3.3.3.4.1
    }
  } else {
    resolve(x); // 2.3.4
  }
}

// 过 promise A 标准检测
APromise.deferred = function () {
  let def = {};
  def.promise = new APromise(function (resolve, reject) {
    def.resolve = resolve;
    def.reject = reject;
  });
  return def;
};
module.exports = APromise;
// Promise核心内容完整测试方法
let promisesAplusTests = require("promises-aplus-tests");
promisesAplusTests(APromise, function (err) {
  console.log("err:", err);
  //全部完成;输出在控制台中。或者检查`err`表示失败次数。
});
