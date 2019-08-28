## mac环境

* ssh远程中文乱码问题  UTF-8

  ```sell
  locale 查看本地和远端的字符集编码方式

  vi ~/.zshrc 修改本地的shell配置，在文件最后加上

  export LC_ALL="zh_CN.GBK"
  export LANG="zh_CN.GBK"
  ```

* 环境变量配置

  `vi ~/.bash_profile 或者 ~/.zshrc`

  ```shell
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

  `alt + command + esc`

* iterm2 登录远端服务器，有警告地址映射不匹配，可删除对应的`~/.ssh/known_hosts`文件的公钥匹配记录

* 查看端口号占用情况

  `lsof -i tcp:port`  or `sudo lsof -i :port`

  `kill -9 PID  // 杀死进程` 

* 快速截屏

  `COMMAND+SHIFT+3`，截取全屏
  
  `COMMAND+SHIFT+4`，框取截屏

* shell退出远程

  `exit / logout`

* mac环境大小写不敏感

* 查看端口号是否被占用

  `lsof -i tcp:1099`
  `kill pid`

### 其他资料

[iterm2主题配色](https://www.jianshu.com/p/9c3439cc3bdb)