```
如何解决设置标签最低高度 min-height 不兼容的问题？
如果要设置一个标签的 最小高度 200px ，需要完成以下设置。
{
    min-height:200px; 
    height:auto!important;
    height:200px;
    overflow:visible;
}
```

