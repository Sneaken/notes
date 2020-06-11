# 缓存

- 为什么要缓存？

  - V = f(state, props) useHooks
  - 想在 f 中 new Object(); 只创建一次
  - 一些复杂的计算只有在状态改变后才做

- 缓存一个函数 (useCallback)

- 缓存一个值 (useMemo)

## 案例

### useMemo 每点击 10 次改变一次文本

```jsx
import React, { useState, useMemo } from "react";
const useMemoExample = () => {
  const [count, setCount] = useState(0);
  const memorizedText = useMemo(() => {
    console.log("run useMemo function");
    return `this is a memorized text ${Date.now()}`;
  }, [Math.floor(count % 10)]);
  return (
    <div>
      {memorizedText}
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
};
```

### useCallback 在频繁创建的函数处 缓存函数才有意义
