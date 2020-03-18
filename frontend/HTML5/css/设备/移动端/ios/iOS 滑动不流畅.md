ios 手机上下滑动页面会产生卡顿，手指离开页面，页面立即停止运动。整体表现就是滑动不流畅，没有滑动惯性。 iOS 5.0 以及之后的版本，滑动有定义有两个值 auto 和 touch，默认值为 auto。

**解决方案**

1. 在滚动容器上增加滚动 touch 方法

```
.wrapper {
  -webkit-overflow-scrolling: touch;
}
复制代码
```

2. 设置 overflow 设置外部 overflow 为 hidden,设置内容元素 overflow 为 auto。内部元素超出 body 即产生滚动，超出的部分 body 隐藏。

```
body {
  overflow-y: hidden;
}
.wrapper {
  overflow-y: auto;
}
```



作者：lzg9527
链接：https://juejin.im/post/5e4a0162f265da57133b2005
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。