## lerna 一般结合 yarn workspace 一起使用

## 完整的一套流程

### 首先应该全局安装 lerna

### 流程

1. npm init -y // 创建 package.json 初始化项目

然后添加一下属性

```json
{
  "private": true,
  "workspaces": ["packages/@sn/*"]
}
```

2. lerna init // 生成 packages 目录 和 lerna.json

修改属性

```json
{
  "npmClient": "yarn",
  "useWorkspaces": true,
  //
  "packages": ["packages/@sn/cli*"]
}
```

3. 然后添加子包

```bash
lerna create @sn/cli
lerna create @sn/cli-shared-utils
```

4. 增加模块依赖

```bash
# 给所有的包添加依赖
lerna add xxx

# 给 子包1 添加依赖
lerna add chalk --scope 子包1

# 增加内部模块之间的依赖 子包2 添加到 子包1 的依赖项中
lerna add [子包2] --scope [子包1]
```
