### 单个 Slot 

除非子组件模板包含至少一个 `<slot>` 插口，否则父组件的内容将会被**丢弃**。当子组件模板只有一个没有属性的 slot 时，父组件整个内容片段将插入到 slot 所在的 DOM 位置，并替换掉 slot 标签本身。 

​	最初在 `<slot>` 标签中的任何内容都被视为**备用内容**。备用内容在子组件的作用域内编译，并且只有在宿主元素为空，且没有要插入的内容时才显示备用内容。 

​	假定 `my-component` 组件有下面模板： 

```
<div>
    <h2>I'm the child title</h2> 
    <slot> 如果没有分发内容则显示我。</slot> 
</div> 
```

父组件模版： 

```
<div>
    <h1>I'm the parent title</h1>
    <my-component>
        <p>This is some original content</p>
        <p>This is some more original content</p>
    </my-component>
</div> 
```

渲染结果： 

```
<div>
    <h1>I'm the parent title</h1>
    <div>
    	<h2>I'm the child title</h2>
        <p>This is some original content</p>
        <p>This is some more original content</p>
    </div>
</div> 
```

### 具名Slots 

`<slot>` 元素可以用一个特殊的属性 `name` 来配置如何分发内容。多个 slot 可以有不同的名字。具名 slot 将匹配内容片段中有对应 `slot` 特性的元素。 

​	仍然可以有一个匿名 slot ，它是**默认 slot** ，作为找不到匹配的内容片段的备用插槽。如果没有默认的 slot ，这些找不到匹配的内容片段将被抛弃。 

​	例如，假定我们有一个 `app-layout` 组件，它的模板为： 

```
<div class="container">
    <header>
    	<slot name="header"></slot>
    </header>
    <main>
    	<slot></slot>
    </main>
    <footer>
    	<slot name="footer"></slot>
    </footer>
</div> 
```

父组件模版： 

```
<app-layout>
    <h1 slot="header">Here might be a page title</h1>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
    <p slot="footer">Here's some contact info</p>
</app-layout> 
```

渲染结果为： 

```
<div class="container">
    <header>
    	<h1>Here might be a page title</h1>
    </header>
    <main>
        <p>A paragraph for the main content.</p>
        <p>And another one.</p>
    </main>
    <footer>
    	<p>Here's some contact info</p>
    </footer>
</div> 
```

插槽作用域 缓存

```
<son>
    <template slot-scope="adc">
    	{{adc}}
    </template>
</son>

<template id="son">
  <div>
    <slot :asdsa="msg2"></slot>
  </div>
</template>
```

渲染结果为： 

```
<div>
	{"asdsa": "这是子组件的消息"}
</div>
```

