## npm 模块安装机制

  安装之前，npm install会先检查，node_modules目录之中是否已经存在指定模块。如果存在，就不再重新安装了，即使远程仓库已经有了一个新版本，也是如此。如果你希望，一个模块不管是否安装过，npm 都要强制重新安装，可以使用-f或--force参数。

  -- registry 指定安装依赖包镜像地址


## 模块的安装过程

  * 发出npm install命令

  * npm 向 registry 查询模块压缩包的网址

  * 下载压缩包，存放在~/.npm目录

  * 解压压缩包到当前项目的node_modules目录
