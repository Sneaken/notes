# 通过brew安装docker以及docker的使用

## 一. docker的安装

    brew install --cask docker


## 二. docker的使用

### 2.1 查看版本

    docker --version
    
    docker-compose --version
    
    docker-machine --version

# 2.2 查看docker信息

    docker info

## 三. docker的基本命令

### 3.1 查看容器可用版本（nginx为例）

    docker search nginx

### 3.2 下载一个容器（镜像）

    docker pull nginx:latest（：后面跟容器版本）

### 3.3 启动并创建一个新的容器

    docker run -d -p 81:80 --name webserver nginx
    
    参数说明：
    
    --name webserver ：容器名称
    
    -p 81:80 ：端口进行映射，将本地的81端口映射到容器内部的80端口
    
    -d nginx ：设置容器中在后台一直运行
    
    -v ～/nginx/html:/usr/share/nginx/html 挂载，将主机项目中的目录挂载到容器的目录下
    3.4 停止nginx服务
    
    docker stop webserver(容器ID)

### 3.5 删除nginx服务

    docker rm webserver

### 3.6 启动/重启nginx服务

    docker start/restart webserver

### 4.1 列出所有镜像(列表包含了 仓库名、标签、镜像 ID、创建时间 以及 所占用的空间)

    docker image ls

### 4.1.1 默认查看顶层镜像，查看所有

    docker image ls -a
    
    注意：镜像ID是唯一标识，一个镜像可以对应多个标签

### 4.2 查看镜像、容器、数据卷所占用的空间

    docker system df

### 5.1 删除本地镜像

    docker image rm [镜像名称/镜像短ID/镜像长ID/镜像摘要]

### 5.2 删除虚悬镜像

    docker image prune

### 5.3 删除docker image ls 命令配合 删除所有仓库名为redis的镜像

    docker image rm $(docker image ls -q redis)

### 6.1 列出容器

    docker ps
    
    参数说明：
    
    -a：显示所有的容器，包括未运行的
    
    -l：显示最近创建的容器
    
    -n：列出最近创建的n个容器

### 7.1 进入容器

    docker exec -it [容器名称] bash
    docker attach [容器ID]

### 7.2 退出容器

    attach 方式进入： CTRL+P+Q 输入exit退出会关闭容器
