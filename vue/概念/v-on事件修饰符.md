```
v-on事件修饰符 
.stop  //阻止冒泡
.prevent //阻止默认行为
.capture //使用事件捕获模式  为元素绑定一个事件捕获阶段触发的回调函数
.self   //只有当事件在该元素本身（不是子元素）触发时 触发回调
.once  //事件只触发一次

<!-- 阻止单击事件冒泡 -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联  -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>

<!-- 添加事件侦听器时使用时间捕获模式 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当事件在该元素本身（而不是子元素）触发时触发回调 -->
<div v-on:click.self="doThat">...</div>

```

