const PADDING = "padding";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
class APromise {
  constructor(executor) {
    // executor 是一个匿名函数

    this.state = PADDING;
    this.value = undefined;
    this.reason = undefined;
    this.fn1Callbacks = [];
    this.fn2Callbacks = [];

    let resolve = (data) => {
      // 当是 padding时 改变状态
      if (this.state === PADDING) {
        this.value = data;
        this.state = FULFILLED;
      }
    };
    let reject = (reason) => {
      // 当是 padding时 改变状态
      if (this.state === PADDING) {
        this.reason = reason;
        this.state = REJECTED;
      }
    };

    try {
      // 执行
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (data) => {};
    onRejected = typeof onRejected === "function" ? onRejected : (reason) => {};

    if (this.state === FULFILLED) {
      return new APromise((resolve, reject) => {
        try {
          resolve(onFulfilled(this.value));
        } catch (error) {
          reject(error);
        }
      });
    } else if (this.state === REJECTED) {
      return new APromise((resolve, reject) => {
        try {
          reject(onRejected(this.reason));
        } catch (error) {
          reject(error);
        }
      });
    } else if (this.state === PADDING) {
      return new APromise((resolve, reject) => {});
    }
  }

  catch() {}

  static resolve() {}

  static reject() {}

  static all() {}

  static race() {}
}

const a = new APromise((resolve, reject) => {
  console.log(1);
})
  .then(
    (resolve) => {
      console.log(resolve, 1, 1);
    },
    (reject) => {
      console.log(reject, 2, 1);
    }
  )
  .then(
    (resolve) => {
      console.log(resolve, 1, 2);
    },
    (reject) => {
      console.log(reject, 2, 2);
    }
  )
  .then(
    (resolve) => {
      console.log(resolve, 1, 3);
    },
    (reject) => {
      console.log(reject, 2, 3);
    }
  );
