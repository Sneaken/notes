# delay

## 1. 前情提要

### 1.1 介绍

Delay a promise a specified amount of time.

一个比较小巧的库

### 1.2 AbortController

> [AbortController](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController)

允许我们通过调用 AbortController.abort() 中止请求

```js
const controller = new AbortController();
let signal = controller.signal; // AbortSignal {aborted: false, onabort: null}

controller.abort();
console.log(signal); // AbortSignal {aborted: true, onabort: null}
```

## 2. 源码分析

### 2.1 取随机数

```js
const randomInteger = (minimum, maximum) => Math.floor((Math.random() * (maximum - minimum + 1)) + minimum);
```

### 2.2 包裹异常

```js
const createAbortError = () => {
	const error = new Error('Delay aborted');
	error.name = 'AbortError';
	return error;
};
```

### 2.3 createDelay

```js
const createDelay = ({clearTimeout: defaultClear, setTimeout: set, willResolve}) => (ms, {value, signal} = {}) => {
	if (signal && signal.aborted) {
		// 如果被中断了
		return Promise.reject(createAbortError());
	}

	let timeoutId;
	let settle;
	let rejectFn;
	const clear = defaultClear || clearTimeout;

	const signalListener = () => {
		clear(timeoutId);
		rejectFn(createAbortError());
	};

	// 清理事件
	const cleanup = () => {
		if (signal) {
			signal.removeEventListener('abort', signalListener);
		}
	};

	const delayPromise = new Promise((resolve, reject) => {
		settle = () => {
			cleanup();
			if (willResolve) {
				resolve(value);
			} else {
				reject(value);
			}
		};

		rejectFn = reject;
		timeoutId = (set || setTimeout)(settle, ms);
	});

	// 为什么在这里绑定监听函数？
	// 因为 rejectFn 是在 promise 执行以后才存在的
	if (signal) {
		// once 表示这个事件只触发一次
		signal.addEventListener('abort', signalListener, {once: true});
	}

	// clear 的作用 只用用来取消延时的
	delayPromise.clear = () => {
		clear(timeoutId);
		timeoutId = null;
		settle();
	};

	return delayPromise;
};
```

### 2.4 createWithTimers

```js
const createWithTimers = clearAndSet => {
	const delay = createDelay({...clearAndSet, willResolve: true});
	delay.reject = createDelay({...clearAndSet, willResolve: false});
	// 比较可惜的是 range 只能成功
	delay.range = (minimum, maximum, options) => delay(randomInteger(minimum, maximum), options);
	return delay;
};

// 使用默认的延时函数
const delay = createWithTimers();
// 可以自定义延时函数
delay.createWithTimers = createWithTimers;
```
