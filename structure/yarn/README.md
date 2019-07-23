## yarn

  > facebook和Google合作开发的包管理器，针对于npm的优化

  * Yarn 用到了 lockfiles 和确定性算法

  * Yarn 还声明同时兼容 npm 和 Bower

  * Yarn支持离线安装，并且有一定的速度优势

### 常用命令

yarn install --force // 强制重新下载所有包

yarn install --no-lockfile  不读取或生成 yarn.lock 锁文件。

yarn upgrade 用于更新包到基于规范范围的最新版本

yarn cache list # 列出已缓存的每个包 
yarn cache dir # 返回 全局缓存位置 
yarn cache clean # 清除缓存

### yarn vs npm


### 参考资料

[yarn install](https://yarnpkg.com/lang/zh-hans/docs/cli/install/)