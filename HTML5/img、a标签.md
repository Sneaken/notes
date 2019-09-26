## 元素的分类
```
<1>替换元素   	能够通过修改元素的属性来改变在网页中的显示效果	
<2>非替换元素	不能够通过修改元素的属性来改变在网页中的显示效果

替换元素的特点 : img  input	有自己的默认宽高并且可以设置宽高	
非替换元素的特点 : div  p		没有自己的默认宽高
替换元素集锦:img video audio input button 等
非替换元素集锦:div  p  span ul li 等	
```
## img四要素
```
<1>src  	路径		====>绝对路径/相对路径
<2>alt      图片的替代文本/图片关键词
<3>width 	图片的原始宽度
<4>height	图片的原始高度

绝对路径：路径从盘符开始作为起点  	找到指定文件
相对路径：路径从自身文件位置作为起点  	找到指定文件
跳出当前文件夹		../
```

## a元素的href属性
```
<1>超链接		
		<a href="https://www.baidu.com/">我是百度</a>
<2>下载	
	如果想通过纯前端技术实现文件下载，直接把a标签的href属性设置为文件路径即可，如下：
<a href="https://cdn.shopify.com/s/files/1/1545/3617/files/SH01_User_Manaul.pdf">
download</a>
		但是，对于 txt , jpg , pdf 等浏览器支持直接打开的文件不会被执行下载，而是会直接打开，这时候一个新属性就要上场了--【download】
		<a href="https://cdn.shopify.com/s/files/1/1545/3617/files/SH01_User_Manaul.pdf" download="test.pdf">download</a>
<3>锚点 用ID比NAME更规范一些.这就是HTML5对<A NAME="...">的清理原因.
	<a id="top">这里是TOP部分</a>
	<a href="#top">点击我链接到TOP</a>
<4>打电话		
	<a href="tel:400-888-9999">400-888-9999</a>	
<5>发邮件	
	<a href="mailto:johndoe@sample.com">发送邮件</a>
```

## a元素的target属性
```
<1>_self(默认)		在当前的窗口打开页面	
<2>_blank			在新窗口打开页面
<3>_parent			这个目标使得文档载入父窗口或者包含来超链接引用的框架的框架集。如果这个引用是在窗口或者在顶级框架中，那么它与目标_self等效。
<4>_top				这个目标使得文档载入包含这个超链接的窗口，用 _top 目标将会清除所有被包含的框架并将文档载入整个浏览器窗口。
```