## webpack4升级

  > 主要针对生产环境进行了优化升级。

* 插件升级

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
		this.set("optimization.splitChunks.automaticNameDelimiter", "~");
		this.set("optimization.splitChunks.maxInitialRequests", 3);
		this.set("optimization.splitChunks.name", true);
		this.set("optimization.splitChunks.cacheGroups", {});
    ```

  - runtimeChunkPlugin 添加一个只包含运行时(runtime)额外代码块到每一个入口