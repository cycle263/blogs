## Git流程详解

![流程图](./images/git.png)

* 一般开发者：

  - 从服务器上克隆数据库（包括代码和版本信息）到单机上。
  - 在自己的机器上创建分支，修改代码。
  - 在单机上自己创建的分支上提交代码。
  - 在单机上合并分支。
  - 新建一个分支，把服务器上最新版的代码 fetch 下来，然后跟自己的主分支合并。
  - 生成补丁（patch），把补丁发送给主开发者。
  - 看主开发者的反馈，如果主开发者发现两个一般开发者之间有冲突（他们之间可以合作解决的冲突），就会要求他们先解决冲突，然后再由其中一个人提交。如果主开发者可以自己解决，或者没有冲突，就通过。
  - 一般开发者之间解决冲突的方法，开发者之间可以使用 pull 命令解决冲突，解决完冲突之后再向主开发者提交补丁。


* 主开发者：

  - 查看邮件或者通过其它方式查看一般开发者的提交状态。
  - 打上补丁，解决冲突（可以自己解决，也可以要求开发者之间解决以后再重新提交，如果是开源项目，还要决定哪些补丁有用，哪些不用）。
  - 向公共服务器提交结果，然后通知所有开发人员。

![详细流程图](./images/git-detail.png)

## git 命令详解

* git 初始化配置

  - 配置用户和email(全局配置，影响所有的git项目，不加--global则只影响本git项目)  
    `git config --global user.name "用户名"`  
    `git config --global user.email "Email"`
    `git config --local user.email "Email"`   // 修改本项目的email配置
    `git config --global push.default simple`     // 修改全局配置中push的默认方式

  - 查看所有的配置  
    `git config --list`
    `git config --global --list   // 查看全局的所有配置项`

  - push提示log中有不符合规定的邮箱
    撤销不符合规定的commitid，或者还原后重新commit，方能push到远端

* git 克隆源码

  - 克隆代码  
    `git clone git@github.com:username/repository.git`  
    `git clone https://username:password@github.com/username/repository.git`

  - 抓取代码  
    `git fetch` 远端抓取代码  
    `git pull`  远程抓取并合并，相当于git fetch和git merge两步    
    `git pull origin branch-name`   抓取指定分支代码

* git 提交源码  

  - 添加改动到本地库   
    `git add .` 或者 `git add -file`   file: 文件的完整路径名称  

  - 查看改动状态  
    `git status`

  - 提交改动  
    `git commit [-a] -m "message"`   message: 提交记录信息  
    `git commit -am "message"`      相当于`git add .` + commit
    可选参数 -a: 表示保护内容修改和增删

  - 同步到服务端  
    `git push`  同步到依赖的远端分支，可省略后面参数，可选参数 -f: 表示强制覆盖  
    `git push origin HEAD:<name-of-remote-branch>` 或者 `git push origin lbranch-1:refs/rbranch-1`  // 将当前分支推送到源存储库中的远程引用匹配主机，这种形式方便推送当前分支，而不考虑其本地名称。
    `git push origin branch-name`  不存在的远端分支：`git push origin localBranch:remoteBranch`

* git 合并代码

  - 合并任意分支的commitId  
    `git merge commitId`  合并分支中某一提交记录

* git 比较代码

  - 比较分支的差异  
    `git diff master develop` 比较master分支和develop分支的差异

  - 查看修改内容  
    `git diff`  查看详细修改内容   
    `git show`   显示某次提交的内容  

  - 比较缓存区和上次提交差异  
    `git diff --cached`     比较上次提交和git add后的缓存的文件差距

