## 如何从 Node.js 程序退出

在这种情况下，您需要向该命令发送 SIGTERM 信号，并使用过程信号处理程序进行处理

该 process 核心模块提供了一个方便的方法，可以让你从一个 Node.js 的程序编程方式退出：process.exit()。

```
const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('Hi!')
})

const server = app.listen(3000, () => console.log('Server ready'))

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Process terminated')
  })
})

```

`SIGKILL` 是告诉进程立即终止的信号，理想情况下，其行为类似于 process.exit()。

`SIGTERM` 是告诉进程正常终止的信号。这是从诸如 upstart 或 supervisord 其他许多流程管理器发出的信号。

## 如何从 Node.js 读取环境变量

processNode.js 的核心模块提供了 env 属性，该属性托管在启动进程时设置的所有环境变量。

这是一个访问 NODE_ENV 环境变量的示例，该环境变量默认设置为 development。

process.env.NODE_ENV // "development"

在脚本运行之前将其设置为“development”将告诉 Node.js 这是一个生产环境。

您可以用相同的方式访问您设置的任何自定义环境变量。

## Node.js，从命令行接受参数

使用以下命令调用 Node.js 应用程序时，可以传递任意数量的参数

```bash
node app.js
```

参数可以是独立的，也可以具有键和值。

例如：

```bash
node app.js joe
```

要么

```bash
node app.js name=joe
```

这将改变您在 Node.js 代码中检索此值的方式。

检索它的方法是使用 processNode.js 中内置的对象。

它公开了一个 `argv` 属性，该属性是一个包含所有命令行调用参数的数组。

    第一个元素是 `node` 命令的完整路径。

    第二个元素是正在执行的文件的完整路径。

    从第三个位置开始，所有其他参数都存在。

您可以使用循环遍历所有参数（包括节点路径和文件路径）：

```node
process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});
```

您可以通过创建一个排除前两个参数的新数组来仅获取其他参数：

```node
const args = process.argv.slice(2);
```

如果您有一个没有索引名称的参数，如下所示：

```bash
node app.js joe
```

您可以使用

```bash
const args = process.argv.slice(2);
args[0];
```

在这种情况下：

```bash
node app.js name=joe;
```

args[0]是 name=joe，您需要解析它。最好的方法是使用 minimist 库，该库有助于处理参数：(第三方包)

```node
const args = require("minimist")(process.argv.slice(2));
args["name"]; //joe
```

这次，您需要在每个参数名称之前使用双破折号：

```bash
node app.js --name=joe
```
