---
title: Git的基本操作和常见问题
---

## Branch

查看当前分支：`git branch`

创建并切换到新分支 `git checkout -b newBranch`

切换分支 `git checkout newBranch`

更新分支代码并提交 `git push origin newBranch`

从远程仓库拉取新的分支 `git fetch origin evt:evt`

## pull from origin


```
error: Your local changes to the following files would be overwritten by merge:
        cpp/TurboPFor/makefile
        setup.py
Please commit your changes or stash them before you merge.
```

此时如果想保留本地刚修改的代码
```
git stash
git pull origin master
git stash pop
```

如果完全覆盖本地的代码，只保留服务器端的代码，则直接回退到上一个版本，然后再pull

```
git reset --hard
git pull origin master
```

```
fatal: Refusing to fetch into current branch refs/heads/ReqMerge_26 of non-bare repository
```

这时是要切到别的分支再用`git fetch`

## git remote

设置origin : `git remote add origin ???`

