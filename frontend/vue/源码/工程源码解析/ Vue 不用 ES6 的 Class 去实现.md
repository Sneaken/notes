 摘自： https://ustbhuangyi.github.io/vue-analysis/v2/prepare/entrance.html#vue-%E7%9A%84%E5%85%A5%E5%8F%A3
 
 Vue 实际上就是一个用 Function 实现的类，我们只能通过 new Vue 去实例化它。

# 为何 Vue 不用 ES6 的 Class 去实现呢？

我们往后看这里有很多 xxxMixin 的函数调用，并把 Vue 当参数传入，它们的功能都是给 Vue 的 prototype 上扩展一些方法，Vue 按功能把这些扩展分散到多个模块中去实现，而不是在一个模块里实现所有，这种方式是用 Class 难以实现的。这么做的好处是非常方便代码的维护和管理，这种编程技巧也非常值得我们去学习。


```
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue
```
