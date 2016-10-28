## git背后原理

## git文件的三种状态

 * 已修改(modified)  

    已经修改了工作区的某些文件。  

 * 已暂存(staged)  

    已经执行了add操作，但还没有提交，只是暂存在提交清单里。  

 * 已提交(commited)  

    已经提交到本地仓库里，但还没push到远端仓库。  

  ![git状态](./images/Git-status.png)

## git 技巧命令  

 * 忽略提交某些文件  

    git目录下新建一个.gitignore的文件，如下案例：  

    ```
    # 此为注释 – 将被 Git 忽略
    *.a       # 忽略所有 .a 结尾的文件
    !lib.a    # 但 lib.a 除外
    /TODO     # 仅仅忽略项目根目录下的 TODO 文件，不包括 subdir/TODO
    build/    # 忽略 build/ 目录下的所有文件
    doc/*.txt # 会忽略 doc/notes.txt 但不包括 doc/server/arch.txt
    ```

 * git 比较命令  

    git diff    查看修改的文件与上次提交的文件差异

 * git 提交记录  

    git log     最近几次提交的记录信息  

    git log -p   最近几次提交的记录详情(包含内容)  

    git log -1   最近一次的提交记录信息  

    git log --stat   最近几次的提交统计信息(行数)  

    git log --follow [file]   显示某个文件的版本历史，包括文件改名  

    git blame [file]   显示指定文件是什么人在什么时间修改过  

    ```
    选项 说明
    -p 按补丁格式显示每个更新之间的差异。
    --stat 显示每次更新的文件修改统计信息。
    --shortstat 只显示 --stat 中最后的行数修改添加移除统计。
    --name-only 仅在提交信息后显示已修改的文件清单。
    --name-status 显示新增、修改、删除的文件清单。
    --abbrev-commit 仅显示 SHA-1 的前几个字符，而非所有的 40 个字符。
    --relative-date 使用较短的相对时间显示（比如，“2 weeks ago”）。
    --graph 显示 ASCII 图形表示的分支合并历史。
    --pretty 使用其他格式显示历史提交信息。可用的选项包括 oneline，short，full，fuller 和 format（后跟指定格式）。
    ```

 * git 取消对文件的修改  

    git checkout -- <file>  还原修改文件

 * git 推送到远端

    git push [remote-name] [branch-name]   git push (远程仓库名) (分支名)  

    git push [远程名] [本地分支]:[远程分支]  省略 [本地分支]，那就等于是在说“在这里提取空白然后把它变成[远程分支]”  

 * git 免密码push

    - window  credential.helper=store

    - mac   ssh 公钥和私钥

 * 不带任何参数的git push，默认只推送当前分支，这叫做simple方式。

    此外，还有一种matching方式，会推送所有有对应的远程分支的本地分支。Git 2.0版本之前，默认采用matching方法，现在改为默认采用simple方式。如果要修改这个设置，可以采用git config命令。  

    `git config --global push.default matching`  
    或者  
    `git config --global push.default simple`  
