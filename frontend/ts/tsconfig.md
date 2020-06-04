在 vue/react 中 引入 ts 文件
import xxx from '@/xxx(/xxx)'
提示 can't find modules '...xxx'

凡是配置过 alias

都在 tsconfig.js 文件中添加以下内容

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["src/*"],
      "@comp/*": ["src/components/*"],
      "other": "根据自己配置过的 alias 而定"
    }
  }
}
```
