```js
let Vue;
class Store {
  constructor(options) {
    // 响应式 与Vue强绑定
    this.state = new Vue({
      data: options.state
    });
    this.mutations = options.mutations;
    this.actions = options.actions;

    options.getters && this.handleGetters(options.getters);
  }

  // 在 actions 中提交 mutations 修改时，可能会改变 this 指向
  // 所以 在此使用箭头函数
  commit = (type, arg) => {
    this.mutations[type](this.state, arg);
  };

  dispatch(type, arg) {
    this.actions[type](
      {
        commit: this.commit,
        state: this.state
      },
      arg
    );
  }

  handleGetters(getters) {
    this.getters = {};
    Object.keys(getters).forEach(key => {
      // 定义只读方法
      Object.defineProperty(this.getters, key, {
        get: () => {
          return getters[key](this.state);
        }
      });
    });
  }
}

// 插件注册
function install(_Vue) {
  Vue = _Vue;

  //只有需要访问(实例) this 的时候才需要用混入，其他情况没必要用
  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store;
      }
    }
  });
}

export default { Store, install };
```
