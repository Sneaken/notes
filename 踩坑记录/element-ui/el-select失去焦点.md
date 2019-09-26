```
el-select组件绑定ref
//通过$nextTick()调用 否则无效果
this.$nextTick(() => {
	this.$refs[`${ref值}`].blur() //若无效果 可能是绑定的ref值已经被用掉了 换个新的ref值
})
```

