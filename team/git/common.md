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
