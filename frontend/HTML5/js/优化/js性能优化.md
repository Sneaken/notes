浏览器渲染过程为：js/css(javascript) > 计算样式(style) > 布局(layout) > 绘制(paint) > 渲染合并图层（Composite）

```
JavaScript：JavaScript实现动画效果，DOM元素操作等。
Style（计算样式）：确定每个DOM元素应该应用什么CSS规则。
Layout（布局）：计算每个DOM元素在最终屏幕上显示的大小和位置。
Paint（绘制）：在多个层上绘制DOM元素的的文字、颜色、图像、边框和阴影等。
Composite（渲染层合并）：按照合理的顺序合并图层然后显示到屏幕上。
```

1. 避免全局查找
   访问局部变量会比访问全局变量快，因为js查找变量的时候现在局部作用局查找，找不到在逐级

   ```
   // bad
   function f () {
       for (...){
           console.log(window.location.href)
       }
   }
   
   //good
   function f () {
       var href = window.location.href
       for (...){
           console.log(href)
       }
   }
   ```

2. 循环技巧

   ```
   // bed 
   for(var i = 0; i < array.length; i++){
       ....
   }
   // good
   for(var i = 0, len = array.length; i < len; i++){
       ....
   }
   // 不用每次查询长度
   ```

3. 不要使用for in 遍历数组。

   for in是ES5标准，遍历key. 

   for in是最慢的，其他的都差不多，其中直接使用for循环是最快的。

   for in只是适合用来遍历对象。

   for of是ES6标准，遍历value.

   但是如果有大量的克隆操作，性能损耗时很大的。最佳的做法时在clone函数中明确复制每个属性

   ```
   function clone(obj){
       if (null == obj || "object"!=typeof obj) return obj;
       var copy = obj.constructor();
       copy.foo = obj.foo;
       copy.bar = obj.bar;
       return copy;
   }
   ```

   

4. 使用+''代替String()吧变量转化为字符串。

   ```
   var a = 12
   //bad
   a = String(a)
   
   // good
   var a = 12
   a = a + ''
   ```

   这个还有很多类似的，比如使用*1代替parseInt()等都是利用js的弱类型，其实这样对性能提升不是很大，网上有人测试过，进行十几万次变量转换，才快了零点几秒。

5. 删除dom

   删除dom元素要删除注册在该节点上的事件，否则就会产生无法回收的内存，在选择removeChild和innerHTML=''二者之间尽量选择后者，据说removeChild有时候无法有效的释放节点（具体原因不明）

6. 使用事件代理处理事件

   任何可以冒泡的事件都可以在节点的祖先节点上处理，这样对于子节点需要绑定相同事件的情况就不用分别给每个子节点添加事件监听，而是都提升到祖先节点处理。

7. 通过js生成的dom对象必须append到页面中

   在IE下，js创建的dom如果没有添加到页面，这部分内存是不会被回收的

8. 避免与null比较

   可以使用下面方法替换与null比较
   ```
   1.如果该值为引用类型，则使用instanceof检查其构造函数
   2.如果该值为基本类型，使用typeof检查类型
   ```

9. 尽量使用三目运算符代替if else

   ```
   if(a>b){num = a}
   else{num = b}
   
   // 可以替换为
   num = a > b ? a : b
   ```

10. 当判断条件大于3中情况时，使用switch代替if

    因为switch的执行速度比if要快，也别是在IE下，速度大约是if的两倍

11. 使用比较运算符 === 而不是 ==

12. 谨慎使用eval

13. 正确使用数组

    开发者在很多情况下会混用对象和数组。

    实际上，在索引时，一个混合了多种类型的数组将比类型单一的数组慢很多，

    因此，应使用数组保存类型单一的数据，而在其他情况下使用对象。

    