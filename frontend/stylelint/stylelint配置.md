## 在项目里启用

```
yarn add stylelint stylelint-config-prettier stylelint-config-rational-order stylelint-config-standard stylelint-declaration-block-no-ignored-properties stylelint-order -D
```

package.json
```json
{
  "scripts": {
    "lint-fix:style": "npm run lint:style -- --fix",
    "lint:style": "stylelint 'src/**/*.less' --syntax less"
  }
}
```


## 全局安装
```
yarn gloabl add stylelint stylelint-config-prettier stylelint-config-rational-order stylelint-config-standard stylelint-declaration-block-no-ignored-properties stylelint-order
```

### git提交忽略文件

  全局gitignore 添加 .stylelintrc.json

### webstorm file watchers 配置

文件类型: less (这个可以看具体环境)
程序：/(全局安装路径)/stylelint/bin/stylelint.js
参数：$FileName$ --syntax less --fix
要刷新的输出路径：$FileName$ 
工作目录：$FileDir$


## [配置文件](.stylelintrc.json)

需要放在项目根目录

### FAQ

1. 全局安装使用时遇到Could not find "stylelint-config-standard". Do you need a `configBasedir`?
   
   配置文件的路径要写全

2. webstorm file watchers: Cannot run program "$PATH" (in directory "$PATH"): error=13, Permission denied

   字面意思文件无可执行权限
   chmod a+x $PATH(替换懂吧，do not ctrl c+v)



