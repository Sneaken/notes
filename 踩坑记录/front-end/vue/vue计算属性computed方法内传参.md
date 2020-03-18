```
//闭包传参
注意不能直接在text后面加参数，没效果（应该是vue不支持）
有效的 qiyu_admin production组件上有
computed: {
    text() {
        return function (index) {
        	return this.Ratedata[index].currentRate.toFixed(0) + '%';
        }
    }
},
```

