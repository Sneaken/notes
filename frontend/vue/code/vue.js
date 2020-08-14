// 管理若干watcher实例， 和key是一对一关系  Dependence
class Dep {
  constructor() {
    // 存储观察者
    this.deps = [];
  }

  /**
   * 添加观察者
   * @param watcher
   */
  addDep(watcher) {
    if (watcher && watcher.update) {
      this.deps.push(watcher);
    }
  }

  /**
   * 数据更新后通知视图更新
   */
  notify() {
    this.deps.forEach(dep => dep.update());
  }
}

class Watch {
  constructor(vm, key, cb) {
    this.vm = vm;
    this.key = key;
    this.cb = cb;
    Dep.target = this;
    this.oldValue = this.vm[key];
    Dep.target = null; // 防止重复添加
  }

  update() {
    const newValue = this.vm[this.key];
    if (newValue === this.oldValue) return;
    this.cb(newValue);
    this.oldValue = newValue; // 旧值一定要更新。
  }
}
class Compiler {
  constructor(vm) {
    this.vm = vm;
    this.el = vm.$el;
    this.compiler(this.el);
  }
  compiler(node) {
    const childNodes = node.childNodes;
    Array.from(childNodes).forEach(node => {
      if (this.isTextNode(node)) {
        this.handleTextNode(node);
      } else if (this.isElementNode(node)) {
        this.handleElementNode(node);
      }
      if (node.childNodes && node.childNodes.length) {
        this.compiler(node);
      }
    });
  }

  // 处理文本节点
  handleTextNode(node) {
    const reg = /\{\{(.+?)\}\}/;
    const value = node.textContent;
    if (reg.test(value)) {
      const key = RegExp.$1.trim();
      node.textContent = value.replace(reg, this.vm[key]);
      // 设置观察者
      new Watch(this.vm, key, newValue => {
        node.textContent = newValue;
      });
    }
  }

  // 处理元素节点
  handleElementNode(node) {
    Array.from(node.attributes).forEach(attr => {
      let attrName = attr.name;
      if (this.isDirective(attrName)) {
        attrName = attrName.substr(2);
        const key = attr.value;
        this.handleDirective(node, attrName, key);
      }
    });
  }

  // 处理指令入口
  handleDirective(node, attr, key) {
    const fn = this[`${attr}Handler`];
    fn && fn.call(this, node, key, this.vm[key]);
  }
  // 处理v-text
  textHandler(node, key, value) {
    console.dir(node);
    node.textContent = value;
    // 设置观察者
    new Watch(this.vm, key, newValue => {
      node.textContent = newValue;
    });
  }
  // 处理v-model
  modelHandler(node, key, value) {
    node.value = value;
    new Watch(this.vm, key, newValue => {
      node.value = newValue;
    });
    node.addEventListener("input", () => {
      this.vm[key] = node.value;
    });
  }

  // 判断文本节点
  isTextNode(node) {
    return node.nodeType === 3;
  }
  // 判断元素节点
  isElementNode(node) {
    return node.nodeType === 1;
  }
  // 判断是属性是否含有指令
  isDirective(attrName) {
    return attrName.startsWith("v-");
  }
}

class Observe {
  constructor(data) {
    this.walk(data);
  }

  walk(data) {
    if (!data || typeof data !== "object") return;
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key]);
    });
  }

  // 注册响应式
  defineReactive(obj, key, value) {
    const _this = this;
    this.walk(value);
    const dep = new Dep();
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        Dep.target && dep.addDep(Dep.target);
        return value;
      },
      set(newValue) {
        if (newValue === value) return;
        value = newValue; // 为什么用value 不用 data[key]? 回答一下
        _this.walk(newValue); // newValue 是对象的话 也要添加响应式
        dep.notify(); // 通知视图更新
      }
    });
  }
}

class Vue {
  constructor(options) {
    this.$options = options;
    this.$el =
      typeof options.el === "string"
        ? document.querySelector(options.el)
        : options.el;
    this.$data = options.data;
    this.proxyData(this.$data);
    new Observe(this.$data);
    new Compiler(this);
  }

  /**
   * 在vue根上定义属性代理data中的数据
   */
  proxyData(data) {
    Object.keys(data).forEach(key => {
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get() {
          return data[key];
        },
        set(newValue) {
          if (newValue === data[key]) return;
          data[key] = newValue;
        }
      });
    });
  }
}
