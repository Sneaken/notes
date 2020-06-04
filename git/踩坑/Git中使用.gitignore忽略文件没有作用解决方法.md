首先这个情况是因为在之前你已经把文件提交过了

.gitignore的作用范围是在 没有提交过服务器的文件

**解决方法:**

在配置好.gitignore文件的之后，改变成未track状态，在项目目录下git Bash

git rm -r --cached .      删除缓存

git add .     重新添加

git commit -m 'update .gitignore'  提交

git push origin 分支名   到远端

亲测有效

