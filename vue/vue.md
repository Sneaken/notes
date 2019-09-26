```
v-on: 指令简写 @
<div id="app">
      <!--挂载点-->
      <div @click="handleClick()       ！！此处加小括号能够传参">{{content}}</div>   
</div>

@click=fn  和  @click=fn()   的区别
后者必须要手动传入$event  才能在回调函数中使用事件对象

// 实例
let app = new Vue({
    el: "#app", // 绑定元素
    template: "<h1>hello world </h1>", //模板
    data: {
        content: "hello world",
        title : "this is title"
    }, //数据
    methods: {
        handleClick: function() {
            this.content = " byebye";
        }
    } //方法
});
```

```
<div id="app">
    <!--挂载点-->
    <!--<div :title="title">hello world</div>-->
    <label>
    姓：<input type="text" v-model="firstName"/>
    </label>
    <label>
    名：<input type="text" v-model="lastName">
    </label>
    <div>{{fullName}}</div>
    <div>{{count}}</div>
</div>

let app = new Vue({
    el: "#app",
    data: {
        firstName: "",
        lastName: "",
        count:0
    },
    methods: {
        handleClick: function () {
            this.content = " byebye";
        }
    },
    computed: { // 计算属性
        fullName: function () {
        	return this.firstName + ' ' + this.lastName;
        }
    },
    watch: { // 侦听器
        firstName: function () {
        	this.count++;
        },
        lastName: function () {
        	this.count++;
        }
    }
});
```

```
HTML 中的特性名是大小写不敏感的，所以浏览器会把所有大写字符解释为小写字符。这意味着当你使用 DOM 中的模板时，camelCase (驼峰命名法) 的 prop 名需要使用其等价的 kebab-case (短横线分隔命名) 命名：
Vue.component('blog-post', {
  // 在 JavaScript 中是 camelCase 的
  props: ['postTitle'],
  template: '<h3>{{ postTitle }}</h3>'
})
<!-- 在 HTML 中是 kebab-case 的 -->
<blog-post post-title="hello!"></blog-post>
重申一次，如果你使用字符串模板，那么这个限制就不存在了。

定义组件名的方式有两种：
1. 使用 kebab-case
	Vue.component('my-component-name', { /* ... */ })
当使用 kebab-case (短横线分隔命名) 定义一个组件时，你也必须在引用这个自定义元素时使用 kebab-case，例如 <my-component-name>。

2.使用 PascalCase
	Vue.component('MyComponentName', { /* ... */ })
当使用 PascalCase (首字母大写命名) 定义一个组件时，你在引用这个自定义元素时两种命名法都可以使用。也就是说 <my-component-name> 和 <MyComponentName> 都是可接受的。注意，尽管如此，直接在 DOM (即非字符串的模板) 中使用时只有 kebab-case 是有效的。
```

```
过滤器
只能用在俩个地方：插值表达式和v:bind表达式
{{ data | 过滤器名称(传参) }}
全局
Vue.filter('过滤器名称',function(data){ //第一个参数必须是数据
    return ..
})
局部
new Vue({
    el: "",
    filters : {
    }
});
过滤器调用的时候采用就近原则，如果私有的过滤器和全局的过滤器一致，优先调用私有过滤器
```

```
使用 Vue.directive() 定义全局指令
其中，参数1 ： 指令的名称，在定义的时候，指令名称前面不需要加 v- 前缀
参数2 ： 是一个对象，其中包含指令相关的函数，在特定的阶段，执行相关的操作
// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
局部
directives: {
  focus: {
    // 指令的定义
    inserted: function (el) {
      el.focus()
    }
  }
}
```

```
一个指令定义对象可以提供如下几个钩子函数 (均为可选)：
bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
update：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 。
componentUpdated：指令所在组件的 VNode 及其子 VNode 全部更新后调用。
unbind：只调用一次，指令与元素解绑时调用。

指令钩子函数会被传入以下参数：
el：指令所绑定的元素，可以用来直接操作 DOM 。
binding：一个对象，包含以下属性：
name：指令名，不包括 v- 前缀。
value：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。
oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
expression：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。
arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。
modifiers：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。
vnode：Vue 编译生成的虚拟节点。移步 VNode API 来了解更多详情。
oldVnode：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。

注意：除了 el 之外，其它参数都应该是只读的，切勿进行修改。如果需要在钩子之间共享数据，建议通过元素的 dataset 来进行。
```

 