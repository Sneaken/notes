
在以下链接查看最新的安装链接
> https://github.com/nvm-sh/nvm#install-script


```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```
或者

```bash
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

默认安装在 /root/.nvm 下
```bash
$ cd /root/.nvm
$ touch .bash_profile // 新建文件
$ vim .bash_profile // 编辑文件

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

$ source .bash_profile
$ nvm --version # 成功撒花
```


nvm 相关命令
```bash
$ nvm install node # 安装最新版本的node
$ nvm install 版本号 # 安装指定版本的node
$ nvm list # 查看本地安装的版本
$ nvm ls # 查看本地安装的版本
$ nvm ls-remote # 查看所有能安装的版本
$ nvm use 版本号或别称 # 切换版本
```
