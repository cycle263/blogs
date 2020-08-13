## 插件

> webpack称plugins为其backbone, 一切loader不能做的处理都可由plugins来做。plugins针对是webpack打包的整个过程，它并不直接操作文件，而是基于事件机制工作，会监听webpack打包过程中的某些节点，来扩展webpack的功能，具体是通过在构建过程中注入钩子实现。

主要功能包括：对前一阶段打包后的代码进行处理，如添加替换一些内容，分割代码为多块，添加一些全局设置；辅助输出，如自动生成带有链接的index.html，对生成文件存储文件夹做一定的清理等。

```js
// @file: plugins/myplugin.js
const pluginName = 'MyPlugin';
// tapable是webpack自带的package，是webpack的核心实现
// 不需要单独install，可以在安装过webpack的项目里直接require
// 拿到一个同步hook类
const { SyncHook } = require("tapable");
class MyPlugin {
  // 传入webpack config中的plugin配置参数
  constructor(options) {
    // { test: 1 }
    console.log('@plugin constructor', options);
  }

  apply(compiler) {
    console.log('@plugin apply');
    // 实例化自定义事件
    compiler.hooks.myPlugin = new SyncHook(['data'])

    compiler.hooks.environment.tap(pluginName, () => {
      //广播自定义事件
      compiler.hooks.myPlugin.call("It's my plugin.")
      console.log('@environment');
    });

    // compiler.hooks.compilation.tap(pluginName, (compilation) => {
        // 你也可以在compilation上挂载hook
        // compilation.hooks.myPlugin = new SyncHook(['data'])
        // compilation.hooks.myPlugin.call("It's my plugin.")
    // });
  }
}
module.exports = MyPlugin;
```

#### plugin vs loaders

* Loader 本质是一个函数，转换接收内容，返回转换结果，Plugin本质上是一个类，监听运行生命周期中广播的事件，在合适时机通过 webpack 提供的API改变输出结果。

* Loader在module.rule中配置，类型是数组，每一项对应一个模块解析规则，Plugin在plugin中配置，类型是数组，每一项对应一个扩展器实例，参数通过构造函数传入。

* Loader在webpack中扮演着转换器的角色，用于转换模块源码，简单理解就是将文件转换成另外形式的文件；Loader的转换过程是附属在整个Webpack构建流程中的，意味着打包时间包含了压缩图片的时间成本，对于追求webpack性能优化来说实属有点违背原则。而Plugin恰好是监听webpack运行生命周期中广播的事件，在合适时机通过webpack提供的API改变输出结果，所以可在整个Webpack构建流程完成后(全部打包文件输出完成后)插入压缩图片的操作。

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
  /* webpack.dll.config.js */
  output: {
    path: path.resolve(__dirname, './static'),
    filename: '[name].dll.js',
    library: '[name]_lib'   // 全局变量名称
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, 'dist', '[name]-manifest.json'),
      name: '[name]_lib'    //和output.library中一致，也就是输出的manifest.json中的 name值
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

  - ExtractTextPlugin - 抽取css文件，用于将 CSS 从主应用程序中分离。不过，webpack@4.3.0已不支持使用(无法使用contentHash)，推荐使用mini-css-extract-plugin 或者 `[md5:contenthash:hex:20]`。

  - commonChunkPlugin  可以将公共的依赖模块提取到已有的入口 chunk 中，或者提取到一个新生成的 chunk。使用长期缓存策略：chunkhash，records，Cache-Control，将不经常变动的代码块长期缓存起来。dllPlugin 和 commonChunkPlugin 是二选一的；**至于二者的区别： DllPlugin 是用于提速开发环境构建速度的，而 CommonsChunkPlugin 则是用于优化包尺寸的。**

    webpack4已移除此插件，请使用配置项optimization.splitChunks and runtimeChunk 或者插件形式splitChunksPlugin。

    ```js
    optimization: {
      runtimeChunk: 'single'  // 或者 runtimeChunk: { name: 'page/manifest' }
    }
    ```

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

- AddAssetHtmlPlugin 成的html文件中加入资源文件，如：dll文件的script引用等

- duplicate-package-checker-webpack-plugin 分析得到有重复依赖的版本，并通过 resolve alias 避免多版本重复打包

  ```json
  resolve: {
    alias: {
      lodash: path.join(process.cwd(), 'node_modules/lodash'),
    }  
  }
  ```

