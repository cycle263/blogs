## 源码

> webpack 每一个依赖等都是 module, 最后 trunk 的输出，就是对一个个 module 做排序、拼接、渲染，得到最后的 trunk 内容。

* moduleId

默认情况下，moduleId为增量数字，可以使用插件方式改变成其他ID。

```js
// modules数组用于保存所有的模块初始化函数, 通过 IIFE 的方式传入, 给所有模块外面加一层包装函数，使其成为模块初始化函数
(function (modules) {
  ...
})([
  (function (module, __webpack_exports__, __webpack_require__) {
    /* ... */
  }),
  (function (module, __webpack_exports__, __webpack_require__) {
    /* ... */
  }),
  (function (module, __webpack_exports__, __webpack_require__) {
    /* ... */
  })
])

// 模块加载函数
function __webpack_require__(moduleId) {
	// Check if module is in cache
	if(installedModules[moduleId])
		return installedModules[moduleId].exports;

	// Create a new module (and put it into the cache)
	var module = installedModules[moduleId] = {
		exports: {},
		id: moduleId,
		loaded: false
	};

	// Execute the module function
	modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

	// Flag the module as loaded
	module.loaded = true;

	// Return the exports of the module
	return module.exports;
}

// 模块定义
function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ajax"] = factory();
	else
		root["ajax"] = factory();
}
```
