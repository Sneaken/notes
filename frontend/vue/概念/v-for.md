```
在 v-for 块中，我们拥有对父作用域属性的完全访问权限。v-for 还支持一个可选的第二个参数为当前项的索引。

<ul id="example-2">
  <li v-for="(item, index) in items">
    {{ parentMessage }} - {{ index }} - {{ item.message }}
  </li>
</ul>
var example2 = new Vue({
  el: '#example-2',
  data: {
    parentMessage: 'Parent',
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
  }
})

```

```
你也可以用 of 替代 in 作为分隔符，因为它是最接近 JavaScript 迭代器的语法：

<div v-for="item of items"></div>
```

```
一个对象的 v-for
你也可以用 v-for 通过一个对象的属性来迭代。

<ul id="v-for-object" class="demo">
  <li v-for="value in object">
    {{ value }}
  </li>
</ul>
new Vue({
  el: '#v-for-object',
  data: {
    object: {
      firstName: 'John',
      lastName: 'Doe',
      age: 30
    }
  }
})

你也可以提供第二个的参数为键名：

<div v-for="(value, key) in object">
  {{ key }}: {{ value }}
</div>

第三个参数为索引：

<div v-for="(value, key, index) in object">
  {{ index }}. {{ key }}: {{ value }}
</div>
```

```
在遍历对象时，是按 Object.keys() 的结果遍历，但是不能保证它的结果在不同的 JavaScript 引擎下是一致的。
```

```
v-for 遍历数据  2.0版本后   :key（String/Number） 加速渲染 -> 必须项
遍历的对象是数字时，从1开始遍历
<ul>
	<li v-for="(item,index) of list" :key="index">{{item}} {{index}}</li>
</ul>
```

