## 插件推荐

* **1、代码优化之:**

  - CommonsChunkPlugin - 抽取公共代码。可以提取出多个代码块都依赖的模块形成一个单独的模块。要发挥CommonsChunkPlugin的作用还需要浏览器缓存机制的配合。在应用有多个页面的场景下提取出所有页面公共的代码减少单个页面的代码，在不同页面之间切换时所有页面公共的代码之前被加载过而不必重新加载。这个方法可以非常有效的提升应用性能。

  ```js
  new webpack.optimize.CommonsChunkPlugin({
    names: ["vendor1","vendor2"], // 要和entry的加载顺序相反
		minChunks: Infinity
	})
  ```

  - UglifyJsPlugin - 压缩混淆代码，webpack --optimize-minimize 选项会开启 UglifyJsPlugin来压缩输出的js，但是默认的UglifyJsPlugin配置并没有把代码压缩到最小输出的js里还是有注释和空格，需要覆盖默认的配置

  ```js
  new UglifyJsPlugin({
    // 最紧凑的输出
    beautify: false,
    // 删除所有的注释
    comments: false,
    compress: {
      // 在UglifyJs删除没有用到的代码时不输出警告  
      warnings: false,
      // 删除所有的 `console` 语句
      // 还可以兼容ie浏览器
      drop_console: true,
      // 内嵌定义了但是只用到一次的变量
      collapse_vars: true,
      // 提取出出现多次但是没有定义成变量去引用的静态值
      reduce_vars: true,
    }
  })
  ```

* **2、 依赖注入之:**

  - DefinePlugin - 自由变量注入

  - ProvidePlugin - 模块变量标示符注入，自动加载模块，全局使用变量

  ```js
  // 官方文档推荐使用下面的插件确保 NODE_ENV
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
  })
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
  })
  // in a module
  $('#item'); // 有效
  jQuery('#item'); // 有效
  // $和jQuery 自动被设置为 "jquery" 输出的内容
  ```

* **3、 文件抽取之:**

  - DllPlugin 用某种方法实现了拆分 bundles，同时还大大提升了构建的速度。Dll这个概念应该是借鉴了Windows系统的dll。打包dll的时候，Webpack会将所有包含的库做一个索引，写在一个manifest文件中，而引用dll的代码（dll user）在打包的时候，只需要读取这个manifest文件，就可以了。

  Dll存在的优势：Dll打包以后是独立存在的，只要其包含的库没有增减、升级，hash也不会变化，只要包含的库没有增减、升级，就不需要重新打包。这样也大大提高了每次编译的速度。

  webpack.DllPlugin的选项中，path是manifest文件的输出路径；name是dll暴露的对象名，要跟output里保持一致；context是解析包路径的上下文。output.library 的选项相结合可以暴露出 (也叫做放入全局域) dll 函数。

  ```js
  // webpack.dll.config.js
  output: {
    path: path.resolve(__dirname, './static'),
    filename: '[name].dll.js',
    library: '[name]_lib'   //
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, 'dist', '[name]-manifest.json'),
      name: '[name]_lib'    //
    }),
  ],
  ```

  DllReferencePlugin的选项中，context需要跟之前保持一致，这个用来指导Webpack匹配manifest中库的路径；manifest用来引入刚才输出的manifest文件。

  ```js
  new webpack.DllReferencePlugin({
    context: __dirname,
    manifest: require('./dist/vendor-manifest.json'),
  }),
  ```

  - ExtractTextPlugin - 抽取css文件

  - AssetsPlugin - assets-webpack-plugin该插件会在每次编译完成后，生成一份webpack.assets.js文件，文件的内容是最新的编译后的文件名称

  ```js
  window.WEBPACK_ASSETS={"main":{"js":"89c6e5b6d9bbc5fec2b8.index.js"}}

  // webpack配置
  new AssetsPlugin({
    filename:'build/webpack.assets.js',
    processOutput:function(assets){
        return 'window.WEBPACK_ASSETS='+JSON.stringify(assets);
    }
  })
  ```

* **4、 开发体验优化之:**

  - WebpackNotifierPlugin - 编译完成动态通知

  - HtmlWebpackPlugin - 采用模板引擎形式注入到html文件，让开发更加easy

  - open-browser-webpack-plugin - 打开服务器后 会自动打开浏览器

  - HotModuleReplacementPlugin - 热更新插件

  - SourceMapDevToolPlugin 过滤Sourcemap文件

    ```js
    // 添加 Sourcemap 支持
    config.plugins.push(
      new webpack.SourceMapDevToolPlugin({
        filename: '[file].map',
        exclude: ['vendor.js']  // vendor 通常不需要 sourcemap
      })
    );
    ```

* **5、 目录/文件拷贝之:**

  - CopyWebpackPlugin - 目录及文件拷贝