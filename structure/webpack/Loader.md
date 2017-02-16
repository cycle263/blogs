## Loader

  > Webpack 本身只能处理 JavaScript 模块，如果要处理其他类型的文件，就需要使用 loader 进行转换。

* Loader 可以理解为是模块和资源的转换器

* Loader有哪些特性？

    - Loader可以通过管道方式链式调用，但是最后一个loader必须返回js

    - Loader支持同步和异步

    - Loader 运行在 node.js 环境中


* 备注

    - !符号用于分隔多个loader

* 插件推荐

  1、代码优化之:

  CommonsChunkPlugin - 抽取公共代码

  UglifyJsPlugin - 压缩混淆代码

  2、 依赖注入之:

  DefinePlugin - 自由变量注入

  ProvidePlugin - 模块变量标示符注入

  3、 文件抽取之:

  file-loader - 传送font等文件

  ExtractTextPlugin - 抽取css文件

  4、 开发体验优化之:

  WebpackNotifierPlugin - 编译完成动态通知

  HtmlWebpackPlugin - 采用模板引擎形式注入到html文件，让开发更加easy

  5、 目录/文件拷贝之:

  CopyWebpackPlugin - 目录及文件拷贝
