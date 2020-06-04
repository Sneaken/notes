```
Vue中的驼峰式写法和短连接符写法
字符串模板：template:``
单文件组件（.vue）：<template></template>

html是不区分大小写的，统一转化为小写，本文主要讨论使用vue-cli构建的项目，即使用单文件组件的情况下。

组件名
按照约定，组建名命名应该是PascalCase的，在单文件组件中使用组件时，以下方式都可以：
<HelloWorld></HelloWorld>、<hello-world></hello-world>

下面的方式是不可以的：
<helloworld></helloworld>

prop：
作为JavaScript变量时必须是camelCase，在申明prop时使用短连接符kebab-case和驼峰式camelCase都可以：
props: ['test-message'],、props: ['testMessage'],(建议使用camelCase)

父组件中传递该prop时也是两种方式都可以:
<child test-message="Hello World"></child>(建议使用kebab-case)
<child testMessage="Hello World"></child> ，会转化为kebab-case,
而使用<child testmessage="Hello World"></child>是不可以的。

自定义事件名
与组件名和prop不同，自定义事件名不会自动在camelCase和kebab-case之间转换，父组件中使用的事件名和子组件中触发的事件名必须严格一致

child组件：
<button @click="$emit('testAction')"></button>
parent组件：
<child @testAction="saySomething"></child>
推荐自定义事件名在子组件和父组件中都使用kebab-case:
<button @click="$emit('test-action')"></button>
<child @test-action="saySomething"></child>

```

