## npm

npm是 node 自带的包管理工具，也是世界上最大规模的包管理系统。

- 初始化

  npm init: 会引导你创建一个package.json文件，包括名称(name)、版本(version)、作者(author)、description 这些信息等。

  自动确认信息，可以在命令后面追加 --yes，跟一直回车确认一样的效果，`npm init --yes`。

  定制 npm init 命令的实现方式也很简单，在 Home 目录创建一个 .npm-init.js 即可，该文件的 module.exports 即为 package.json 配置内容，需要获取用户输入时候，使用 prompt() 方法即可。

  ```js
  module.exports = {
    name: prompt('name?', process.cwd().split('/').pop()),
    version: prompt('version?', '0.1.0'),
    description: prompt('description?', 'A new package...'),
    author: prompt('author?', 'myself'),
    main: 'index.js',
  }
  ```

- 安装  

  依赖管理是 npm 的核心功能，原理就是执行 npm install 从 package.json 中的 dependencies, devDependencies 将依赖包安装到当前目录的 ./node_modules 文件夹中。

  * npm install  安装所有的依赖
  * npm install --force[-f]  强制重新安装
  * npm install -g [module]  全局安装，整个系统都可以访问
  * npm install [module]@latest  安装依赖包最新版本到当前目录下
  * npm install --save [module]   安装当前目录，并加入package.json
  * npm i -D [module]   其中 i: install, -D: --save-dev

  [install命令](images/install.png)

- 更新 和 搜索

  * `npm update <package>` 可以把当前目录下node_modules子目录里边的对应模块更新至最新版本，`npm update [module]@version`可以直接指定更新版本号。
  * `npm update <package> -g` 可以把全局安装的对应命令行程序更新至最新版。
  * `npm search [module]`  可以搜索某个模块

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

## 其他常用命令

- NPM提供了很多命令，例如install和publish，使用npm help可查看所有命令。

- npm help <command>: 可查看某条命令的详细帮助，例如npm help install。

- 在package.json所在目录下使用npm install. -g可先在本地安装当前命令行程序，可用于发布前的本地测试。

- npm cache clear|clean: 可以清空NPM本地缓存，用于对付使用相同版本号发布新版本代码的人。

- npm unpublish <package>@<version>: 可以撤销发布自己发布过的某个版本代码。

- npm search packageName:  检验某个包名是否已存在

- npm [info|view|show|v] packageName: 列出模块所有的信息

- npm [info|view|show|v] packageName versions: 列出模块所有的版本号信息

- npm ls  查看完整的依赖树结构

