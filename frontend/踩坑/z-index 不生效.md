## 层叠上下文

我们都知道, float 浮动元素和 position( absolute, fixed, sticky) 设置的元素会脱离文档流, 而这些独立于文档的元素一般正是具有 层叠上下文这个特殊属性。

在 MDN 关于堆叠上下文的描述中:

> 总的来说这么几类元素具有堆叠上下文
>
> 1. html 根元素: 在 HTML 中所有元素都属于根元素子节点, 根元素本身就具有 z-index
>
> 2. position
>
>    position 设置为 absolute/relative 且 z-index 不为 auto 的元素
>
>    position 值为 fixed 或 sticky 的元素 (sticky 在浏览时为 static, 移出时变为 fixed)
>
> 3. CSS3 新特性:
>
>    flex/grid 的 `子元素` 具有层叠样式 (父元素仍然是普通 block)
>
>    opacity/transform/filter 等不为默认值

### 解决方案：

具有堆叠上下文才会使 z-index 生效
