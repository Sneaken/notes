```
// 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)

更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。

Vuex.Store({
    state:{},//存放所有组件所共享的数据
    mutation：{ //放置同步修改state数据的方法
        方法名 (state，值) {
          // 变更状态
    	}
    },
    actions:{//放置异步修改state数据的方法
    //Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，
    因此你可以调用 context.commit 提交一个 mutation，或者通过 context.state 和 context.getters 
    来获取 state 和 getters。当我们在之后介绍到 Modules 时，
    你就知道 context 对象为什么不是 store 实例本身了。
        方法名(context，值){
            //异步操作
             context.commit('同步方法名'，值)
        }，
        //我们会经常用到 ES6的 参数解构 来简化代码（特别是我们需要调用 commit 很多次的时候）：
        increment ({ commit }，值) {
        	commit('同步方法名'，值)
        }
    }
})

store.commit('方法名'，值)//同步
store.dispatch('方法名'，值)//异步
```

