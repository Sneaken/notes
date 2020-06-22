# git-cz 规范代码提交

## 安装

```
npm install commitizen -g

or

yarn global add commitizen
```

## 初始化

```
commitizen init cz-conventional-changelog --save-dev --save-exact

or

commitizen init cz-conventional-changelog --yarn --dev --exact
```

## package.json

以后 提交 统一用 git-cz

```json
{
  "scripts": {
    "commit": "git add . && git-cz"
  }
}
```
