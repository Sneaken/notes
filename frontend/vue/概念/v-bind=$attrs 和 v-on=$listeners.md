vm.\$attrs 是一个属性，其包含了父作用域中不作为 prop 被识别 (且获取) 的特性绑定 (class 和 style 除外)。这些未识别的属性可以通过 v-bind="\$attrs" 传入内部组件。

未识别的事件可通过v-on="$listeners"传入

举个例子，比如我创建了我的按钮组件myButton，封装了 element-ui 的 el-button 组件（其实什么事情都没做），在使用组件 <my-button />时，就可以直接在组件上使用 el-button 的属性,不被 prop 识别的属性会传入到 el-button 元素上去

```html
<template>
  <div>
    <el-button v-bind="$attrs">导出</el-button>
  </div>
</template>
<!--父组件使用-->
<my-button type='primary' size='mini'/>
```

```
在Vue2.4.0,可以在组件定义中添加inheritAttrs：false，
组件将不会把未被注册的props呈现为普通的HTML属性。
但是在组件里我们可以通过其$attrs可以获取到没有使用的注册属性，
如果需要，我们在这也可以往下继续传递。
```

自己封装的组件 组件内部要是没监听事件 则在外部监听的事件就无效，如：

```vue
<template>
  <div>点击事件</div>
</template>
<!--父组件使用-->
<my-button @click="handleClick"/> <!--此时事件无效-->
```

```vue
<template>
  <div @on="$listeners">点击事件</div> <!--并不一定要是顶部元素-->
  <!-- 这样也可以（在需要监听的元素上绑定就行）
    <div>
      <div @on="$listeners"></div>
    </div>
   -->
</template>
// 父组件使用
<my-button @click="handleClick"/> // 此时事件无效
```

