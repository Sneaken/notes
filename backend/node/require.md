```
首先，文件命名最好不要出现空格 、点、中文等字符，并且建议全小写字符以免在不同的开发环境和系统环境下出错。
require(模块名)
	自定义模块 用 相对路径
	系统模块 直接填 系统模块名
	文件后缀默认.js 可以省略
// 引入本地模块：
const myLocalModule = require('./path/myLocalModule');

// 引入 JSON 文件：
const jsonData = require('./path/filename.json');

// 引入 node_modules 中的模块或 Node.js 内置的模块：
const crypto = require('crypto');
```

```
require导入的模块是单独存放在一个作用域里面的
模块缓存机制
node 的 顶层对象是 global
let n = ''
global.n = n //可以挂在顶层对象取值 但是污染顶层对象

require()
		返回值是 导入的模块的exports内的东西 
				exports 默认是一个对象

模块内最终输出的是module.exports
而exports 和 module.exports是引用关系
exports 重新赋值 改变了 引用

exports 变量是在模块的文件级别作用域内有效的，它在模块被执行前被赋予 module.exports 的值。
它有一个快捷方式，以便 module.exports.f = ... 可以被更简洁地写成 exports.f = ...。 注意，就像任何变量，如果一个新的值被赋值给 exports，它就不再绑定到 module.exports：

module.exports.hello = true; // 从对模块的引用中导出
exports = { hello: false };  // 不导出，只在模块内有效
当 module.exports 属性被一个新的对象完全替代时，也会重新赋值 exports，例如：

module.exports = exports = function Constructor() {
  // ... 及其他
};

```

