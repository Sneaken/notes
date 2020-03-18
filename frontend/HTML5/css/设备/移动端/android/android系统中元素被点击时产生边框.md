部分android系统点击一个链接，会出现一个边框或者半透明灰色遮罩, 不同生产商定义出来额效果不一样。去除代码如下

```
a,button,input,textarea{
  -webkit-tap-highlight-color: rgba(0,0,0,0)
  -webkit-user-modify:read-write-plaintext-only; 
}
```



作者：lzg9527
链接：https://juejin.im/post/5e4a0162f265da57133b2005
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

