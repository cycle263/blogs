# Git

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
  
* git 初始化配置

  - 配置用户和email  
    `git config --global user.name "用户名"`  
    `git config --global user.email "Email"`

* git 克隆源码

  - 克隆代码  
    `git clone git@github.com:username/repository.git`  
    `git clone https://username:password@github.com/username/repository.git`

  - 抓取代码  
    `git fetch` 远端抓取代码  
    `git pull`  远程抓取并合并，相当于git fetch和git merge两步  

* git 提交源码  

  - 添加改动到本地库   
    `git add .` 或者 `git add -file`   file: 文件的完整路径名称  

  - 查看改动状态  
    `git status`

  - 提交改动  
    `git commit [-a] -m "message"`   message: 提交记录信息  
    可选参数 -a: 表示保护内容修改和增删

  - 同步到服务端  
    `git push`  指定了分支，可省略后面参数       
      可选参数 -f: 表示强制覆盖  
    `git push origin HEAD:<name-of-remote-branch>`

* git 合并代码

  - 合并任意分支的commitId  
    `git merge commitId`  合并分支中某一提交记录

* git 比较代码

  - 比较分支的差异  
    `git diff master develop` 比较master分支和develop分支的差异

  - 查看修改内容  
    `git diff`  查看详细修改内容   
    `git show`   显示某次提交的内容  

* git 撤销操作

  - 回滚提交
    `git reset <file>`  某个文件索引会回滚到最后一次提交， C → B
