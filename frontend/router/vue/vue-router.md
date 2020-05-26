```
Vue Router API 参考
https://router.vuejs.org/zh/api/#append

可以通过配置 tag 属性生成别的标签.
```




```
<div id="app">
  <p>
    <!-- 使用 router-link 组件来导航. -->
    <!-- 通过传入 `to` 属性指定链接. -->
    <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->    //tag是什么渲染成什么
    <router-link to="/foo" tag="">Go to Foo</router-link>
    <router-link to="/bar">Go to Bar</router-link>
  </p>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
</div>

let login = {
	template: '<h1>登录组件</h1>'
};
let register = {
	template: '<h1>注册组件</h1>'
};
let routerObj = new VueRouter({
    routes: [
    	{path:'/',redirect:'/login'},                //默认展示某个路由
        {path: '/login', component: login},
        {path:'/register',component:register}
    ]
});

new Vue({
    el: "#app",
    router: routerObj
});

当 <router-link> 对应的路由匹配成功，将自动设置 class 属性值 .router-link-active
```

```
动态路由匹配

动态路径参数
const User = {
  template: '<div>User</div>'
}

const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: '/user/:id', component: User }
  ]
})

一个“路径参数”使用冒号 : 标记。当匹配到一个路由时，参数值会被设置到 this.$route.params，可以在每个组件内使用。
const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}
```

```
常规参数只会匹配被 / 分隔的 URL 片段中的字符。如果想匹配任意路径，我们可以使用通配符 (*)：
{
  // 会匹配所有路径
  path: '*'
}
{
  // 会匹配以 `/user-` 开头的任意路径
  path: '/user-*'
}
```

```
嵌套路由
要注意，以 / 开头的嵌套路径会被当作根路径。 这让你充分的使用嵌套组件而无须设置嵌套的路径。
子路由path不能以/开头
const User = {
  template: `
    <div class="user">
      <h2>User {{ $route.params.id }}</h2>
      <router-view></router-view>
    </div>
  `
}

const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User,
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'profile',   !!!!!!!!!!!!!!!!!!!!!!!
          component: UserProfile
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: 'posts',
          component: UserPosts
        }
      ]
    }
  ]
})


```

