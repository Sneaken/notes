# Uncaught SyntaxError: Unexpected token '<'

路由改为 history 模式时 刷新页面 报以上错误

修改 vue.config.js

```
开发环境
publicPath: './' => publicPath: '/'
```

##总结

### 在 hash 模式

(开发|线上环境)

publicPath: './'

### 在 history 模式

(开发环境)
publicPath: '/'

(线上环境)
publicPath: '/(应用部署目录)/'
