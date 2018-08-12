## 模块化

  > 模块化规范：即为 JavaScript 提供一种模块编写、模块依赖和模块运行的方案。

* require vs import

| require/exports | import/export |
|-----------------|---------------|
|  2010年前后诞生   | 2015年的ES2015版本 |
|      野生规范     |    名门正派      |
| CommonJS、AMD、CMD | ECMAScript 6 |
| 动态加载，程序运行的时候去解析 | 静态加载，编译的时候去做解析请求包 |


* ES6模块与CommonJS模块的差异

  CommonJs 模块输出的是一个值的拷贝，ES6模块输出的是一个值的引用CommonJS 模块是运行时加载，ES6模块是编译时输出接口ES6输入的模块变量，只是一个符号链接，所以这个变量是只读的，对它进行重新赋值就会报错
  
  模块加载AMD，CMD，CommonJS Modules/2.0 规范这些规范的目的都是为了 JavaScript 的模块化开发，特别是在浏览器端的对于依赖的模块，AMD 是提前执行，CMD 是延迟执行CMD 推崇依赖就近，AMD 推崇依赖前置

