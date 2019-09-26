## 第一种 传值

```
<router-link tag="a" :to="{name: 'Exhibition', params: {img:item}}" class="thumbnail">
      <img class="xk" :src="item">
</router-link>

index.js
{ 
    path: ‘/exhibition’, 
    name: ‘Exhibition’, 
    component: Exhibition 
}

使用
<img :src="this.$route.params.img"/>
```

## 第二种 传值

```
<router-link tag="a" :to="{path: '/exhibition', query: {img:item}}" class="thumbnail">
      <img class="xk" :src="item">
</router-link>
index.js
{ 
    path: ‘/exhibition’, 
    name: ‘Exhibition’, 
    component: Exhibition 
}
使用
<img :src="this.$route.query.img"/>
```

## 第三种 传值

```
 <router-link to="/beautyChart/mz" tag="li">
 	<a href="#">美图</a>
 </router-link>

index.js
{ 
path: ‘/beautyChart/:type’, 
name: ‘BeautyChart’, 
component: BeautyChart 
}

使用
this.$route.params.type
```



结束语

第一种方式传值,参数不会显示在路径上,但是如果刷新页面传入的值会失效
--------------------- 
