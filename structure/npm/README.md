## npm

npm脚本都存放在package.json文件里的scripts字段里，也可以直接运行nodejs脚本。

[install](images/install.png)

- 安装  

  * npm install  安装所有的依赖

  * npm install --force[-f]  强制重新安装

  * npm install -g [module]  全局安装，整个系统都可以访问

  * npm install [module]  安装在当前目录下

  * npm install --save [module]   安装当前目录，并加入package.json

  * npm i -D [module] i: install, -D:--save-dev,

- 更新 和 搜索

  更新: `npm update [module]@version`   

  搜索: `npm search [module]`  

- 卸载  

  * npm uninstall 卸载

- 查看所有已经安装的modules

  * npm list [module] 显示所有模块的信息(版本号)

- publish 和 unpublish(--force)

  发布和取消发布到npm

- brew安装

  ```js
  brew uninstall node
  sudo rm -rf /usr/local/lib/node_modules   // imac
  brew install node
  ```

## 常用命令

- NPM提供了很多命令，例如install和publish，使用npm help可查看所有命令。

- npm help <command>: 可查看某条命令的详细帮助，例如npm help install。

- 在package.json所在目录下使用npm install. -g可先在本地安装当前命令行程序，可用于发布前的本地测试。

- npm update <package>: 可以把当前目录下node_modules子目录里边的对应模块更新至最新版本。

- npm update <package> -g: 可以把全局安装的对应命令行程序更新至最新版。

- npm cache clear|clean: 可以清空NPM本地缓存，用于对付使用相同版本号发布新版本代码的人。

- npm unpublish <package>@<version>: 可以撤销发布自己发布过的某个版本代码。

- npm search packageName:  检验某个包名是否已存在

- npm init: 会引导你创建一个package.json文件，包括名称、版本、作者这些信息等

- npm [info|view|show|v] packageName: 列出模块所有的信息

- npm [info|view|show|v] packageName versions: 列出模块所有的版本号信息

