注意：由于移动端双击缩放 所以移动端没有双击事件

```
  // 移动端模拟双击事件
  private handleDblClick () {
    const nowTime = new Date().getTime()
    if (nowTime - this.lastClickTime! < 300) {
      // 双击
      this.lastClickTime = 0
      this.clickTimer && clearTimeout(this.clickTimer)
      console.log('双击')
    } else {
      /* 单击 */
      this.lastClickTime = nowTime
      this.clickTimer = window.setTimeout(() => {
        console.log('单击')
      }, 300)
    }
  }
```



最近项目中遇到了在同一DOM元素上需要添加 onclick 和 ondblclick 2个事件，如果按照正常的方式添加处理，结果发现只会执行 onclick，而不会执行 ondblclick；这时我们需要对2个事件的处理函数稍作处理就可以实现2个事件并存了，代码如下：

```
<script type="text/javascript">
  var clickTimer = null;
  
  function _click(){
      if(clickTimer) {
          window.clearTimeout(clickTimer);
          clickTimer = null;
      }
      
      clickTimer = window.setTimeout(function(){
           // your click process code here
           alert("你单击了我");
      }, 300);
  }

   function _dblclick(){
      if(clickTimer) {
          window.clearTimeout(clickTimer);
          clickTimer = null;
      }
      
     // your click process code here
     alert("你双击了我");
  }
</script>

<button onclick="_click();" ondblclick="_dblclick();">单击或双击我</button>
```

处理思想就是：利用定时器延迟执行onclick事件，这样在双击过程中会取消中途触发的单击事件。



来源：https://my.oschina.net/jsan/blog/123181