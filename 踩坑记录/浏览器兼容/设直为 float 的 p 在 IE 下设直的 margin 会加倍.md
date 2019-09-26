```
说说 margin 的加倍问题

设置为 float 的 p 在IE下设置的 margin 会加倍。
这是 IE6 中都存在的 一个 BUG。
解决方案是 在这个 p 里面加上 display:inline 。
例如，以下代码就解决了这个问题 。
.demo {
    float: left;
    margin: 5px;
    display: inline;
}
```

