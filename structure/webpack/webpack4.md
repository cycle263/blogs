## webpack4升级

  > 主要针对生产环境进行了优化升级。

* 插件升级

  commonChunkPlugin -> optimization.splitChunks and runtimeChunk 或者 splitChunksPlugin and runtimeChunkPlugin插件形式， 分包插件优化升级

  - webpack4根据下述条件自动进行代码块分割：
  
    + 新代码块可以被共享引用，OR这些模块都是来自node_modules文件夹里面
    
    + 新代码块大于30kb（min+gziped之前的体积）
    
    + 按需加载的代码块，最大数量应该小于或者等于5
    
    + 初始加载的代码块，最大数量应该小于或等于3

  - 配置项解析

    + test 限制范围

    + chunks 值为"initial", "async"（默认） 或 "all"

    + minChunks entry引用次数大于此值则分包，默认为1

    + minSize 包的大小超过此值则分包，默认为30KB，太小体积的代码块被分割，可能还会因为额外的请求，拖慢加载性能

    + name 包名称

    + maxInitialRequests 一个入口最大的并行请求数, 也就是最大初始化chunks，设置过大容易导致分包过细，http请求数量过多，触发浏览器同域名并发限制，默认为3

    + maxAsyncRequests 最大异步请求chunks，即按需加载时候最大的并行请求数，默认为5