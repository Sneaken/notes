# 简单实现 Vue-Router

```js
import Vue from "vue";
//  hash 模式
class VueRouter {
  constructor(options) {
    this.$options = options;
    this.routeMap = {};
    // 路由响应式 与vue是强绑定关系
    this.app = new Vue({
      data: {
        current: "/"
      }
    });
  }

  init() {
    this.bindEvents(); // 监听url变化
    this.createRouteMap(this.$options); // 解析路由配置
    this.initComponent(); // 实现组件 router-link router-view
  }

  bindEvents() {
    window.addEventListener("load", this.onHashChange.bind(this));
    window.addEventListener("hashchange", this.onHashChange.bind(this));
  }
  onHashChange() {
    this.app.current = window.location.hash.slice(1) || "/";
  }
  createRouteMap(options) {
    options.routes.forEach(item => {
      this.routeMap[item.path] = item.component;
    });
  }
  initComponent() {
    Vue.component("router-link", {
      props: {
        to: {
          type: String
        }
      },
      render(h) {
        return h("a", { attrs: { href: `#${this.to}` } }, [
          this.$slots.default
        ]);
      }
    });

    Vue.component("router-view", {
      render: (h) => {
        const comp = this.routeMap[this.app.current]
        return h(comp)
      }
    });
  }
  // 注册插件
  install(Vue) {
    Vue.mixin({
      beforeCreate() {
        if (this.$options.router) {
          Vue.prototype.$router = this.$options.router;
          this.$options.router.init();
        }
      }
    });
  }
}

Vue.use(VueRouter);
```
