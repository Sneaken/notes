通过监听键盘回落时间滚动到原来的位置

```
window.addEventListener('focusout', function() {
  window.scrollTo(0, 0)
})

//input输入框弹起软键盘的解决方案。
var bfscrolltop = document.body.scrollTop
$('input')
  .focus(function() {
    document.body.scrollTop = document.body.scrollHeight
    //console.log(document.body.scrollTop);
  })
  .blur(function() {
    document.body.scrollTop = bfscrolltop
    //console.log(document.body.scrollTop);
  })
```


作者：lzg9527
链接：https://juejin.im/post/5e4a0162f265da57133b2005
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。