* git 撤销操作

  - 回滚提交  删除指定的commit，直接重置

    `git checkout .`  恢复暂存区的所有文件到工作区  
    `git checkout [commit] [file]`  恢复某个commit的指定文件到暂存区和工作区  
    `git checkout [file]`  恢复暂存区的指定文件到工作区 
    `git checkout -- file`  让这个文件回到最近一次git commit或git add时的状态

    `git reset <file>`  某个文件索引会回滚到最后一次提交， C → B, 也即是重置暂存区的指定文件，与上一次commit保持一致，但工作区不变  
    `git reset --hard [commit]`  重置当前分支的HEAD为指定commit，同时重置暂存区和工作区，与指定commit一致  
    `git reset [commit]`  重置当前分支的指针为指定commit，同时重置暂存区，但工作区不变  
    `git reset --hard`  重置暂存区与工作区，与上一次commit保持一致  
    `git reset --hard origin/master`     重置暂存区和工作区，与远端master保持一致，包括版本号
    `git reset --hard HEAD^`    回滚到上一个版本
    `git reset --hard HEAD^^`   回滚到上上个版本
    `git reset --hard HEAD~10`  回滚到前10个版本

  - 暂存数据 -- (暂存本地修改，工作区还原到上次提交)

    `git stash`  暂存工作区代码到本地栈
    `git stash apply ${0}`  恢复栈内最近暂存的数据到工作区
    `git stash pop` 恢复最近暂存，并从栈内删除
    `git stash list`  查看本地栈列表

  - 恢复代码  会产生新的commit

    git revert 是用一次新的commit来回滚之前的commit，git reset是直接删除指定的commit。

    `git revert [commit]` 恢复到指定的某个版本

* git 分支管理

  - 新建分支  
    `git branch branch-new-name`  新建分支  
    `git checkout -b branch origin/new-name`  切换分支，新建一个branch的本地分支，并且依赖于远端origin库的new_name分支，不存在就新建分支  
    git checkout -b [分支名] [远程名]/[分支名]  

  - 切换分支
    `git checkout branch-name`  切换到已经存在的分支
    `git checkout -b branch origin/new-name`  新建本地分支并映射到对应的远端分支

  - 跟踪分支(依赖分支)
    `git branch --track develop origin/develop`      新建一个tracking指向远端develop
    `git branch --set-upstream-to=origin/<branch> [develop]`  将已经存在的分支指向远端，push/pull不用指向远端了，直接连接指定的远端分支
    或者 `git branch --set-upstream master origin/master`
    `git branch --set-upstream-to origin/master`
    `git push -u origin develop` 这个操作在push的同时会指定当前分支的upstream。

    git中存在upstream和downstream，简言之，当我们把本地仓库A中某分支x的代码push到远端仓库B分支y，此时仓库B的这个分支y就叫做A中x分支的upstream，而x则被称作y的downstream，这是一个相对关系，每一个本地分支都相对地可以有一个远程的upstream分支（注意这个upstream分支可以不同名，但通常我们都会使用同名分支作为upstream）。

  - 删除分支
    `git push origin :develop` 删除远端分支develop
    `git checkout -d/-D develop` 删除本地分支develop
    `git checkout -d/-D -r origin/develop` 删除一个tracking的远端branch, 并未push

  - 查看HEAD指向分支
    `cat .git/HEAD` 或者 `git show-ref`

## git文件的三种状态

 * 已修改(modified)  
    已经修改了工作区的某些文件。  

 * 已暂存(staged)  
    已经执行了add操作，但还没有提交，只是暂存在提交清单里。  

 * 已提交(commited)  
    已经提交到本地仓库里，但还没push到远端仓库。  

  ![git状态](./images/Git-status.png)

## git config --global push.default详解

  * 1.nothing
    不推送任何东西并有错误提示，除非明确指定分支引用规格。强制使用分支引用规格来避免可能潜在的错误。

  * 2.current
    推送当前分支到接收端名字相同的分支，在远程同名分支不存在的情况下自动创建同名分支

  * 3.upstream
    推送当前分支到上游@{upstream}。这个模式只适用于推送到与拉取数据相同的仓库，比如中央工作仓库流程模式。

  * 4.simple
    在中央仓库工作流程模式下，拒绝推送到上游与本地分支名字不同的分支。也就是只有本地分支名和上游分支名字一致才可以推送，就算是推送到不是拉取数据的远程仓库，只要名字相同也是可以的。在GIT 2.0中，simple将会是push.default的默认值。simple只会推送本地当前分支。

  *  5.matching
    推送本地仓库和远程仓库所有名字相同的分支。这是git 1.x版本的缺省值，执行 git push 但没有指定分支，它将 push 所有你本地的分支到远程仓库中对应匹配的分支。

  *  配置push.default的命令如下：

    `git config --global push.default simple`