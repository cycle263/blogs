## webpack构架

webpack整体是一个插件架构，所有的功能都以插件的方式集成在构建流程中，通过发布订阅事件来触发各个插件执行。webpack核心使用Tapable 来实现插件(plugins)的binding（绑定）和applying（应用）。

* tapable

  tapable是webpack官方开发维护的一个小型库,能够让我们为javascript模块添加并应用插件。 它可以被其它模块继承或混合。它类似于NodeJS的 EventEmitter 类，专注于自定义事件的发射和操作。 除此之外, Tapable 允许你通过回调函数的参数访问事件的生产者。

## 编译器（Compiler）和编译（Compilation）

* compiler 对象代表了完整的 webpack 环境配置。这个对象在启动 webpack 时被一次性建立，并在所有可操作的设置中被配置，包括原始配置，加载器和插件。当在 webpack 环境中应用一个插件时，插件将收到一个编译器对象的引用。可以使用它来访问 webpack 的主环境。

  [compiler的核心](./images/Compiler.png)

  [Compiler源码](https://github.com/webpack/webpack/blob/master/lib/Compiler.js)

  - 事件钩子

  [compiler-hooks参见](https://webpack.js.org/api/compiler-hooks/)

* compilation 对象代表了每一次版本构建和生成资源。当运行 webpack 开发环境中间件时，每当检测到一个文件变化，一次新的编译将被创建，从而生成一组新的编译资源。一个编译对象表现了当前的模块资源、编译生成资源、变化的文件、以及被跟踪依赖的状态信息。编译对象也提供了很多关键点回调供插件做自定义处理时选择使用。

  [Compilation源码](https://github.com/webpack/webpack/blob/master/lib/Compilation.js)

  compilation上的几个属性：

  - compilation.modules，每一个资源文件都会被编译成一个模块，每个模块module.fileDependencies记录了模块依赖的其它模块。

  - compilation.chunks，是entry的每个配置项及调用require.ensure的模块，每个chunk的chunk.modules为chunk包含的模块以及模块所依赖的模块，chunk.files为每个配置项最后的输出结果文件，这里的值可以从compilation.assets获得。

  - compilation.assets，整个打包流程最终要输出的文件