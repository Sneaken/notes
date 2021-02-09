## 使用 ssh-copy-id 实现免密登录

```bash
ssh-copy-id [-p 登录端口号] username@host
```

## 直接追加

直接往服务器`~/.ssh/authorized_keys`文件追加给过来的公钥


## 校验

设置成功会在`~/.ssh/authorized_keys`文件里看到添加的公钥
