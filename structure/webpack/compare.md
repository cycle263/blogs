# 构建工具比较

* 工具定位

  - webpack主要用于构建打包，编译和模块化打包为主

  - gulp偏向执行任务

* 原理比较

  - webpack会将文件内容存在一个叫compilation的object里，方便插件和loader调用；
  
  - gulp使用了pipe管道流的内存处理方式，每一个task任务占用一个流，webpack却是共享一个流。

