```
stylus的样式穿透 使用>>>
外层 >>> 第三方组件 
样式

.wrapper >>> .swiper-pagination-bullet-active
	background: #fff

sass和less的样式穿透 使用/deep/

外层 /deep/ 第三方组件 {
	样式
}
.wrapper /deep/ .swiper-pagination-bullet-active{
	background: #fff;
}
```

