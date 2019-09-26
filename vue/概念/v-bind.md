```
//属性绑定 v-bind  简写就是      ：
<div :title="title">hello world</div>

:class=对象
只要对象的键值为true  则标签就会有对应键名的类名
:class=数组
只要数组中存在某一项 则标签就会有对应数组项的类名

:style=对象
	对象的键名是标签的属性名 键值是标签的属性值
:style=数组 [属性名1，属性名2]               属性名1：属性值    属性名似乎不能用连字符       
    多个对象的键名是标签的属性名
    多个对象的键值是标签的属性值
    
<p :style='[arr1,arr2]'>asdfjoduj</p>
data: {
    arr1: {
    	backgroundColor: 'green'
    },
    arr2: {
    	fontSize: '36px'
    }
},
```

