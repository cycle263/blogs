## pont接入流程

* vscode中安装pont插件

* 安装pont-engine `yarn add pont-engine`

* 自动生成pont-config.json文件  `pont start`

* 使用pont-engine命令或者vscode插件操作  `pont ls` 查看所有数据源

  `pont select [dsName]`  切换数据源

  `pont diff`  查看远程数据和本地数据在模块、基类上的差异，以作针对性、选择性同步

* pont-template，修改request方法的模板