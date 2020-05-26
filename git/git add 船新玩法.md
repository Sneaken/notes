## git add 用法

### 1. git add .
```bash
git add .
```
- 监控工作区的状态树，使用它会把工作时的所有变化提交到暂存区，包括文件内容修改(modified)以及新文件(new)，但不包括被删除的文件。

### 2. git add -u
```bash
git add -u
```
- 仅监控已经被add的文件，他会将被修改的文件提交到暂存区。add -u 不会提交新文件。(亲测确实如此) (git add --update的缩写)

### 3. git add -A
```bash
git add -A
```
- 是上面两个功能的合集。(git add --all的缩写)

## git push

- 项目只要有 commit 记录就能push。
- push完，原有分支上的 其他未提交的记录还存在。

