1. 合并多次的DOM操作为单次的DOM操作

   ```
   //优化方案1
   element.style.cassText += 'border:1px solid #f00;';
   //优化方案2
   element.className +='empty';
   ```

   优化方案2比优化方案1稍微有一点性能上的损耗，因为它速妖查询css类。但是优化方案2的维护性最好。

2. 把DOM元素离线或隐藏后修改

   ```
   使用文档片段
   通过设置DOM元素的display样式为none来隐藏元素
   克隆DOM元素到内存中
   ```

3. 设置具有动画效果的DOM元素的position属性为fixed或absolute

4. 谨慎取得DOM元素的布局信息