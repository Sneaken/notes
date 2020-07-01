# 引用行为 ref (reference)

- 引用 React 管理以外的对象
  - 需要在 React 之外做一些事情: 例如 focus、媒体对象操作等
  - 通常搭配 useEffect
- 附带作用: 方便地保存值

## 案例

### 点击按钮 聚焦输入框

```jsx
import React, { useRef } from "react";
export default function UseRefExample() {
  const refInput = useRef();
  return (
    <div>
      <input ref="refInput" type="text" />
      <button
        onClick={() => {
          refInput.current.focus();
        }}
      >
        Focus
      </button>
    </div>
  );
}
```

### 保存先前值（附带作用）

```jsx
import React, { useRef, useState } from "react";
export default function UseRefExample() {
  const [count, setCount] = useState(0);
  const prev = useRef(null);
  return (
    <div>
      <p>当前值: {count}</p>
      <p>之前的值: {prev.current}</p>
      <button
        onClick={() => {
          prev.current = count;
          setCount(count => count + 1);
        }}
      >
        Click me to add
      </button>
      <button
        onClick={() => {
          prev.current = count;
          setCount(count => count - 1);
        }}
      >
        Click me to remove
      </button>
    </div>
  );
}
```

## ref 在组件上时
```jsx
import React, { useRef } from "react";

const Box = React.forwardRef((props, ref) => {
  return (
    <div {...props} ref={ref}>
      Box
    </div>
  );
});

 function App() {
  const box = useRef();
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <Box
        ref={box}
        onClick={() => {
          console.log(box.current);
        }}
      />
    </div>
  );
}
```
