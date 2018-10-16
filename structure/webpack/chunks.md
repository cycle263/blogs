## webpack之代码拆分

* chunk vs bundle vs module

    chunk webpack特有的，用于管理打包的过程，分包成多个chunk，一个chunk里面可以包含多个module。

    bundle 就是打包到一个文件中的相关代码，通过情况下，chunk会直接输入对应的bundle，当然不是所有的配置都会产生这一对一的关系。

    module js模块，所有静态资源都可以成为module

* hash

    在 webpack 中提供了两种方式，hash 和 chunkhash。不推荐在开发环境使用hash，增加编译时间。

    - hash：在 webpack 一次构建中会产生一个 compilation 对象，该 hash 值是对 compilation 内所有的内容计算(MD5摘要算法)而来的，

    - chunkhash： 每一个chunk 都根据自身的内容计算而来, 可以保证在chunk没有变化的时候hash不变，文件不需要更新，chunk变了后，可保证hash唯一，由于hash太长，这里截取了hash的5个字符。

    ```js
    /* webpack.config.js */
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

    备注：hash 的默认长度为 20 个字符，可通过 output.hashDigestLength 全局配置，或使用 [hash:16] 方式配置，还可以通过 output.hashDigest 配置何时生成 hash。

* 不稳定的chunkhash

    Chunk 的生成还涉及到依赖解析和模块 ID 分配，这是无法稳定实质上没有变化的 chunk 文件的 chunkhash 变动问题的本源。

* 模块ID

    模块的 ID 是 webpack 根据依赖的收集顺序递增的正整数。

* webpack runtime

    runtime 包含 chunks ID 及其对应 chunkhash 的对象。runtime其他主要功能:

    - 全局 webpackJsonp 方法：模块读取函数，用来区分模块是否加载，并调用 __webpack_require__ 函数；

    - 私有 __webpack_require__ 方法：模块初始化执行函数，并给执行过的模块做标记；

    - 异步 chunk 加载函数（用 script 标签异步加载），加载的 chunk 内容均被 webpackJsonp 包裹的，script 加载成功会直接执行。这个函数还包含了所有生成的 chunks 的路径。


## 合理划分公用模块

* 根据更新频率

    - 库和工具 - libs

    - 定制 UI 库和工具 - vendor

    - 业务模块 - entries

    - 低频库/工具/代码 - 分割为 chunk