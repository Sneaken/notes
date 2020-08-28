软键盘唤起后，页面的 fixed 元素将失效，变成了 absolute，所以当页面超过一屏且滚动时，失效的 fixed 元素就会跟随滚动了。不仅限于 type=text 的输入框，凡是软键盘（比如时间日期选择、select 选择等等）被唤起，都会遇到同样地问题。

解决方法: 不让页面滚动，而是让主体部分自己滚动,主体部分高度设为 100%，overflow:scroll

```
<body>
  <div class='warper'>
    <div class='main'></div>
  <div>
  <div class="fix-bottom"></div>
</body>

.warper {
  position: absolute;
  width: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch; /* 解决ios滑动不流畅问题 */
}
.fix-bottom {
  position: fixed;
  bottom: 0;
  width: 100%;
}
```


作者：lzg9527
链接：https://juejin.im/post/5e4a0162f265da57133b2005
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。