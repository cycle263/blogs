## webpack之代码拆分

* CommonsChunkPlugin

    - options.name/names (string / string[])

        哪些代码块，可以为数组

    - options.filename(string)

        代码块输出的名称

    - options.minChunks(number / Infinity / function(module, count) -> boolean)

    - options.chunks(string[])

    - options.children(boolean)

    - options.async(boolean / string)

    - options.minSize


* hash

    在 webpack 中提供了两种方式，hash 和 chunkhash

    - hash：在 webpack 一次构建中会产生一个 compilation 对象，该 hash 值是对 compilation 内所有的内容计算而来的，

    - chunkhash：每一个 chunk 都根据自身的内容计算而来, 可以保证在chunk没有变化的时候hash不变，文件不需要更新，chunk变了后，可保证hash唯一，由于hash太长，这里截取了hash的5个字符。

    ```js
    // webpack.config.js
    module.exports = {
        output: {
            chunkFilename: '[name].[chunkhash:5].chunk.js',
        }
    }
    ```