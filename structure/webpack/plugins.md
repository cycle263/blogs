## 插件

> webpack称plugins为其backbone, 一切loader不能做的处理都可由plugins来做。主要功能包括：对前一阶段打包后的代码进行处理，如添加替换一些内容，分割代码为多块，添加一些全局设置；辅助输出，如自动生成带有链接的index.html，对生成文件存储文件夹做一定的清理等。

* **1、代码优化之:**

  - CommonsChunkPlugin - 抽取公共代码。可以提取出多个代码块都依赖的模块形成一个单独的模块。要发挥CommonsChunkPlugin的作用还需要浏览器缓存机制的配合。在应用有多个页面的场景下提取出所有页面公共的代码减少单个页面的代码，在不同页面之间切换时所有页面公共的代码之前被加载过而不必重新加载。这个方法可以非常有效的提升应用性能。

    ```js
    new webpack.optimize.CommonsChunkPlugin({
      names: ["vendor1","vendor2"], // 要和entry的加载顺序相反
      minChunks: Infinity
    })
    ```

  - UglifyJsPlugin - 压缩混淆代码，webpack --optimize-minimize 选项会开启 UglifyJsPlugin来压缩输出的js，但是默认的UglifyJsPlugin配置并没有把代码压缩到最小输出的js里还是有注释和空格，需要覆盖默认的配置。webpack4 已经内置此插件，但配置方式略有不同，[详情参见](./example/webpack4.config)

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

  - CompressionWebpackPlugin 使用配置的算法（如gzip）压缩打包生成的文件，[详情参见](https://webpack.js.org/plugins/compression-webpack-plugin)。

* **2、依赖注入之:**

  - DefinePlugin - 自由变量注入，允许你创建一个在编译时可以配置的全局常量。这可能会对开发模式和发布模式的构建允许不同的行为非常有用。
    ```js
    // 官方文档推荐使用下面的插件确保 NODE_ENV
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    })
    ```

  - ProvidePlugin - 模块变量标示符注入，自动加载内容到当前模块，但并没有暴露在全局，配合使用expose-loader

    ```js
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })

    // in a module
    $('#item'); // 有效
    jQuery('#item'); // 有效
    // $和jQuery 自动被设置为 "jquery" 输出的内容
    ```

* **3、文件抽取之:**

  - DllPlugin 用某种方法实现了拆分 bundles，同时还大大提升了构建的速度。Dll这个概念应该是借鉴了Windows系统的dll。打包dll的时候，Webpack会将所有包含的库做一个索引，写在一个manifest文件中，而引用dll的代码（dll user）在打包的时候，只需要读取这个manifest文件，就可以了。

    Dll存在的优势：Dll打包以后是独立存在的，只要其包含的库没有增减、升级，hash也不会变化，只要包含的库没有增减、升级，就不需要重新打包。这样也大大提高了每次编译的速度。

    webpack.DllPlugin的选项中，path是manifest文件的输出路径；name是dll暴露的对象名，要跟output里保持一致；context是解析包路径的上下文。output.library的选项相结合可以暴露出 (也叫做放入全局域) dll 函数。

    dllPlugin和commonChunkPlugin是二选一的，并且在启用 dll后和 external、common 一样需要在页面中引用对应的脚本，在 dll中就是需要手动引用 vendor.dll.js

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

  - ExtractTextPlugin - 抽取css文件，用于将 CSS 从主应用程序中分离。

  - commonChunkPlugin  可以将公共的依赖模块提取到已有的入口 chunk 中，或者提取到一个新生成的 chunk。dllPlugin 和 commonChunkPlugin 是二选一的；**至于二者的区别： DllPlugin 是用于提速开发环境构建速度的，而 CommonsChunkPlugin 则是用于优化包尺寸的。**

    webpack4已移除此插件，请使用SplitChunksPlugin。

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

    // html使用
    <script>
      document.write('<script src="static/webpack.assets.js?v=' + Math.random() + '"><\/script>');
    </script>
    <script>
      document.write('<script src="static/' + window.WEBPACK_ASSETS['vendors'].js + '"><\/script>');
    </script>
    ```

* **4、开发体验优化之:**

  - WebpackNotifierPlugin - 编译完成动态通知

  - HtmlWebpackPlugin - 采用模板引擎形式注入到html文件，将自动依据entry的配置引入依赖。内部集成了ejs的模板引擎

  - open-browser-webpack-plugin - 打开服务器后 会自动打开浏览器

  - CleanWebpackPlugin  每次打包时，清空所配置的文件夹

  - HotModuleReplacementPlugin - 热更新插件，热更新(HMR)不能和[chunkhash]同时使用

  - CaseSensitivePathsPlugin 路径有误则直接报错

  - BundleAnalyzerPlugin 打包分析，代码分割是否合理

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

* **5、目录/文件拷贝之:**

  - CopyWebpackPlugin - 目录及文件拷贝

  - i18n-webpack-plugin 多语言插件

  - BannerPlugin 给代码添加注释版权信息

  - NamedModulesPlugin 将使用模块的路径作为moduleId，而不是数字标识符

  - HashedModuleIdsPlugin 该插件会根据模块的相对路径生成一个四位数的hash作为模块id