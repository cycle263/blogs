## 发布模块

* 注意修改registry

  ```js
  // npm set registry http://registry.npmjs.org
  npm init -> npm login / npm adduser -> npm publish
  // npm set registry https://registry.npm.taobao.org
  ```

  备注：npmrc配置文件里，也可进行配置，并且优先级更高

* npm私有模块搭建

  - npm 公有包
  - npm 私有包，收费
  - 搭建 npm 私有服务器，成本高，维护难
  - git 仓库  小规模最适合