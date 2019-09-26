```
表单控件绑定
用 v-model 指令在表单控件元素上创建双向数据绑定。
它会根据控件类型自动选取正确的方法来更新元素。尽管有些神奇，但 v-model 本质上不过是语法糖，它负责监听用户的输入事件以更新数据，并特别处理一些极端的例子。 

v-model 并不关心表单控件初始化所生成的值。因为它会选择 Vue 实例数据来作为具体的值。 

v-model的作用 ：收集表单中的数据
    单选按钮  收集的是value值
    多选按钮  收集的是value值  数据收集在数组中
    下拉框    收集的是value值
              两种情况  可以收集单个选中的下拉框  数据存在字符串中
                       可以收集多个选中的下拉框  数据存在数组中
    文本域和普通的表单元素  都是收集在字符串中

文本 
<input v-model="message" placeholder="edit me">
<p>Message is: {{ message }}</p>

多行文本 
<span>Multiline message is:</span>
<p style="white-space: pre">{{ message }}</p>
<br>
<textarea v-model="message" placeholder="add multiple lines"></textarea>

复选框 
单个勾选框，逻辑值： 
<input type="checkbox" id="checkbox" v-model="checked">
<label for="checkbox">{{ checked }}</label>
多个勾选框，绑定到同一个数组： 
<input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
<label for="jack">Jack</label>
<input type="checkbox" id="john" value="John" v-model="checkedNames">
<label for="john">John</label>
<input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
<label for="mike">Mike</label>
<br>
<span>Checked names: {{ checkedNames }}</span>

new Vue({
    el: '...',
    data: {
    	checkedNames: []
    }
})

单选按钮 
<input type="radio" id="one" value="One" v-model="picked">
<label for="one">One</label>
<br>
<input type="radio" id="two" value="Two" v-model="picked">
<label for="two">Two</label>
<br>
<span>Picked: {{ picked }}</span>

选择列表 

单选列表: 
<select v-model="selected">
    <option>A</option>
    <option>B</option>
    <option>C</option>
</select>
<span>Selected: {{ selected }}</span>

多选列表（绑定到一个数组）： 
<select v-model="selected" multiple>
    <option>A</option>
    <option>B</option>
    <option>C</option>
</select>
<br>
<span>Selected: {{ selected }}</span>

动态选项，用 v-for 渲染： 
<select v-model="selected">
    <option 
    	v-for="option in options" 
    	v-bind:value="option.value">
    {{ option.text }}
    </option>
</select>
<span>Selected: {{ selected }}</span>


new Vue({
    el: '...',
    data: {
        selected: 'A',
        options: [
            { text: 'One', value: 'A' },
            { text: 'Two', value: 'B' },
            { text: 'Three', value: 'C' }
        ]
    }
})

绑定 value 
对于单选按钮，勾选框及选择列表选项， v-model 绑定的 value 通常是静态字符串（对于勾选框是逻辑值）： 
<!-- 当选中时，`picked` 为字符串 "a" -->
<input type="radio" v-model="picked" value="a">

<!-- `toggle` 为 true 或 false -->
<input type="checkbox" v-model="toggle">

<!-- 当选中时，`selected` 为字符串 "abc" -->
<select v-model="selected">
	<option value="abc">ABC</option>
</select>

但是有时我们想绑定 value 到 Vue 实例的一个动态属性上，这时可以用 v-bind 实现，并且这个属性的值可以不是字符串。 

修饰符 
.lazy 
在默认情况下， v-model 在 input 事件中同步输入框的值与数据，但你可以添加一个修饰符 lazy ，从而转变为在 change 事件中同步： 
<!-- 在 "change" 而不是 "input" 事件中更新 -->
<input v-model.lazy="msg" >

.number 
如果想自动将用户的输入值转为 Number 类型（如果原值的转换结果为 NaN 则返回原值），可以添加一个修饰符 number 给 v-model 来处理输入值： 
<input v-model.number="age" type="number">
这通常很有用，因为在 type="number" 时 HTML 中输入的值也总是会返回字符串类型。 

.trim 
如果要自动过滤用户输入的首尾空格，可以添加 trim 修饰符到 v-model 上过滤输入： 
<input v-model.trim="msg">
```

