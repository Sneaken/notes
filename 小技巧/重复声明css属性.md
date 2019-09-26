```
.thumbnail-item {
	border: Ipx solid rgb(100%， 100%， 100);
	border: 1px solid rgba(100%， 100%， 100%， 0。8)
}

为什么给.thumbnail-item设置了两次border呢？
注意，两次声明使用了略有不同的颜色函数:rgb和rgba。
rgba颜色函数接受第4个参数，表示的是透明度。

不过有些浏览器并不支持rgba，因此声明两次是一种提供回退值的技巧。

所有浏览器在看到第1条声明(rgb)时，都会将其值注册为 border属性值。当不支持rgba
的浏览器看到第2条声明时，会直接将其忽略，使用第1条声明中的值。支持rgba的浏览器则会丢
弃第1条声明，并使用第2条声明中的值。
```

