## 构建工具比较

* 工具定位

  - webpack主要用于构建打包，编译和模块化打包为主

  - gulp偏向执行任务

* 原理比较

  - webpack会将文件内容存在一个叫compilation的object里，方便插件和loader调用；
  
  - gulp使用了pipe管道流的内存处理方式，每一个task任务占用一个流，webpack却是共享一个流。

## HMR vs live reload

* live reload 监控文件的变化，然后通知浏览器端刷新页面。缺点：工具并不能够保存应用的状态（states），当刷新页面后，应用之前状态丢失。

* HMR 不会刷新浏览器，而是运行时对模块进行热替换，保证了应用状态不会丢失，提升了开发效率。

* HMR的工作原理：