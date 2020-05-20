```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=3, minimum-scale=0.5">
```

**width**

width属性被用来控制layout viewport（布局视窗）的宽度,layout viewport（布局视窗）宽度默认值是设备厂家指定的。iOS, Android基本都将这个视口分辨率设置为 980px。我们可以?width=320 这样设为确切的像素数，也可以设为device-width这一特殊值，一般为了自适应布局，普遍的做法是将width设置为device-width，width=device-width 也就是将layout viewport（布局视窗）的宽度设置为设备屏幕分辨率的宽度。网页缩放比例为100%时，一个CSS像素就对应一个 dip（设备独立像素），layout viewport的宽度＝屏幕分辨率的宽度＝dip 的宽度。

**initial-scale**

initial-scale用于指定页面的初始缩放比例，initial-scale=1 表示将layout viewport的宽度设置为屏幕分辨率的宽度，initial-scale=1.5 表示将layout viewport的宽度设置为屏幕分辨率宽度的1.5倍。

### **maximum-scale**

maximum-scale用于指定用户能够放大的最大比例，假设页面的默认缩放值initial-scale是1，那么用户最终能够将页面放大到这个初始页面大小的3倍。

### **minimum-scale**

类似maximum-scale的描述，不过minimum-scale是用来指定页面缩小比例的。设置为0.5表示用户能够将页面缩小到初始页面的0.5倍，通常情况下，不会定义该属性的值，页面太小将难以阅读。