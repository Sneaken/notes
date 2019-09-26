在项目中遇到过中间文字，两边横线的布局，如下图：
![示例](https://img-blog.csdn.net/20170410181413142)

两边横线我们可以使用标签的上边框或者下边框，然后对中间的文字使用 vertical-align 属性来控制。


```
html
<div class="order">
   	<span class="line"></span>
   	<span class="txt">产品清单</span>
   	<span class="line"></span>
</div>

css
 .order {
   height: 60px;
   line-height: 60px;
   text-align: center;
}
 .order .line {
   display: inline-block;
   width: 150px;
   border-top: 1px solid #ccc ;
}
.order .txt {
   color: #686868;
   vertical-align: middle;
}
```

在css样式中使用 vertical-align: middle，然后就发现跟UI图有一点点区别，横线没有完全在文字的中间 
![示例](https://img-blog.csdn.net/20170410182126020)
查找 vertical-align 的属性就会发现有length 和 % 两个属性
![示例](https://img-blog.csdn.net/20170410182459611)
然后尝试使用 % 看看能不能让横线在文字的中间，通过调整 css 样式
	vertical-align: -8%;
发现横线在文字的中间，那么 length 长度属性是否也可以呢？试一试发现也是可以的
	vertical-align: -4px;
![示例](https://img-blog.csdn.net/20170410182936289)