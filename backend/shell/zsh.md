# Q&A

1. 没有换行符的输出多了一个`%` ?

默认自动给没有换行符的字符串添加一个百分号%，同时另起一行显示新的提示符.

方法一： 不推荐

把这个功能关闭

```zsh
unsetopt prompt_cr prompt_sp
```

方法二：推荐

在.zshrc 中添加以下内容

```
export PROMPT_EOL_MARK=''
```
