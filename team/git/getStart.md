# 常用的命令

* 1、 git clone git@github.domain.com:project.git   克隆仓库代码到本地

* 2、 git branch   查看当前分支名称  
  git branch -r 参数查看所有分支

* 3、 git branch branch_name   创建一个名称为branch_name的新分支  
  git checkout branch_name    切换到一个名称为branch_name的分支  
  不存在此分支使用git checkout -b branch_name则会自动创建一个新的

* 4、 git status    查看更改的分支及其分支下的文件

* 5、 git add .     添加相关文件到git库管理

* 6、 git commit -n -m "修改说明"    提交代码, -n忽略检查

* 7、 git push -u origin branch_name    将当前改动提交到远程branch_name分支上

