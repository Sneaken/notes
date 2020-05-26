# 没有兄弟节点

```html
<ul class="pager">
  <li id="first">首页</li>
  <li id="prev">&lt;</li>
  <li class="page">1</li>
  <li id="next">&gt;</li>
  <li id="last">尾页</li>
</ul>
```

```js
let currentPage = 0;
$(".pager > .page").click(function() {
  // index 从零开始
  const index = $(this).index();
  currentPage = index;
});
```

# 有兄弟节点

```html
<ul class="pager">
  <li id="first">首页</li>
  <li id="prev">&lt;</li>
  <li class="page">1</li>
  <li class="page">2</li>
  <li id="next">&gt;</li>
  <li id="last">尾页</li>
</ul>
```

```js
let currentPage = 0;
$(".pager > .page").click(function() {
  // index 从零开始
  const index = $(this).index(".page");
  currentPage = index;
});
```
