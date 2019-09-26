## 解决Vue渲染echarts图表宽度只显示100px问题



在调试时,发现是图表在页面加载时生成的width就是100px,上网查找说是没有resize,我照做之后还是没有解决,

几经周折之后,总算求到了解决之道

```javascript
//方法一  效果不好 canvas不自适应居中了
let id = document.getElementById('id_name')
id.style.width = window.innerWidth/2-20+'px';  //重点是这部分  页面加载时 echarts可能默认是100px 要设置相应宽度  直接设置宽度不会出现echarts容器自适应动画
echarts.init(id);
echarts.setOption(options)

//方法二 无效
echarts.setOption(options)
chartOne.resize()  //重点是这部分 初始化后 自适应大小  要放在setOption后面

//方法三 都是辣鸡 这个稍微有点用
const id = document.getElementById('realtime')
let chartTwo = echarts.init(id, 'light')
setTimeout(function () {
    //重点是这个 setTimeout
    chartTwo.resize()
},50)
window.addEventListener('resize', () => {
    chartTwo.resize()
})
```



