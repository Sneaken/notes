#### IOS 键盘弹起挡住原来的视图

- 可以通过监听移动端软键盘弹起 Element.scrollIntoViewIfNeeded（Boolean）方法用来将不在浏览器窗口的可见区域内的元素滚动到浏览器窗口的可见区域。 如果该元素已经在浏览器窗口的可见区域内，则不会发生滚动。
- true，则元素将在其所在滚动区的可视区域中居中对齐。
- false，则元素将与其所在滚动区的可视区域最近的边缘对齐。 根据可见区域最靠近元素的哪个边缘，元素的顶部将与可见区域的顶部边缘对准，或者元素的底部边缘将与可见区域的底部边缘对准。

```
window.addEventListener('resize', function() {
  if (
    document.activeElement.tagName === 'INPUT' ||
    document.activeElement.tagName === 'TEXTAREA'
  ) {
    window.setTimeout(function() {
      if ('scrollIntoView' in document.activeElement) {
        document.activeElement.scrollIntoView(false)
      } else {
        document.activeElement.scrollIntoViewIfNeeded(false)
      }
    }, 0)
  }
})
```


作者：lzg9527
链接：https://juejin.im/post/5e4a0162f265da57133b2005
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。