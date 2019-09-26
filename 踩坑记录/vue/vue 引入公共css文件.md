1、在入口js文件main.js中引入，一些公共的样式文件，可以在这里引入。

```
import Vue from 'vue'
import App from './App' // 引入App这个组件
import router from './router' /* 引入路由配置 */
import axios from 'axios'
import '../static/css/global.css' /*引入公共样式*/
```

2、在index.html中引入
```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>stop</title>
    <link rel="stylesheet" href="./static/css/global.css"> /*引入公共样式*/
  </head>
  <body>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
```
3、在app.vue中引入，但是这样引入有一个问题，就是在index.html的HEADH上会多出一个空的<style></style>
```
<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  @import './../static/css/global.css'; /*引入公共样式*/

</style>
```