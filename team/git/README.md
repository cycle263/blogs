# 常用的命令

    > Git command

* 1、 git clone git@github.domain.com:project.git   克隆仓库代码到本地

* 2、 git branch   查看本地分支，并标注当前分支  
  git branch -r 参数查看远程所有分支

* 3、 git branch branch_name   创建一个名称为branch_name的新分支  
  git checkout -b branch origin/name  切换分支, 依赖远端origin库的name分支  
  git checkout branch_name    切换到一个名称为branch_name的分支  
  不存在此分支使用git checkout -b branch_name则会自动创建一个新的

* 4、 git status    查看更改的分支及其分支下的文件

* 5、 git add .     添加相关文件到git库管理

* 6、 git commit -n -m "修改说明"    提交代码, -n忽略检查

* 7、 git push origin branch_name    将当前改动提交到远程branch_name分支上


### 备注

* -r 一般指远端，远端分支前面一般带有库默认名origin

* -d 一般指删除，大写D强制删除
