```
registerHooks.ts
// 注册路由守卫 不知道为什么我这必须创建文件后导入才行？？？
import Component from 'vue-class-component'

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate'
])

main.ts
import '@/api/registerHooks' // 必须先导入
import Vue from 'vue'
...
```