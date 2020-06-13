class Vue {
  constructor(options) {
    this.$options = options;

    this.$data = options.data;
    // 响应式
    this.observe(this.$data);
  }
  // 递归遍历，使传递进来的对象响应化
  observe(value) {
    if (!value || typeof value !== "object") return;
    // 遍历
    Object.keys(value).forEach(key => {
      this.defineReactive(value, key, value[key]);
      this.proxyData(key);
    });
  }

  /**
   * 对key做响应式处理
   * @param obj
   * @param key
   * @param value
   */
  defineReactive(obj, key, value) {
    // 形成闭包了

    // 当value是对象时 需要递归
    this.observe(value);

    // 创建Dep实例： Dep 和 key 一一对应
    const dep = new Dep();

    Object.defineProperty(obj, key, {
      get() {
        // 将 Dep.target 指向的watcher实例加入到Dep中
        Dep.target && dep.addDep(Dep.target);
        return value;
      },
      set(v) {
        if (v !== value) {
          value = v;
          // 通知页面属性更新
          dep.notify();
        }
      }
    });
  }

  /**
   * 在vue根上定义属性代理data中的数据
   * @param key
   */
  proxyData(key) {
    Object.defineProperty(this, key, {
      get() {
        return this.$data[key];
      },
      set(v) {
        this.$data[key] = v;
      }
    });
  }
}

// 管理若干watcher实例， 和key是一对一关系  Dependence
class Dep {
  constructor() {
    this.deps = [];
  }

  addDep(watcher) {
    this.deps.push(watcher);
  }

  notify() {
    this.deps.forEach(dep => dep.update());
  }
}

// 保存ui中的依赖，实现update函数能使之更新
class Watcher {
  constructor(vm, key) {
    this.vm = vm;
    this.key = key;

    // 将当前实例指向 Dep.target
    Dep.target = this;
  }

  update() {
    console.log(`${this.key}属性更新了！`);
  }
}
