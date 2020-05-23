设置->工具-> 终端

shell 路径： git安装目录\Git\bin\bash.exe

ls命令 发现中文显示不正常

尝试了网上的方法

最终有效的方法：

然后修改git安装路径下的bash.bashrc文件，在文件最后添加

```
export LANG="zh_CN.UTF-8"
export LC_ALL="zh_CN.UTF-8"
```