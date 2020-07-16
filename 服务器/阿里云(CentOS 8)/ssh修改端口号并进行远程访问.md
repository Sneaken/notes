
# ssh修改端口号并进行远程访问

1. 修改配置文件sshd_config里端口号

```bash
vi /etc/ssh/sshd_config

#Port 22  修改成===>  Port 40339 #将注释打开，并且修改端口号
#AddressFamily any
#ListenAddress 0.0.0.0
#ListenAddress ::
```

2. 重启sshd服务
```bash
service sshd restart
```

然后我这就可以了。 有问题再说。
