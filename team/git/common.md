## git常用步骤

* git config 配置  

    ```
    git config --global user.name "name"
    git config --global user.email "name@email.com"
    git config --global credential.helper store
    git config --global push.default simple
    ```

* git 创建repository  

    ```
    git clone [url] new_directory  
    cd new_directory  
    git checkout -b branch origin/new-name
    touch README.md  
    git add README.md  
    git commit -m "message"  
    git push -u origin develop  
    ```

* 已存在目录下创建  

    ```
    git init  //在当前目录新建一个Git代码库
    git remote add origin [url]
    git add .
    git commit -m "m"
    git push -u origin develop
    ```

* alipay work

    ```
    git checkout -b xx-feature
    git add --all
    git commit -am "描述"
    git pull --rebase origin master     //rebase远端主干代码
    // 解决冲突
    git push origin xx-feature:xx-feature       //push到远端分支
    ```

* 自动添加tag

    ```
    #!/bin/bash

    echo '用法： sh ./deploy.sh 0.0.1'
    echo '作用： 自动删除原先的tag，重新在当前commit打tag，并推送到默认分支'
    echo 'Author @加里，有问题请自己改代码'
    echo $1
    echo '-----------'
    echo
    echo

    git fetch
    git tag -d $1
    git push origin :$1
    git tag $1
    git push origin $1
    ```
