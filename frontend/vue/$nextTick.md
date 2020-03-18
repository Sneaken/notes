```
什么时候使用？
为了在数据变化之后等待 Vue 完成更新 DOM，可以在数据变化之后立即使用Vue.nextTick(callback)。这样回调函数将在 DOM 更新完成后被调用。
不操作dom就用不上。
```



```
常规写法
methods: {
    updateMessage: function () {
        this.message = '已更新'
        console.log(this.$el.textContent) // => '未更新'
        this.$nextTick(function () {
            console.log(this.$el.textContent) // => '已更新'
        })
    }
}
```


```
使用新的 ES2017 async/await 语法：
methods: {
  updateMessage: async function () {
    this.message = '已更新'
    console.log(this.$el.textContent) // => '未更新'
    await this.$nextTick()
    console.log(this.$el.textContent) // => '已更新'
  }
}
```

