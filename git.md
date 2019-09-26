```

fatal: remote origin already exists.（报错远程起源已经存在。）
git remote rm origin	1
关联一个远程库，使用命令
git remote add origin git@server-name:path/repo-name.git	2

git fetch 本地同步远程
git push 远程同步本地


关联后，使用命令第一次推送master分支的所有内容
git push -u origin master

此后，每次本地提交后，只要有必要，就可以使用命令git push origin master推送最新修改；

远程分支创建
git push --set-upstream origin <branch_name>
远程分支删除
git push origin  -d <branch_name>

HEAD指向的版本就是当前版本，因此，Git允许我们在版本的历史之间穿梭，使用命令
git reset --hard commit_id

穿梭前，用git log可以查看提交历史，以便确定要回退到哪个版本。
要重返未来，用git reflog查看命令历史，以便确定要回到未来的哪个版本。

git add 文件名
git commit -m '提交推送说明' 主要是将暂存区里的改动给提交到本地的版本库   重点是本地

git add 命令实际上就是把要提交的所有修改放到暂存区（Stage），
然后，执行git commit就可以一次性把暂存区的所有修改提交到分支。

git checkout -- file
命令git checkout -- readme.txt意思就是，把readme.txt文件在工作区的修改全部撤销，这里有两种情况：
一种是readme.txt自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；
一种是readme.txt已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。
总之，就是让这个文件回到最近一次git commit或git add时的状态。

用命令git reset HEAD <file>可以把暂存区的修改撤销掉（unstage），重新放回工作区：

创建+切换分支：
git checkout -b <name>
git checkout命令加上-b参数表示创建并切换，相当于以下两条命令：
    git branch <name>
    git checkout <name>
    
    
查看当前分支：
git branch
示例：
	$ git branch
	* dev
  	  master
git branch命令会列出所有分支，当前分支前面会标一个*号。

查看远程分支
git branch -a

合并某分支到当前分支       先切换到要合并的主分支上 默认是fast forward
git merge <name>
示例：
 git checkout master
 git merge dev

git merge --no-ff -m "merge with no-ff" dev
合并分支时，加上--no-ff参数就可以用普通模式合并，合并后的历史有分支，能看出来曾经做过合并，而fast forward合并就看不出来曾经做过合并。

删除分支
git branch -d <name>

存储工作环境    git stash
当手头工作没有完成时，先把工作现场git stash一下，
然后去修复bug，修复后，再git stash pop，回到工作现场。

查看远程库的详细信息
git remote -v

多人协作的工作模式通常是这样：
首先，可以试图用git push origin <branch-name>推送自己的修改；
如果推送失败，则因为远程分支比你的本地更新，需要先用git pull试图合并；
如果合并有冲突，则解决冲突，并在本地提交；
没有冲突或者解决掉冲突后，再用git push origin <branch-name>推送就能成功！
如果git pull提示no tracking information，则说明本地分支和远程分支的链接关系没有创建，
用命令git branch --set-upstream-to <branch-name> origin/<branch-name>。
这就是多人协作的工作模式，一旦熟悉了，就非常简单。

一系列操作
git add 
git commit -m ''
git pull
git push

npm run build
```

