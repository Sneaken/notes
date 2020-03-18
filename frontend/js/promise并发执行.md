```
axios.all([
    axios.get('http://47.105.83.60/index.php/yestoday', {
        params: {
            app_id: this.appid,
            channel: this.category
        }
    }),
    axios.get('http://47.105.83.60/index.php/get_num', {
        params: {
            app_id: this.appid,
            channel: this.category
        }
    })
])
.then(
    axios.spread((res1, res2) => {  //有几个并发链接 就是几个res
        console.log('全部加载完成')
        console.log(res1, 1)
        console.log(res2, 2)
    })
)
.catch(err => {
    console.log(err.response)
})
```

