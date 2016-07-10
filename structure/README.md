## 前端工程

### 模块化

* CommonJS  

  服务器端的 Node.js 遵循 CommonJS规范，该规范的核心思想是允许模块通过 require 方法来同步加载所要依赖的其他模块，然后通过 exports 或 module.exports 来导出需要暴露的接口。

    ```
    require("module");
    require("../file.js");
    exports.doStuff = function() {};
    module.exports = someValue;
    ```

  缺点： 同步的模块加载方式不适合在浏览器环境中，同步意味着阻塞加载，浏览器资源是异步加载的  


* AMD  

  Asynchronous Module Definition 规范其实只有一个主要接口 define(id?, dependencies?, factory)，它要在声明模块的时候指定所有的依赖 dependencies，并且还要当做形参传到 factory 中，对于依赖的模块提前执行，依赖前置。

    ```
    define("module", ["dep1", "dep2"], function(d1, d2) {
      return someExportedValue;
    });
    require(["module", "../file"], function(module, file) { /* ... */ });
    ```

  缺点： 不符合通用的模块化思维方式


* CMD  

  Common Module Definition 规范和 AMD 很相似，尽量保持简单，并与 CommonJS 和 Node.js 的 Modules 规范保持了很大的兼容性。

  ```
  define(function(require, exports, module) {
      var $ = require('jquery');
      var Spinning = require('./spinning');
      exports.doSomething = ...
      module.exports = ...
  })
  ```

* ES6 Module

  EcmaScript6 标准增加了 JavaScript 语言层面的模块体系定义。ES6 模块的设计思想，是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东西。

  ```
  import "jquery";
  export function doStuff() {}
  module "localModule" {}
  ```