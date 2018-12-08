## gulp 

Gulp是一个基于流的自动化构建工具，除了可以管理和执行任务之外，还可以监听和读写文件。

* vs webpack

  webpack是一个打包模块化工具，一切皆模块，通过Loader转换文件，通过Plugin注入钩子，最后输出多个module文件组件的chunk文件。webpack提供模块化解决方案，支持es6写法的预编译解决方案。

* vs Rollup

  rollup类似于webpack，专注于ES6的模块打包工具，并且针对于ES 6源码进行了tree shaking，以去除哪些已被定义但没有被使用的代码，并进行scope hoisting，以减少输出文件的大小和提升运行性能。但rollup缺点也明显，生态圈不成熟，功能不完善。

* vs Grunt

  Grunt与npm script类似，也是一个任务执行者，能管理任务之间的依赖关系；相比而言，gulp容易上手，基于stream，管道拼接多个tash；

* vs Parcel

  主打零配置，开箱即用

* vs Fis3 

  国产的优秀构建工具，开箱即用，包括很多常用的构建功能：资源定位、文件指纹、文件编译、压缩资源、图片合并等