```
如何解决 iOS 设置中 input 按钮样式会被默认样式覆盖的问题？

设置默认样式为 none。解决方式如下 。
input,
textarea {
	border:0;
	-webkit-appearance: none ;
}
```

