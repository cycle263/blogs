## npm

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

  ```
  brew uninstall node
  sudo rm -rf /usr/local/lib/node_modules   // imac
  brew install node
  ```
