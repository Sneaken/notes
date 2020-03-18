```
简写
background:bg-color bg-image position/bg-size bg-repeat bg-origin bg-clip bg-attachment initial|inherit;

background-color		背景-颜色	
background-image		插入背景图片
background-repeat:	     值				 背景-平铺  	  值的取值如下：
					repeat				平铺(默认)
					no-repeat			不平铺
					repeat-x			只有水平方向平铺
					repeat-y			只有竖直方向平铺

background-position		背景-位置
	background-position: x y		
	x  控制背景图片的水平位置
	y  控制背景图片的竖直位置
	x的取值
		px
		left/right/center  left靠近左端   right靠近右端   center水平居中对齐
		%百分比相对于父级容器 0%靠近左端   100%靠近右端    50%水平居中对齐
	y的取值
		px
		top/bottom/center  top靠近顶端    bottom靠近底端 center垂直居中对齐 
		%百分比相对于父级容器 0%靠近顶端   100%靠近底端    50%垂直居中对齐
	如果background-position只有一个值,那第二个值默认就是center
	background-position:10%（center）

background-size	背景-尺寸
	background-size:x y
	x  控制背景图片水平方向的尺寸
	y  控制背景图片竖直方向的尺寸
	x的取值
		px
		%		百分比相对于父级容器设置宽度
	y的取值
		px
		%		百分比相对于父级容器设置高度
	cover/contain
		contain 保证图片的宽高比缩放到容器的某一边界
		cover 保证图片的宽高比覆盖容器
background-size修改背景图片尺寸是相对于background-position的

background-clip:值	设置背景颜色的绘制区域	值的取值如下
border-box		默认情况
padding-box
content-box

background-origin :值	设置背景图片的绘制区域	值的取值如下
border-box		
padding-box		默认情况
content-box

background-attachment:值	   背景-附着	值的取值如下
scroll	默认值		背景图片附着在容器里
fixed	固定		背景图片附着在浏览器窗口里
```
```
本节课课后可以完成的作业
	qq背景图片*1
	图片列表*1
```