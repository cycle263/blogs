## webpack的基本原理



## webpack4区别

* mode

  - development，devlopment针对开发环境做了优化

  - production(default)，production针对生产环境做了优化。比如：压缩（minification）、作用域提升（scope hoist）等等，以及很多默认插件都不再需要自己引入。

* 配置

  - 

  - 

* 插件系统升级

  ```js
  // webpack 3
  compiler.plugin('done',callback) // 注册
  compilitation.applyPlugins('done',params) // 触发

  // webpack 4
  compiler.hooks.done.tap('mypluinname',callback) // 注册
  compiler.hooks.done.call() // 触发
  ```

  内部插件的升级

  - 



## webpack常见的优化手段及其原理

* 缓存

  - 长缓存

  - hash

    在 webpack 中提供了两种方式，hash 和 chunkhash。但不推荐在开发环境使用hash，增加编译时间。

    + hash：在 webpack 一次构建中会产生一个 compilation 对象，该 hash 值是对 compilation 内所有的内容计算而来的，因此hash每次都会改变。

    + chunkhash： 每一个chunk 都根据自身的内容计算而来, 可以保证在chunk没有变化的时候hash不变，文件不需要更新，chunk变了后，可保证hash唯一，由于hash太长，这里截取了hash的5个字符。

    ```js
    // webpack.config.js
    module.exports = {
        entry: {
            app: 'app.js',
            vendor: ['react', 'react-dom']
        },
        output: {
            chunkFilename: '[name].[chunkhash:5].chunk.js',
        }
    }
    ```

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
