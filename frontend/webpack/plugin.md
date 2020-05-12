`plugin`系统提供给开发者监听`webpack`生命周期并在特定事件触发时执行指定操作的能力。

`plugin`的配置很简单，`plugins`配置项接收一个数组，数组里的每一项都是一个要使用的`plugin`的实例，`plugin`需要的参数通过构造函数传入。

`html-webpack-plugin`作用：

1. 为`html`文件中引入的外部资源如`script`、`link`动态添加每次`compile`后的`hash`，防止引用缓存的外部文件问题
2. 可以生成创建`html`入口文件，比如单页面可以生成一个 `html` 文件入口，配置 N 个 `html-webpack-plugin` 可以生成 N 个页面入口

```js
// webpack.config.js
const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: {...}, // 指定入口
  output: {...}, // 指定出口
  plugins: [
    new HtmlWebpackPlugin({ // 打包输出HTML
      title: 'Hello World app', // 生成html文件的标题
      hash: true, // 给生成的 js 文件加上相应哈希 如下
      // <script type=text/javascript src=bundle.js?22b9692e22e7be37b57e></script>
      minify: { // 压缩HTML文件
        // 是否对大小写敏感，默认false
        caseSensitive: true,
        // 是否简写boolean格式的属性如：disabled="disabled" 简写为disabled  默认false
        collapseBooleanAttributes: true,
        // 是否去除空格，默认false
        collapseWhitespace: true,
        // 是否压缩html里的css（使用clean-css进行的压缩） 默认值false；
        minifyCSS: true,
        // 是否压缩html里的js（使用uglify-js进行的压缩）
        minifyJS: true,
        // Prevents the escaping of the values of attributes
        preventAttributesEscaping: true,
        // 是否移除属性的引号 默认false
        removeAttributeQuotes: true,
        // 是否移除注释 默认false
        removeComments: true,
        // 从脚本和样式删除的注释 默认false
        removeCommentsFromCDATA: true,
        // 是否删除空属性，默认false
        removeEmptyAttributes: true,
        // 若开启此项，生成的html中没有 body 和 head，html也未闭合
        removeOptionalTags: false,
        // 删除多余的属性
        removeRedundantAttributes: true,
        // 删除script的类型属性，在h5下面script的type默认值：text/javascript 默认值false
        removeScriptTypeAttributes: true,
        // 删除style的类型属性， type="text/css" 同上
        removeStyleLinkTypeAttributes: true,
        // 使用短的文档类型，默认false
        useShortDoctype: true,
      },
      filename: 'index.html', // 打包输出的html的文件名称
      template: path.join('__dirname', './xxx.html') // 文件路径 按照哪个模板文件打包 （不填则默认是空的html5模板文件）
    }),
  ]
}
```
