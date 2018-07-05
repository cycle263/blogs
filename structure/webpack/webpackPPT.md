## webpack4区别

* mode

  - development，devlopment针对开发环境做了优化

  - production(default)，production针对生产环境做了优化。比如：压缩（minification）、作用域提升（scope hoist）等等，以及很多默认插件都不再需要自己引入。

* 配置

  -

  -

* 插件

  -

## webpack的基本原理



## webpack常见的优化手段及其原理

* 缓存

  - 长缓存

  - hash

* 分包

  - 并行加载

  - 按需加载

    异步路由

    ```js
    // react-router3
    <Route path="adminIndex" getComponent={(attrs, callback) => { require.ensure([], (require) => { var d = require('../ctlComponents/IndexCtl'); callback(null, d.default); }, 'index'); }} />

    // react-router4
    // 异步加载js写法；
    import IndexCtl from 'bundle-loader?lazy!../ctlComponents/IndexCtl.js';

    <Route exact path='/(index)?' render={loadAsyncModule(IndexCtl)} />

    const loadAsyncModule = (Module) => prop =>(
      <Bundle load={Module}>
        {(ModuleComponent) => <ModuleComponent {...prop} />}
      </Bundle>
    )
    ```

* 压缩


* 作用域提升
