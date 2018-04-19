## git远程管理

    > 为了便于管理，Git要求每个远程主机都必须指定一个主机名  

    [git-remote](images/git-remote.jpg)

* 列出所有主机名

    `git remote`        列出所有的远程主机名  
    `git remote -v`     列出所有远程的主机名和网址信息  
    `git clone -o <origin> git//github.com/project.git`     克隆时候可以命名远程主机名  

* 克隆远程版本库

    `git clone -o <origin> git//github.com/project.git <local-directory>`     克隆指定本地目录

* 管理远程主机

    `git remote add <主机名> <网址>`             新增主机  
    `git remote rm/remove <主机名>`                    删除主机  
    `git remote rename <原主机名> <新主机名>`     重命名主机  

* 远程主机代码更新

    `git fetch <远程主机名> <分支名>`  
    `git pull <远程主机名> <远程分支名>:<本地分支名>`  
    `git pull --rebase <远程主机名> <远程分支名>:<本地分支名>`  
    `git pull --force`  强制更新覆盖本地分支

* 远程主机代码提交

    `git push <远程主机名> <本地分支名>:<远程分支名>` 如果远程分支不存在，则会新建一个  
    `git push origin :master` 等于 `git push origin --delete master`  
    `git push -u origin master`  如果当前分支与多个主机存在追踪关系，使用-u指定默认主机  
    `git push --all origin`  将本地的所有分支都推送到远程主机  
    `git push --force origin`  强行覆盖远程主机上更新的版本
    `git push origin --tags`    push默认不推送标签，除非加上--tags

* 新增github项目

    ```js
    git init
    git add README.md
    git commit -m "first commit"
    git remote add origin https://github.com/cycle263/recordAudio.git
    git push -u origin master

    // set-upstream-to
    git branch --set-upstream-to=origin/master master
    git push/pull

    // push an existing repository from the command line
    git remote add origin https://github.com/cycle263/recordAudio.git
    git push -u origin master
    ```

    - github新建repository: repo_name

    - git remote add origin https://github.com/cycle263/repo_name.git

    - git pull

    - git branch --set-upstream-to=origin/master master

    - git add --all && git commit -m "all" && git push