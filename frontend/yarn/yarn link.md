# 当几个模块开发时相互引用可以使用yarn link 命令

## 当 father 项目 引用 child 项目时

1. cd $child
2. yarn link
3. cd $father
4. yarn link $child

当使用完时 需要 unlink

1. cd $child
2. yarn unlink
3. cd $father
4. yarn unlink $child 


## 当是 react 应用时，遇到警告
```
Hooks can only be called inside the body of a function component.

There are three common reasons you might be seeing it:

1. You might have mismatching versions of React and React DOM.
2. You might be breaking the Rules of Hooks.
3. You might have more than one copy of React in the same app.

Let’s look at each of these cases.
```

解决方法: 全部项目都要使用主项目的react

```
1. cd $father/node_modules/react
2. yarn link
3. cd $child
4. yarn link react

```


## 本机所有注册的link

> 都在 `~/.config/yarn/link` 里
