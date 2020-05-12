webpack 默认只能打包处理 js 类型的文件

webpack 执行逻辑

当在控制台直接输入 webpack 时，webpack 做了以下几步：

1. 检查是否指定入口和出口
2. 若没有，就去项目的根目录中查找 `webpack.config.js` 配置文件
3. 若存在配置文件，`webpack` 就去解析执行这个配置文件，当解析执行完配置文件之后，就得到了配置文件中导出的配置对象
4. 当 `webpack` 拿到配置对象后，就可以知道配置对象中指定的入口和出口，然后进行打包构建。
5. 其他情况 控制台应该时显示相关错误。

```js
// webpack.config.js
// 环境为node，向外暴露一个配置对象
const path = require("path")
module.exports = {
  entry: path.join(__dirname, '相对路径'), // 指定入口
  output: {
    path: path.join(__dirname, '相对路径'), // 指定出口 必须是绝对路径
    filename: 'bundle.js' // 指定出口文件名
  }, // 指定出口
}
```

包的查找规则

1. 找项目根目录中有没有 `node_modules` 文件夹
2. 在 `node_modules` 中 根据包名， 找到对应的文件夹
3. 在该文件夹中 找 `package.json` 配置文件
4. 在 `package.json` 文件中， 查找 `main` 属性（`main` 属性指定了这个包在被加载时候的入口文件）