一般单页面应用，vue都是通过vue-router来做跳转（this.\$router.push，this.$router.replace），不会像多页应用一样另起新标签页面显示(注：不是打开新的浏览器页面)。要想实现，可以用以下方式：

```
let newpage = this.$router.resolve({ 
      name: 'messageInfo',
      query:{
          objectType:1,
          infoId:id
      }   
})  
window.open(newpage.href, '_blank');
```

优点：此方式，可以把sessionStorage 中的token一起带过去。

缺点：在新标签页和旧标签页，组件之间方法调用会失效

只要将vue-router和windwow.open结合就好了。原理很简单，获取到需要跳转的地址，再把地址传递给window.open。

window.open会新建窗口打开路由地址，原页面的路由不做跳转。