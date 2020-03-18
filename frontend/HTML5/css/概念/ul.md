## 作为列表项标记的图像

```
要指定列表项标记的图像，使用列表样式图像属性：
ul{
    list-style-image: url('sqpurple.gif');
}

上面的例子在所有浏览器中显示并不相同，IE和Opera显示图像标记比火狐，Chrome和Safari更高一点点。
如果你想在所有的浏览器放置同样的形象标志，就应使用浏览器兼容性解决方案，过程如下
浏览器兼容性解决方案
同样在所有的浏览器，下面的例子会显示的图像标记：
ul{
    list-style-type: none; 设置列表类型为没有列表项标记
    padding: 0px;
    margin: 0px;  设置填充和边距0px（浏览器兼容性）
}
ul li{
    background-image: url(sqpurple.gif); 设置图像的URL，
    background-repeat: no-repeat;        并设置它只显示一次（无重复）
    background-position: 0px 5px; 		您需要的定位图像位置（左0px和上下5px）
    padding-left: 14px; 			    用padding-left属性把文本置于列表中
}
```

## 简写属性

```
可以按顺序设置如下属性：
list-style-type
list-style-position (有关说明，请参见下面的CSS属性表)
list-style-image
```

