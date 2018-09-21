## rollup

  Rollup 是 ES6 模块化工具。

## rollup vs webpack

  webpack为构建复杂的单页应用而出现，rollup则希望利用ES 6模块设计，高效地构建出能够直接被其它JavaScript库引用的模块。从产品定位上来说，webpack更适合业务项目开发，rollup更适合js库的开发。

* webpack特性

  - 代码拆分（code splitting） 将项目分解成可管理的代码块，可以按需加载

  - 静态资源（static assets） 图像和 CSS 等所有静态资源都可以作为组件导入到项目中

* rollup特性

  - 基于ES6模块

* 选型的常用标准

  - 有大量的静态资源需要处理，有很多Commonjs模块的依赖，需要分包和按需加载，推荐webpack
  
  - 基于ES2015模块，并且希望别人可以直接应用你的代码，推荐rollup