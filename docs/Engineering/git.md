# Git

## git常用命令

- 初始化一个仓库：git init
- 查看分支：git branch
- 将已修改或未跟踪的文件添加到暂存区：git add [file] 或 git add .
- 提交至本地仓库：git commit -m "提及记录xxxx"
- 本地分支推送至远程分支：git push
- 查看当前工作目录和暂存区的状态: git status
- 查看提交的日志记录： git log
- 从远程分支拉取代码：git pull
- 合并某分支(xxx)到当前分支： git merge xxx
- 切换到分支xxx：git checkout xxx
- 创建分支xxx并切换到该分支：git checkout -b xxx
- 删除分支xxx：git branch -d xxx
- 将当前分支到改动保存到堆栈中：git stash
- 恢复堆栈中缓存的改动内容：git stash pop

## git rebase 和 git merge 的区别

相同点：

`git merge`和`git rebase`两个命令都⽤于从⼀个分⽀获取内容并合并到当前分⽀。

不同点：  

1. `git merge`会⾃动创建⼀个新的`commit`，如果合并时遇到冲突的话，只需要修改后重新`commit`。

   - 优点：能记录真实的`commit`情况，包括每个分⽀的详情  
   - 缺点：由于每次`merge`会⾃动产⽣⼀个`commit`，因此在使用⼀些可视化的git工具时会看到这些自动产生的`commit`，这些`commit`对于程序员来说没有什么特别的意义，多了反而会影响阅读。

2. `git rebase`会合并之前的`commit`历史。  

   - 优点：可以得到更简洁的提交历史，去掉了merge 产生的`commit`  
   - 缺点：因为合并而产生的代码问题，就不容易定位，因为会重写提交历史信息  

### 场景

- 当需要保留详细的合并信息，建议使⽤`git merge`, 尤其是要合并到`master`上
- 当发现⾃⼰修改某个功能时提交比较频繁，并觉得过多的合并记录信息对自己来说没有必要，那么可尝试使用`git rebase`

## Gitflow 工作流

### GitFlow重点解决的是由于源代码在开发过程中的各种冲突导致开发活动混乱的问题。重点是对各个分支的理解

- master：主分支，存放随时可供生产环境使用的代码
- develop：开发分支，存放最新的开发代码
- feature：功能分支，从develop分支拉取，用于开发新功能
- release：预发布分支，从develop分支拉取，用于发布新版本
- hotfix：修复分支，从master分支拉取，用于修复线上bug
