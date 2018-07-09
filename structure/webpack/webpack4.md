## webpack4升级

  > webpack以配置驱动，繁琐的配置也成为了webpack进一步发展的障碍，零配置的打包构建工具如雨后春笋。webpack4对配置要求降低了很多，甚至entry和output也非必配项。

* mode属性

  即默认策略配置，分为开发和生产环境（development/production），常用的配置以及配置好默认值。默认值为production。devlopment针对开发环境做了优化，production针对生产环境做了优化。

* 分包插件升级

  commonChunkPlugin -> optimization.splitChunks and runtimeChunk 或者 splitChunksPlugin and runtimeChunkPlugin插件形式， 分包插件优化升级

  ```js
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

    + test 限制范围

    + chunks 值为"initial", "async"（默认） 或 "all"

    + minChunks entry引用次数大于此值则分包，默认为1

    + minSize 包的大小超过此值则分包，默认为30KB，太小体积的代码块被分割，可能还会因为额外的请求，拖慢加载性能

    + name 包名称

    + maxInitialRequests 一个入口最大的并行请求数, 也就是最大初始化chunks，设置过大容易导致分包过细，http请求数量过多，触发浏览器同域名并发限制，默认为3

    + maxAsyncRequests 最大异步请求chunks，即按需加载时候最大的并行请求数，默认为5

    + cacheGroups 默认模式会将所有来自node_modules的模块分配到一个叫vendors的缓存组；所有重复引用至少两次的代码，会被分配到default的缓存组。一个模块可以被分配到多个缓存组，优化策略会将模块分配到高优先级别（priority）的缓存组，或者会分配到可以形成更大体积代码块的组里。

      缓存组会继承splitChunks的配置。

    ```js
    // webpack4 splitChunks配置项的默认值源码
    this.set("optimization.splitChunks", {});
		this.set("optimization.splitChunks.chunks", "async");
		this.set("optimization.splitChunks.minSize", 30000);
		this.set("optimization.splitChunks.minChunks", 1);
		this.set("optimization.splitChunks.maxAsyncRequests", 5);
    // 打包分隔符， 如：vendors~chunkA~chunkB.js
		this.set("optimization.splitChunks.automaticNameDelimiter", "~"); 
		this.set("optimization.splitChunks.maxInitialRequests", 3);
		this.set("optimization.splitChunks.name", true);
		this.set("optimization.splitChunks.cacheGroups", {});
    ```

  - runtimeChunkPlugin 添加一个只包含运行时(runtime)额外代码块到每一个入口

* 混淆压缩升级

  UglifyjsWebpackPlugin -> optimization.minimize

* 动态引入模块

  Webpack 4，官方提供了sideEffects属性，通过将其设置为false，可以主动标识该类库中的文件只执行简单输出，并没有执行其他操作，可以放心shaking。除了可以减小bundle文件的体积，同时也能够提升打包速度。为了检查side effects，Webpack需要在打包的时候将所有的文件执行一遍。而在设置sideEffects之后，则可以跳过执行那些未被引用的文件。

  Tree shaking一直是一个美丽而遥不可及的话题。影响tree shaking的根本原因在于side effects（副作用），其中最广为人知的一条side effect就是动态引入依赖的问题。ES6其实也提供import()方法支持动态引入依赖，所以以下写法其实也是完全可行的。

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