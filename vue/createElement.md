```
const h = this.$createElement

h(
    'el-radio-group',
    {
    	value: row.stick.channel,
        on: {
            input(value) {
            	self.$refs.radioGroup.value = value  // 不能操作props的值  但是能用就是有警告 暂时想不到什么好方法
            }
        },
    	ref: 'radioGroup'
    },
    channelList.map(item => {
        return h(
            'el-radio',
            {
                props: {
                	label: item
                }
            },
            item
        )
    })
)
```