* **4、开发体验优化之:**

  - WebpackNotifierPlugin - 编译完成动态通知

  - HtmlWebpackPlugin - 采用模板引擎形式注入到html文件，将自动依据entry的配置引入依赖。内部集成了ejs的模板引擎

  - open-browser-webpack-plugin - 打开服务器后 会自动打开浏览器

  - CleanWebpackPlugin  每次打包时，清空所配置的文件夹

  - HotModuleReplacementPlugin - 热更新插件，热更新(HMR)不能和[chunkhash]同时使用

  - CaseSensitivePathsPlugin 路径有误则直接报错

  - BundleAnalyzerPlugin 打包分析，代码分割是否合理

  - PurifyCSS css tree shaking

  - 多进程 HappyPack

  - SourceMapDevToolPlugin 过滤Sourcemap文件

    ```js
    /* 添加 Sourcemap 支持 */
    config.plugins.push(
      new webpack.SourceMapDevToolPlugin({
        filename: '[file].map',
        exclude: ['vendor.js']  /* vendor 通常不需要 sourcemap */
      })
    );
    ```

* **5、目录/文件拷贝之:**

  - web-webpack-plugin - AutoWebPlugin基于webPlugin, 也就是WebPlugin插件支持的功能AutoWebPlugin都支持， 其中AutoWebPlugin会根据依赖的资源注入<!--STYLE--> 和 <!--SCRIPT--> 位置， 没有注释制定位置，则注入head标签和body标签最后

    ```js
    const { AutoWebPlugin, WebPlugin } = require('web-webpack-plugin');
    const autoWebPlugin = new AutoWebPlugin('pages', {  // pages目录下的所有入口
      template: './template.html',
      postEntrys: ['./commmon.css'],  // 公用资源文件
      // 提出所有页面的公共代码
      commonsChunk: {
        name: 'common',
      },
    });

    entry: autoWebPlugin.entry({
      // 扩充非pages目录下的额外入口
    }),
    plugins:[
      new WebPlugin({
        template: './template.html',
        filename: 'index.html'
      }),
      autoWebPlugin,
    ]
    ```

  - CopyWebpackPlugin - 目录及文件拷贝

  - i18n-webpack-plugin 多语言插件

  - BannerPlugin 给代码添加注释版权信息

  - inline-manifest-webpack-plugin 在html 便内联脚本，提高了页面的加载速度，例如webpack runtime

  - NamedModulesPlugin 将使用模块的路径作为moduleId，而不是数字标识符，缺点是构建内容增大，模块路径信息泄露。

  - HashedModuleIdsPlugin 该插件会根据模块的相对路径生成一个四位数的hash作为模块id，解决NamedModulesPlugin 纯在的缺点。

  - InlineManifestWebpackPlugin 将manifest文件内联到html模板中，减少一次网络请求。

  - WebpackUploadPlugin 可上传静态资源到远程服务器或cdn服务进行部署。


## 编写插件

* 准备工作

  理解一些 webpack 底层的内部特性来做相应的勾子。

  [webpack的整体流程](./images/webpack.png)

* 插件架构

  插件都是被实例化的带有 apply 原型方法的对象。这个 apply 方法在安装插件时将被 webpack 编译器调用一次。apply 方法提供了一个对应的编译器对象的引用，从而可以访问到相关的编译器回调。

  ```js
  SomePlugin.prototype.apply = function(compiler) { // 访问编译器
    compiler.plugin('done', function(compilation) {
      console.log('Hello World!');
    });

    compiler.plugin("emit", function(compilation， cb) {  // 访问编译对象
      compilation.plugin("optimize", function() {
        console.log("Assets are being optimized.");
      });

      // Async handle
      cb();
    });
  };
  ```

* 插件案例

  ```js
  "use strict";

  class ShowBuildFilesPlugin {
    constructor(options) {
      this.options = options;
    }

    apply(compiler) {
      compiler.hooks.compilation.tap("ShowBuildFilesPlugin", compilation => {
        let files = '## Build files:\n\n';
        for (let file in compilation.assets) {
          files += `- ${file}`;
        }
      });

      const name = this.options.fileName || 'buildFiles.md';

      compilation.assets[name] = {
        source: function() {
          return files;
        },
        size: function() {
          return files.length;
        }
      };
    }
  }

  module.exports = ShowBuildFilesPlugin;
  ```

* 插件的使用

  ```js
  {
    plugins: [
      new webpack.optimize.UglifyJsPlugin(), // 内置的插件
      new HtmlWebpackPlugin({template: './src/index.html'}) // 第三方插件
    ]
  }
  ```
