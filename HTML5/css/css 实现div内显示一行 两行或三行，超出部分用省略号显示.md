一、div内显示一行，超出部分用省略号显示

```
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
```



二、div内显示两行或三行，超出部分用省略号显示

```
display: -webkit-box;
overflow: hidden;
text-overflow: ellipsis;
-webkit-box-orient: vertical;
-webkit-line-clamp: 2;（行数）
```



