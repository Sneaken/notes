centos 8

- 要检查 NGINX 的状态，您必须运行以下命令

  ```bash
  $ sudo systemctl status nginx
  ```

- 要停止您的 NGINX 服务器，请运行
  ```bash
  $ sudo systemctl stop nginx
  ```

- 如果要重新启动，则必须运行
  ```bash
  $ sudo systemctl start nginx
  ```

- 如果您对 NGINX 服务器进行了一些修改，则可以重新加载它而不必停止并重新启动它。要重新加载 NGINX，您只需运行
  ```bash
  $ sudo systemctl reload nginx
  ```

- 如果您不想在引导时启动 NGINX 服务器，则必须通过运行来禁用它
  ```bash
  $ sudo systemctl disable nginx
  ```


默认情况下，静态HTML文件位于"/usr/share/nginx/html"。
现在，您应该将内容放在您选择的位置，并在nginx 配置文件/etc/nginx/nginx.conf 中编辑根配置指令。
