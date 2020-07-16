
## 第一步
### 安装过node
```bash
$ curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | sudo tee /etc/yum.repos.d/yarn.repo
```
### 没安装过node

```bash
$ curl --silent --location https://rpm.nodesource.com/setup_8.x | sudo bash -
```

## 第二步
```bash
$ sudo yum install yarn
## OR ##
$ sudo dnf install yarn
```

通过如下命令测试 Yarn 是否安装成功：
```bash
$ yarn --version
```
