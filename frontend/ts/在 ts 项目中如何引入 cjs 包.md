# 在 ts 项目中如何引入 cjs 包

> https://www.typescriptlang.org/docs/handbook/modules.html#export--and-import--require

```
import isDev = require('electron-is-dev');
```

## 在 tsconfig.json 中配置以下字段

"esModuleInterop": true

即可使用

```ts
import isDev from 'electron-is-dev'
```

