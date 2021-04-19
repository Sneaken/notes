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
