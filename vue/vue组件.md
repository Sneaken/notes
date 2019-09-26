```
data 必须是函数 

使用组件时，大多数选项可以被传入到 Vue 构造器中，有一个例外： data 必须是函数。 实际上，如果你这么做： 

Vue.component('my-component', {
    template: '<span>{{ message }}</span>',
    data: {
    	message: 'hello' 
    }
})

那么 Vue 会在控制台发出警告，告诉你在组件中 data 必须是一个函数。最好理解这种规则的存在意义。 

<div id="example-2"> 
    <simple-counter></simple-counter> 
    <simple-counter></simple-counter> 
    <simple-counter></simple-counter> 
</div> 

var data = { counter: 0 }
Vue.component('simple-counter', {
    template: '<button v-on:click="counter += 1">{{ counter }}</button>',
     // data 是一个函数，因此 Vue 不会警告， 
    // 但是我们为每一个组件返回了同一个对象引用 
    data: function () {
    	return data
    }
})
new Vue({
	el: '#example-2' 
})
```

```
每一个Vue的组件都是Vue的实例

局部注册
通过一个普通的 JavaScript 对象来定义组件：
var ComponentA = { /* ... */ }
var ComponentB = { /* ... */ }
var ComponentC = { /* ... */ }
然后在 components 选项中定义你想要使用的组件：
new Vue({
  el: '#app',
  components: {
    'component-a': ComponentA,
    'component-b': ComponentB
  }
})
对于 components 对象中的每个属性来说，其属性名就是自定义元素的名字，其属性值就是这个组件的选项对象。

注意局部注册的组件在其子组件中不可用。例如，如果你希望 ComponentA 在 ComponentB 中可用，则你需要这样写：
var ComponentA = { /* ... */ }
var ComponentB = {
  components: {
    'component-a': ComponentA
  },
  // ...
}

<组件名
    :参数=""
>
</组件名>
Vue.component(
    组件名, {
        props:['参数'],//传参
        template: 组件模板 //使用参数
    }
);//全局组件

```

```
子组件和父组件通信    //发布订阅模式

通常你希望每个 prop 都有指定的值类型。这时，你可以以对象形式列出 prop，这些属性的名称和值分别是 prop 各自的名称和类型：
props: {
  title: String,
  likes: Number,
  isPublished: Boolean,
  commentIds: Array,
  author: Object
}

所有的 prop 都使得其父子 prop 之间形成了一个**单向下行**绑定：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外改变父级组件的状态，从而导致你的应用的数据流向难以理解。

<todo-item
        v-for="(item,index) of todoList"
        :content="item" //动态传值 v-bind     静态传值 =>  content = "item"
        :index="index"
        @delete="clear">
</todo-item>

//全局组件
Vue.component( //子组件
    'todo-item', {
        props:['content','index'], //通过 Prop 向子组件传递数据
        template: '<li @click="clean">{{content}}</li>',
        methods:{
            clean: function () {
            	this.$emit('delete',this.index);
            }
        }
    }
);
new Vue({
    el: "#app",
    data: {
        inputValue: '',
        todoList: []
    },
    methods: {
        clear: function (index) {
        	this.todoList.splice(index, 1);
        }
    }
})
```

```
使用Props传递数据 

组件实例的作用域是孤立的。这意味着不能并且不应该在子组件的模板内直接引用父组件的数据。可以使用 props 把数据传给子组件。 

prop 是父组件用来传递数据的一个自定义属性。子组件需要显式地用 props 选项 声明 “prop”： 

Vue.component('child', {
    // 声明 props 
    props: ['message'],
    // 就像 data 一样，prop 可以用在模板内 
    // 同样也可以在 vm 实例中像 “this.message” 这样使用 
    template: '<span>{{ message }}</span>' 
})
然后向它传入一个普通字符串： 
<child message="hello!"></child>

动态 Props 
类似于用 v-bind 绑定 HTML 特性到一个表达式，也可以用 v-bind 绑定动态 props 到父组件的数据。每当父组件的数据变化时，也会传导给子组件： 
<div> 
	<input v-model="parentMsg"> 
    <br> 
    <child v-bind:my-message="parentMsg"></child> 
</div> 

使用 v-bind 的缩写语法通常更简单： 
<child :my-message="parentMsg"></child> 
```

```
非父子组件通信 

有时候非父子关系的组件也需要通信。在简单的场景下，使用一个空的 Vue 实例作为中央事件总线： 
var bus = new Vue()

// 触发组件 A 中的事件 
bus.$emit('id-selected', 1)

// 在组件 B 创建的钩子中监听事件 
bus.$on('id-selected', function (id) {
// ... 
})
```

```
keep-alive
如果把切换出去的组件保留在内存中，可以保留它的状态或避免重新渲染。为此可以添加一个 keep-alive 指令参数： 
<keep-alive> 
    <component :is="currentView"> 
    <!-- 非活动组件将被缓存！ --> 
    </component> 
</keep-alive> 
```

```
动态组件 

多个组件可以使用同一个挂载点，然后动态地在它们之间切换。使用保留的 <component> 元素，动态地绑定到它的 is 特性： 
var vm = new Vue({
    el: '#example',
    data: {
    	currentView: 'home' 
    },
    components: {
        home: { /* ... */ },
        posts: { /* ... */ },
        archive: { /* ... */ }
    }
})


<component v-bind:is="currentView"> 
	<!-- 组件在 vm.currentview 变化时改变！ --> 
</component> 
也可以直接绑定到组件对象上： 
var Home = {
	template: '<p>Welcome home!</p>' 
}
var vm = new Vue({
    el: '#example',
    data: {
    	currentView: Home
    }
})
```

