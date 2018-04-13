## 插件

* 插件推荐

  1、代码优化之:

  CommonsChunkPlugin - 抽取公共代码

  UglifyJsPlugin - 压缩混淆代码

  2、 依赖注入之:

  DefinePlugin - 自由变量注入

  ProvidePlugin - 模块变量标示符注入，自动加载模块，全局使用变量

  ```js
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery'
  })
  // in a module
  $('#item'); // 有效
  jQuery('#item'); // 有效
  // $和jQuery 自动被设置为 "jquery" 输出的内容
  ```

  3、 文件抽取之:

  file-loader - 传送font等文件

  ExtractTextPlugin - 抽取css文件

  4、 开发体验优化之:

  WebpackNotifierPlugin - 编译完成动态通知

  HtmlWebpackPlugin - 采用模板引擎形式注入到html文件，让开发更加easy

  5、 目录/文件拷贝之:

  CopyWebpackPlugin - 目录及文件拷贝