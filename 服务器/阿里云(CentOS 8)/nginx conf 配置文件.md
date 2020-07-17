########### 每个指令必须有分号结束。#################

# 全局块

配置影响 nginx 全局的指令。一般有运行 nginx 服务器的用户组，nginx 进程 pid 存放路径，日志存放路径，配置文件引入，允许生成 worker process 数等。

user nginx; # 设置使用用户
worker_processes auto; # 工作进程数(最好设置和 cpu 保持一致)
error_log /var/log/nginx/error.log # 制定日志路径，级别。这个设置可以放入全局块，http块，server块，级别以此为：debug|info|notice|warn|error|crit|alert|emerg
pid /run/nginx.pid # nginx 服务启动时候的 pid

# events 块

配置影响 nginx 服务器或与用户的网络连接。有每个进程的最大连接数，选取哪种事件驱动模型处理连接请求，是否允许同时接受多个网路连接，开启多个网络连接序列化等。

```
events {
    accept_mutex on;  # 设置网路连接序列化，防止惊群现象发生，默认为on
    # 惊群现象：一个网路连接到来，多个睡眠的进程被同时叫醒，但只有一个进程能获得链接，这样会影响系统性能。
    multi_accept on;  # 设置一个进程是否同时接受多个网络连接，默认为off
    # use epoll;      #事件驱动模型，select|poll|kqueue|epoll|resig|/dev/poll|eventport
    worker_connection 1024; # 一个进程允许处理的最大连接数，默认为512
}
```

# http 模块

可以嵌套多个 server，配置代理，缓存，日志定义等绝大多数功能和第三方模块的配置。

## server 块

配置虚拟主机的相关参数，一个 http 中可以有多个 server。

## location 块

配置请求的路由，以及各种页面的处理情况。

```
http {
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile            on;
    tcp_nopush          on;
    tcp_nodelay         on;
}

http {
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile            on; # 允许sendfile方式传输文件，默认为off，可以在http块，server块，location块。
    # sendfile_max_chunk  100k; # 每个进程每次调用传输数量不能大于设定的值，默认为0，即不设上限。
    tcp_nopush          on;
    tcp_nodelay         on;
    keepalive_timeout   65; # 连接超时时间，默认为75s，可以在http，server，location块。
    types_hash_max_size 2048;

    include             /etc/nginx/mime.types; # 文件扩展名与文件类型映射表
    default_type        application/octet-stream; # 默认文件类型，默认为text/plain

    # Load modular configuration files from the /etc/nginx/conf.d directory.
    # See http://nginx.org/en/docs/ngx_core_module.html#include
    # for more information.
    include /etc/nginx/conf.d/*.conf;

    server {
        # keepalive_requests 120; # 单连接请求上限次数。
        listen             80 default_server; # 监听的端口号
        listen             [::]:80 default_server;
        server_name        _; # 监听地址
        root               /usr/share/nginx/html;
        charset            utf-8; # 文件编码
        index              index.html index.htm; # 默认读取这两个文件作为主页，否则需要输入详细的路径。
        # random_index      on; # 随机选择一个文件做主页，默认关闭。# 有被这个坑到

        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;

        location / {
           deny  127.0.0.1;   # 拒绝的ip
           allow 172.18.5.54; # 允许的ip      
        }

        error_page 404 /404.html;
            location = /40x.html {
        }

        error_page 500 502 503 504 /50x.html;
            location = /50x.html {
        }
    }

# Settings for a TLS enabled server.
#
#    server {
#        listen       443 ssl http2 default_server;
#        listen       [::]:443 ssl http2 default_server;
#        server_name  _;
#        root         /usr/share/nginx/html;
#
#        ssl_certificate "/etc/pki/nginx/server.crt";
#        ssl_certificate_key "/etc/pki/nginx/private/server.key";
#        ssl_session_cache shared:SSL:1m;
#        ssl_session_timeout  10m;
#        ssl_ciphers PROFILE=SYSTEM;
#        ssl_prefer_server_ciphers on;
#
#        # Load configuration files for the default server block.
#        include /etc/nginx/default.d/*.conf;
#
#        location / {
#        }
#
#        error_page 404 /404.html;
#            location = /40x.html {
#        }
#
#        error_page 500 502 503 504 /50x.html;
#            location = /50x.html {
#        }
#    }

}

```

# 修改配置文件后需要重启 nginx

```bash
# 重启nginx(进程停掉, 重新启动一次)
$ systemctl restart nginx.service
# 不关闭服务柔和地重启(重新读取一次配置文件)
$ systemctl reload nginx.service
```
