## 模块化

  > 模块化规范：即为 JavaScript 提供一种模块编写、模块依赖和模块运行的方案。

* require vs import

  | require/exports | import/export |
  |-----------------|---------------|
  |  2010年前后诞生   | 2015年的ES2015版本 |
  |      野生规范     |    名门正派      |
  | CommonJS、AMD、CMD |   ECMAScript 6 |
  | 动态加载，程序运行的时候去解析加载 | 静态加载，编译的时候去做解析请求包 |


* ES6模块与CommonJS模块的差异

  |           ES 6 module       |         CommonJs Module          |
  |-----------------------------|----------------------------------|
  |          值的引用             |         值的拷贝(浅拷贝))          |
  |      服务端和客户端           |             服务端                  |
  |  编译时加载（编译时确定依赖，输入和输出） |  运行时加载（运行时确定依赖，输入和输出） |
  | 原始值变化，import加载的值也会跟着变化 | 基本类型不会跟着变化，可以手动每次更新module.exports的值 |
  |       有default默认导出对象     |             没有                 |
  |       动态绑定，不缓存       | 会缓存执行代码的结果，导致引用代码块的值不会随着包代码的值变化而变化 |
  |       静态分析，加载效率高        |         无法静态分析，效率偏低      |

  ```js
  // even.js
  import { odd } from './odd'
  export var counter = 0;
  export function even(n) {
    counter++;
    return n == 0 || odd(n - 1);
  }

  // odd.js
  import { even } from './even';
  export function odd(n) {
    return n != 0 && even(n - 1);
  }
  ```

  CommonJs 模块输出的是一个值的拷贝，ES6模块输出的是一个值的引用; CommonJS 模块是运行时加载，也就是遇到require就加载并执行，ES6模块是编译时输出接口，ES6输入的模块变量，只是一个符号链接（一个引用），所以这个变量是只读的，对它进行重新赋值就会报错。也就是说，ES6模块是动态引用，不存在缓存值的问题，而且模块里面的变量，绑定其所在的模块，每次都会动态地去被加载的模块取值。
  
  模块加载AMD，CMD，CommonJS Modules/2.0 规范这些规范的目的都是为了 JavaScript 的模块化开发，特别是在浏览器端的对于依赖的模块，AMD 是提前执行，CMD 是延迟执行CMD 推崇依赖就近，AMD 推崇依赖前置。

  ```js
  // a.js
  export let a = 10;
  export let b = 10;
  export function add() {
    a = 15;
    b = 20;
    return a+b;
  };

  // b.js
  import {a, b, add} from './a.js';
  a+b;    // 20
  add();  // 35
  a+b;    // 35, 导出的变量是只读引用
  ```

* Commonjs模块的加载原理

  CommonJS的一个模块，就是一个脚本文件。require命令第一次加载该脚本，就会执行整个脚本，然后在内存生成一个对象，类似于`{id:'', exports: {}, loaded: true}`，其中ID表示模块名，exports是模块输出的各个接口，loaded表示模块脚本是否执行完。

  以后需要用到这个模块的时候，就会到exports属性上面取值。即使再次执行require命令，也不会再次执行该模块，而是到缓存之中取值。

* Commonjs模块的循环引用

  不会再次执行该模块，而是到缓存之中取值。

