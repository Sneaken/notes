
如果已经通过git push提交了，看你们公司用的什么git服务器了，一般用户想修改的话需要相关的权限，找管理员了;

如果已经有其他开发人员基于你的提交进行了修改并提交的话，那就更麻烦了，后面的所有提交都要重新做一遍;

如果还没有push到服务器，只是本地进行了commit，并且没有进行新的commit，只需要git commit --amend;

如果进行了新的commit，只需要git reset --soft xxx （xxx有问题那次提交的commit id），然后在进行git commit就行，不过所有后面的提交都成为了一次提交;

如果想保持每次提交独立的话，使用git checkout -b tmp ^xxx
git cherry-pick xxx
git commit --amend
git cherry-pick <依次后面的提交id>
