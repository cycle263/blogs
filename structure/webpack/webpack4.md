## webpack4升级

  > webpack以配置驱动，繁琐的配置也成为了webpack进一步发展的障碍，零配置的打包构建工具如雨后春笋。webpack4对配置要求降低了很多，甚至entry和output也非必配项。

* mode属性

  即默认策略配置，分为开发和生产环境（development/production），常用的配置以及配置好默认值。默认值为production。devlopment针对开发环境做了优化，production针对生产环境做了优化。

* 分包插件升级

  commonChunkPlugin -> optimization.splitChunks and runtimeChunk 或者 splitChunksPlugin and runtimeChunkPlugin插件形式， 分包插件优化升级。CommonChunksPlugin 会找到多数模块中都共有的东西，并且把它提取出来，里面可能会存在一些当前模块不需要的东西。SplitChunksPlugin分包更加细腻，公用的模块会被拆分成多个独立的包，可以保证加载进来的代码一定是会被依赖到的。

  ```js
  // 配置案例
  {
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          commons: {
            chunks: "initial",
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 30000
          },
          vendor: {
            test: /node_modules/,
            chunks: "initial",
            name: "vendor",
            priority: 10,
            enforce: true
          }
        }
      }
    }
  }

  // webpack4 源码
  if (options.optimization.splitChunks)
			new SplitChunksPlugin(options.optimization.splitChunks).apply(compiler);
  ```

  - webpack4根据下述条件自动进行代码块分割：
  
    + 新代码块可以被共享引用，OR这些模块都是来自node_modules文件夹里面
    
    + 新代码块大于30kb（min+gziped之前的体积）
    
    + 按需加载的代码块，最大数量应该小于或者等于5
    
    + 初始加载的代码块，最大数量应该小于或等于3

  - splitChunksPlugin配置项解析

    + test 限制范围，以 module 为单位控制 chunk 的抽取范围，是一种细粒度比较小的方式。

    + chunks 值为"all", "async"（默认） 或 "initial"，分别代表了全部 chunk，按需加载的 chunk 以及初始加载的 chunk。

    + minChunks entry引用次数大于此值则分包，默认为1

    + minSize 包的大小超过此值则分包，默认为30KB，太小体积的代码块被分割，可能还会因为额外的请求，拖慢加载性能

    + name 包名称

    + maxInitialRequests 一个入口最大的并行请求数, 也就是最大初始化chunks，设置过大容易导致分包过细，http请求数量过多，触发浏览器同域名并发限制，默认为3

    + maxAsyncRequests 最大异步请求chunks，即按需加载时候最大的并行请求数，默认为5

    + cacheGroups 默认模式会将所有来自node_modules的模块分配到一个叫vendors的缓存组；所有重复引用至少两次的代码，会被分配到default的缓存组。一个模块可以被分配到多个缓存组，优化策略会将模块分配到高优先级别（priority）的缓存组，或者会分配到可以形成更大体积代码块的组里。

      缓存组会继承splitChunks的配置。

    ```js
    /* webpack4 splitChunks配置项的默认值源码 */
    this.set("optimization.splitChunks", {});
		this.set("optimization.splitChunks.chunks", "async");
		this.set("optimization.splitChunks.minSize", 30000);
		this.set("optimization.splitChunks.minChunks", 1);
		this.set("optimization.splitChunks.maxAsyncRequests", 5);
    /* 打包分隔符， 如：vendors~chunkA~chunkB.js */
		this.set("optimization.splitChunks.automaticNameDelimiter", "~"); 
		this.set("optimization.splitChunks.maxInitialRequests", 3);
		this.set("optimization.splitChunks.name", true);
		this.set("optimization.splitChunks.cacheGroups", {});
    ```

  - runtimeChunkPlugin 添加一个只包含运行时(runtime)额外代码块到每一个入口

    ```js

    ```

* chunk命名规则配置

  HashedModuleIdsPlugin插件根据路径生成的 hash 作为 module identifier。

  ```json
  optimization: {
    namedModules: true  // 数字id命名规则换成路径的方式，webpack4中当mode为development会默认启动
  }
  ```

* 混淆压缩升级

  UglifyjsWebpackPlugin -> optimization.minimize

* 动态引入模块

  Webpack 4，官方提供了sideEffects属性，通过将其设置为false，可以主动标识该类库中的文件只执行简单输出，并没有执行其他操作，可以放心shaking。除了可以减小bundle文件的体积，同时也能够提升打包速度。为了检查side effects，Webpack需要在打包的时候将所有的文件执行一遍。而在设置sideEffects之后，则可以跳过执行那些未被引用的文件。

  Tree shaking一直是一个美丽而遥不可及的话题，它是一个术语，通常用于描述移除 JavaScript 上下文中的未引用代码。这个术语和概念实际上是兴起于 ES2015 模块打包工具 rollup。可以简单地理解为摇树，抖落掉枯萎无用的树叶。影响tree shaking的根本原因在于side effects（副作用），其中最广为人知的一条side effect就是动态引入依赖的问题。ES6其实也提供import()方法支持动态引入依赖，所以以下写法其实也是完全可行的。

  webpack 2.0 开始原生支持 ES Module，也就是说不需要 babel 把 ES Module 转换成曾经的 commonjs 模块了，要使用 Tree Shaking，请关闭 babel 默认的模块转义，开启loose模式，避免babel转化产生新的副作用，导致shaking not working。

  ```js
  if(Math.random() > 0.5) {
      import('./a.js').then(() => {
          ...
      })
  } else {
      import('./b.js').then(() => {
          ...
      })
  }
  ```

* 作用域提升

  ModuleConcatenationPlugin -> optimization.concatenateModules。scope hoisting的效果同样也依赖于静态分析。带来的好处是，减少bundle体积，较少不必要的作用域。

  ```js
  //开启前
  [
      /* 0 */
      function(module, exports, require) {
          var module_a = require(1)
          console.log(module_a['default'])
      }

      /* 1 */
      function(module, exports, require) {
          exports['default'] = 'module A'
      }
  ]

  //开启后
  [
      function(module, exports, require) {
          var module_a_defaultExport = 'module A'
          console.log(module_a_defaultExport)
      }
  ]
  ```

* 多进程之HappyPack

HappyPack就能让Webpack把任务分解给多个子进程去并发的执行，子进程处理完后再把结果发送给主进程，其中子进程的个数为cpu的个数减去1,需要在loader处修改如下

```js
// loader中修改为
use: 'happypack/loader?id=babel',

// plugin中添加
new HappyPack({
    id: 'babel',
    //如何处理.js文件，和rules里的配置相同
    loaders: [{
        loader: 'babel-loader',
        query: {
            presets: [
                "env", "stage-0"
            ]
        }
    }]
}),
```