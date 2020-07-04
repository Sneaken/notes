# useImperativeHandle
> 在使用 ref 时自定义暴露给父组件的实例值。

> useImperativeHandle 应当与 forwardRef 一起使用：

```jsx
import { forwardRef, useRef, useImperativeHandle } from 'react'
function FancyInput(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  return <input ref={inputRef}  />;
}
FancyInput = forwardRef(FancyInput);
```

在本例中，渲染 <FancyInput ref={inputRef} /> 的父组件可以调用 inputRef.current.focus()。

