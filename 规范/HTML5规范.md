# HTML 命名规范及格式规范

1. 代码所有的标签名和属性应该都为小写，虽然HTML代码式不区分大小写，但是W3C的规范建议小写；属性值应该使用双引号闭合。

   推荐示例;

   <img src="demo.jpg" alt="test”/>

2. 名称种全部使用小写,id名称中的关键词用下划线（_）连接，class的关键词用中划线（-）连接。

   推荐示例;

   ``` 
   <div id="reader">
   	<div id = "reader_introduce" class = "reader-introduce">
           ……
       </div>
   </div>
   ```

3. 如果class名称仅作为JavaScript调用的钩子，则可在名称中添加“js”前缀。

   推荐示例;

   ```
   <ul id="js_reader_menu">
   	<li class="menu-toc js-active">Toc</li>
   	<li class="menu-store js-active">Store</li>
   	<li class="menu-library">Lirary</li>
   	<li class="menu-news">News</li>
   </ul>
   ```

4. 注释添加的位置在要注释的代码上部并单独占用一行，不要在代码行的后面直接添加。

5. 层次缩进为4个空格

# CSS命名规范及格式规范

1. 推荐的CSS类的命名规范和元素的id命名规范相似，知识组成类名称的关键字的连接符为中划线（-）。

   示例代码：

   .reader-content-title {
   ​	…
   }

2. 为了避免class命名的重复,命名时取父元素的class名作为前缀。

   示例代码：

   .reader-content {
   	…
   }

   .reader-content-body {
   	…
   }

3. 多个选择器具有相同的样式声明时，每个选择器应该单独占一行，便于阅读和维护。

   推荐示例：

   ```
   h1,
   h2,
   h3 {
       font-weight:normal;
   	line-height: 1.2;
   }
   ```

   

4. 样式声明的顺序按字母顺序排列，不考虑浏览器前缀。

   示例代码：

   ```
   .reader-content-title {
     background-color: #FFFFFF;
     border: 1px solid;
     -moz-border-radius: 4px;
     -webkit-border-radius: 4px;
     border-radius: 4px;
     color: black;
     text-align: center;
   }
   ```

5. 样式定义按照模块来划分，相同模块的样式定义放在一起，不同模块的定义之间用一个空行分割。

# javascript 命名规范及格式规范

1. 局部变量名采用首字母小写，其他单词首字母大写的方式

2. 原则上公有接口的命名为首字母大写，私有接口的命名为首字母小写。

3. 应该一直使用大括号括起逻辑块，即使逻辑只有一行，也应该用大括号括起来，以便提高代码的可读性和可维护性。

   示例代码：

   ```
   var isFound = false;
   if (statement) {
       isFound = true;
   }
   ```

4. 用单引号定义字符串方便。

5. 空格的作用是提高代码可读性，在函数参数的逗号后面使用一个空格，在操作符前后各使用一个空格。另外，使用一个空行来区分业务逻辑段。

6. JavaScript 语句结束时应该添加一个分号。