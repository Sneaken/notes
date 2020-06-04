问题场景
使用{{}}文本插值方式，通过.级联显示内容。如下代码，foo通过后端接口返回。
后端内容返回之前，控制台会Cannot read property ‘xxx’ of undefined的错误。

```html
<div>
  <h1>{{ foo.title }}</h1>
  <p>{{ foo.description }}</p>
</div>
```
### 解决方案

```html
<div>
  <h1 v-if="foo.title">{{ foo.title }}</h1>
  <p v-if="foo.description">{{ foo.description }}</p>
</div>
```

或者

```html
<div>
  <template v-if="foo">
    <h1>{{ foo.title }}</h1>
    <p>{{ foo.description }}</p>
  </template>
</div>
```

或者

```js
new Vue({
  foo: {
    title: '',
    description : ''
  },
  created(){
    // 调用后端接口
  }
})
```

