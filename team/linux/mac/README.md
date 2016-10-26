## mac环境

* ssh远程中文乱码问题  UTF-8

* 环境变量配置

    vi ~/.bash_profile 或者 ~/.zshrc

    ```
    export M2=/usr/local/Cellar/maven2/2.2.1/bin
    export JAVA_HOME=/Library/Java/JavaVirtualMachines/1.6.0.jdk/Contents/Home
    export CLOUDENGINE_HOME=/Users/cycle263/software/cloudEngine/cloudengine-3.1.8
    export LC_ALL=en_US.UTF-8
    export LANG=en_US.UTF-8
    export NODE_PATH=/usr/local/lib/node_modules
    export PATH=$PATH:$M2:$NODE_PATH
    ```
* 显示隐藏文件

    `defaults write com.apple.finder AppleShowAllFiles  YES`

* 强制关闭进程

  alt + command + esc
