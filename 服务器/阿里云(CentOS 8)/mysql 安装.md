# 大前提 CentOS 8 mysql 8
1. sudo dnf install @mysql # 安装
2. sudo systemctl start mysqld 启动mysql
3. sudo systemctl enable mysqld 设置开机自启

## 默认没有密码 现在修改密码
在MySQL 8.04前，执行：set password = password(‘[新密码]’);
但是MySQL8.0.4开始，这样默认是不行的。
因为之前，MySQL的密码认证插件是“mysql_native_password”，而现在使用的是“caching_sha2_password”。

修改密码为123456（密码可以设置为任意值）：

```
mysql> use mysql;
mysql> alter user 'root'@'localhost' identified with mysql_native_password by '123456';
Query OK, 0 rows affected (0.01 sec)

mysql> flush privileges; # 刷新配置
Query OK, 0 rows affected (0.00 sec)

mysql> quit
Bye
```

## 用密码进入mysql命令行

```bash
$ mysql -u root -p
提示输入密码
```

## 注意安全组规则 可能上台服务器你不是3306端口！！！！！

## 设置远程登录

```
mysql> select Host, User from user;
+-----------+------------------+
| host      | user             |
+-----------+------------------+
| %         | root             | # 这条存在才能远程登录
| localhost | root             |
| localhost | mysql.infoschema |
| localhost | mysql.session    |
| localhost | mysql.sys        |
+-----------+------------------+
如果不存在

mysql> update user set host = '%' where user = 'root';
mysql> flush privileges; # 一定要刷新配置
```

mysql 5.6时
授权法
```
mysql>grant all privileges on *.* to 'root'@'%' identified by '123456' with grant option;
```

mysql 8时 不支持以上操作
不能授权给自己 要先新建一个其他用户 再给那个用户权限就行了。
```
mysql> create user 'root'@'%' identified by 'root'; # 新建用户
mysql> alter user 'root'@'%' identified with mysql_native_password by '密码' # 设置用户密码
mysql> grant all privileges on *.* to 'root'@'%'; # 赋权限
mysql> flush privileges; # 刷新配置使生效
```
