`webpack` 处理第三方文件类型的过程：

1. 发现要处理的文件不是`js`文件， 然后就去配置文件中查找有没有对应的第三方`loader`规则。
2. 如果能找到对应的规则，就会调用对应的`loader`处理这种文件类型。
3. 在调用`loader`时，是从后往前调用的。
4. 当最后一个`loader`调用完毕， 会把处理的结果直接交给`webpack`进行打包合并，最终输出到`bundle.js` 中去。

`url-loader` 
1. 把图片打包成 `base64` 格式的字符串 减少网络请求（针对小图片） `8k` 以下 
2. 处理字体文件

`css-loader` 处理并解析 `css` 文件

`style-loader` 生成 style 标签 并把标签插入到 head 标签里

```js
// npm install xxx -D loader 安装
// loader 使用顺序从右向左
// less,scss,stylus 安装需要安装相应的loader
// use: ['style-loader','css-loader', 'less-loader']
// webpack.config.js
module.exports = {
  module: {
    rules: [
      { test: /\.(jpg|gif|png)$/, use: ['url-loader'] }, // >=limti 不转化为base64
      { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' } // 处理字体文件的loader
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.less$/,
        use: [
          { loader: "style-loader" }, // creates style nodes from JS strings
          { loader: "css-loader" }, // translates CSS into CommonJS
          { loader: "less-loader" }, // compiles Less to CSS
        ]
      },
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
    ]
  }
}
```

`postcss-loader`  处理 `css` 的兼容前缀 必须搭配 `autoprefixer`

`min-css-extract-plugin` 把 `css` 代码 打包成`.css` 文件

`optimize-css-assets-webpack-plugin` 在 `Webpack` 构建过程中搜索 `CSS assets`，并优化/最小化 `CSS`(默认情况下它使用 `cssnano`，但可以指定自定义 `CSS` 处理器)。

```js
// webpack.config.js
const MiniCssExtractPlugin = require("min-css-extract-plugin")
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
modules.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/xxx/css'
    }),
    new OptimizeCssAssetsPlugin(),
    new HtmlWebpackPlugin()， // Generates default index.html
    new HtmlWebpackPlugin({  // Also generate a test.html
      filename: 'test.html',
      template: 'src/assets/test.html'  // 自己配置的模板
      minify: {
        collapseWhitespace: true // 压缩打包后的html代码
      }
    })
  ]
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader, options: { esModule: true } },
          'css-loader',
          'postcss-loader'
        ]
      },
    ]
  }
}
```



`vue` 相关loader

默认 `webpack `是 无法打包`.vue`文件（理由不用说了），需要安装相应的`loader`

```shell
cnpm i vue-loader vue-template-compiler -D
```

在配置文件中增加loader 配置项

```
module:{
  rules: [
    { test: /\.vue$/i, use: 'vue-loader'}
  ]
}
```



