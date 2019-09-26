这是form表单的一个坑，就是当form表单中只有一个input输入框的时候，键盘回车事件就会刷新页面，因为form表单把这个事件当成了是提交表单的操作，所以解决方法是再写一个type为hidden的input标签。



另外，如果是element-ui中出现了这个问题，可以在el-form中写一个属性：@submit.native.prevent，这样也是可以解决这个问题的。

