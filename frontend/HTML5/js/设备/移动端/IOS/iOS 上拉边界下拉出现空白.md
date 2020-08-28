手指按住屏幕下拉，屏幕顶部会多出一块白色区域。手指按住屏幕上拉，底部多出一块白色区域。

在 iOS 中，手指按住屏幕上下拖动，会触发 touchmove 事件。这个事件触发的对象是整个 webview 容器，容器自然会被拖动，剩下的部分会成空白。

**解决方案**

```
document.body.addEventListener(
  'touchmove',
  function(e) {
    if (e._isScroller) return
    // 阻止默认事件
    e.preventDefault()
  },
  {
    passive: false
  }
)
```


作者：lzg9527
链接：https://juejin.im/post/5e4a0162f265da57133b2005
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。