```
在Vue中，是没有办法通过v-show的方式控制slot插槽或template占位符标签的显示的。
因为，slot和template本身并不是一个HTML元素，而v-show是通过display属性来控制元素的。所以要控制slot和template只能使用v-if
```

