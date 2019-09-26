1. ### 问题：当使用路由参数时，例如从 /content?id=1 到 content?id=2，此时原来的组件实例会被复用。这也意味着组件的生命周期钩子不会再被调用，此时vue应该如何响应路由参数 的变化？

   ```
   复用组件时，想对路由参数的变化作出响应的话， 可以watch (监测变化) $route 对象
   const User = {
     template: '...',
     watch: {
       '$route' (to, from) {
         // 对路由变化作出响应...
       }
     }
   }
   或者使用 2.2 中引入的 beforeRouteUpdate 守卫：
   const User = {
     template: '...',
     beforeRouteUpdate (to, from, next) {
       // react to route changes...
       // don't forget to call next()
     }
   }
   ```

2. ### 完整的 vue-router 导航解析流程

   ```
   导航被触发。
   在失活的组件里调用离开守卫。
   调用全局的 beforeEach守卫。
   在重用的组件里调用 beforeRouteUpdate守卫 (2.2+)。
   在路由配置里调用beforeEnter。
   解析异步路由组件。
   在被激活的组件里调用beforeRouteEnter。
   调用全局的 beforeResole 守卫 (2.5+)。
   导航被确认。
   调用全局的afterEach 钩子。
   触发 DOM 更新。
   用创建好的实例调用beforeRouteEnter 守卫中传给 next 的回调函数。
   ```

3. ### vue-router 有哪几种导航钩子（ 导航守卫 ）？

```
1、全局守卫： router.beforeEach

2、全局解析守卫： router.beforeResolve

3、全局后置钩子： router.afterEach

4、路由独享的守卫： beforeEnter

5、组件内的守卫： beforeRouteEnter、beforeRouteUpdate (2.2 新增)、beforeRouteLeave

导航表示路由正在发生改变，vue-router 提供的导航守卫主要用来:通过跳转或取消的方式守卫导航。有多种机会植入路由导航过程中：全局的, 单个路由独享的, 或者组件级的。

注意：参数或查询的改变并不会触发进入/离开的导航守卫。 你可以通过 观察 $route 对象 来应对这些变化，或使用 beforeRouteUpdate的组件内守卫。
```

