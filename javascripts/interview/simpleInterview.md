## 全局考察

* commonJS和AMD规范区别？和ES6的模块有什么不同？（ [Detail](../../structure/README.md) ）

* react的生命周期？组件之间的数据通信？数据模型(redux、flux、reselect)？react适合什么类型的项目工程

  > 一个基于 state 和 props 的组件渲染函数，state 是自己的，props 是外面引入的，产生变化就重新渲染一遍。

* 在浏览器中输入url到页面内容全部显示？html文档解析过程？

  > 从上至下，从外至内。url -> 域名解析 -> 服务器返回HTML响应 -> 浏览器展示html -> css/img/script响应 -> 异步ajax响应

* ES6有哪些新特性？ babel转码的实现原理？实现promise? aynsc和await

----

## 前端技术具体考察点

* 清除浮动的几种方法？行内元素和块元素区别？盒模型、选择器优先级？BFC? 布局方式？(弹性，流，瀑布...)

* 闭包的理解？this对象？原型链？作用域？变量提升？Ajax跨域？冒泡和捕获？性能优化？IIFE(http协议标准、json标准)?

* javascript中不可以直接使用【下标方式】修改字符串内容？  

  > 不可以，原因使用下标访问时，只是临时创建的array对象。

* 如果一个元素拥有ID属性,那么ID属性的属性值就会成为window对象的属性名吗？是的

* canvas、svg区别和各自特点，数据量大运算复杂，谁性能更好？

  > Canvas提供的功能更原始，适合像素处理，动态渲染和大数据量绘制, SVG是一整套独立的矢量图形语言，功能更完善，适合静态图片展示，高保真文档查看和打印的应用场景。

## 框架类库和工程化

* 对jquery和html5有一点了解，瞬间暴露了题主的水平。首先应该说熟练使用jquery和相关类库

* d3.js、echart(canvas)、highchart(svg)、highstock、EaselJS、flv.js，如何技术选型？各自优缺点

* 常用的设计模式，例如工厂模式，享元模式，单例模式，流行的mvc，mvvc，mv*架构模式

* 比较风靡的前端框架react, angular2, vue, backbone等，常见的模板引擎jade、velocity等

* 对前端工程进行流程化开发，对前端GUI软件编译合并打包，gulp、grunt、webpack等构建工具各自优缺点，nginx的combo技术

  > 相比grunt而言，gulp容易上手，基于stream,管道拼接多个tash; webpack提供模块化解决方案，支持es6写法的预编译解决方案

----

## 其他加分技能

* 超级uv的无缝发布部署，相关文件的先后发布顺序，灰度部署，平稳升级，错误监控和分析，安全性监控？自动化测试？

* 最后擅长一门后端，如nodejs, php, java等，了解关系型数据库和非关系型数据库，函数式编程，多媒体前端经验，网络协议，http2等

* 有没有做过开源项目？有没有自己的blog和github项目？最近在学什么？接下来半年你打算学习什么？
