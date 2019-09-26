```
如何解决 iOS 中 input 键盘事件 keyup 失效问题？
通过以下代码解决 。

<input type="text" id="testInput" >
<script type="text/javascript" 〉
document.getElementByid("testinput").addEventListener("input",function (e) {
	var value = e.target.value ;
});
</script>
```



