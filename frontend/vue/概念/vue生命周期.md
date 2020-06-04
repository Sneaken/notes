```
									 生命周期
beforeCreate：
            在实例初始化之后，数据观测(data observer)和 event/watcher事件配置之前被调用，
            注意是之前，此时data、watcher、methods统统滴没有。
            这个时候的vue实例还什么都没有，data中没有数据，但是$route对象是存在的，可以根据路由信息进行重定向之类的操作。

created：
            在实例已经创建完成之后被调用。在这一步，实例已完成以下配置：数据观测，属性和方法的运算，watch/event 事件回调。
            然而，挂载阶段还没开始，$el属性目前不可见。
            data已经有数据了  但是数据没有挂载到视图中，数据没有挂载在根节点
            此时 this.$data 可以访问，watcher、events、methods也出现了，若根据后台接口动态改变data和
            methods的场景下，可以使用。
            使用ajax请求数据
            
beforeMount：
            在挂载开始之前被调用，相关的 render 函数 首次被调用。
            但是render正在执行中，此时DOM还是无法操作的。
            我打印了此时的vue实例对象，相比于created生命周期，此时只是多了一个$el的属性，然而其
            值为undefined。（此时根节点已经存在  但是数据还没有挂载到根节点）
            页面渲染时所需要的数据，应尽量在这之前完成赋值。

mounted：
            在挂载之后被调用。在这一步 创建vm.$el并替换el，并挂载到实例上。
            此时元素已经渲染完成了，依赖于DOM的代码就放在这里吧~比如监听DOM事件。
            此时数据已经挂载到根节点上了

beforeUpdate：
            $vm.data更新之后，虚拟DOM重新渲染 和打补丁之前被调用。
            你可以在这个钩子中进一步地修改$vm.data，这不会触发附加的重渲染过程。

updated：
            虚拟DOM重新渲染 和打补丁之后被调用。
            当这个钩子被调用时，组件DOM的data已经更新，所以你现在可以执行依赖于DOM的操作。但是不要在此时
            修改data，否则会继续触发beforeUpdate、updated这两个生命周期，进入死循环！

beforeDestroy：
            实例被销毁之前调用。在这一步，实例仍然完全可用。
            实例要被销毁了，赶在被销毁之前搞点事情吧哈哈~

destroyed：
            Vue实例销毁后调用。此时，Vue实例指示的所有东西已经解绑定，所有的事件监听器都已经被移除，所有的
            子实例也已经被销毁。
            这时候能做的事情已经不多了，只能加点儿提示toast之类的东西吧。

注：beforeMount、mounted、beforeUpdate、updated、beforeDestroy、destroyed这几个钩子函数，在服务器端渲染期间不被调用。


如果要在某个生命周期函数中使用  最终的vm实例
则用this.nextTick(回调)  在回调函数中是可以访问到 最终的vm实例

vm.$data  获取数据
vm.$el    获取根节点
vm.$set(对象，属性，值)
vm.$mount(el)
vm.$destroy
```

```
beforeCreate() {
	console.log('beforeCreate')
}
created() {
	console.log('created')
}
beforeMount() {
	console.log('beforeMount')
}
mounted() {
	console.log('mounted')
}
beforeRouteEnter(to: Route, from: Route, next: (vm: any) => void) {
    console.log('beforeRouteEnter')
    next((vm: any) => {
    	console.log(vm)
    })
}

Home.vue?42b8:36 beforeRouteEnter
Home.vue?42b8:24 beforeCreate
Home.vue?42b8:27 created
Home.vue?42b8:30 beforeMount
Home.vue?42b8:33 mounted
Home.vue?42b8:38 VueComponent {_uid: 4, _isVue: true, $options: {…}, _renderProxy: Proxy, _self: VueComponent, …}$attrs: (...)$listeners: (...)input: (...)$data: (...)$props: (...) ...}
```