## 源码

> webpack 每一个依赖等都是 module, 最后 trunk 的输出，就是对一个个 module 做排序、拼接、渲染，得到最后的 trunk 内容。

webpack本质上是一种事件流的机制，它的工作流程就是将各个插件串联起来，而实现这一切的核心就是Tapable，webpack中最核心的负责编译的Compiler和负责创建bundles的Compilation都是Tapable的实例。Tapable的原理其实就是EventEmit，通过发布者-订阅者模式实现。

```js
// 未分包的打包结果文件
(function (modules) {
  //  缓存已经加载过的module的exports
  //  module在exports之前还是有js需要执行的，缓存的目的就是优化这一过程
  // The module cache
  var installedModules = {};

  // The require function
  /**
   * 模拟CommonJS require()
   * @param {String} moduleId 模块路径
   */
  function __webpack_require__(moduleId) {

    // Check if module is in cache
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    // Create a new module (and put it into the cache)
    var module = installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {}
    };

    // 执行单个module JS Function并填充installedModules与module
    // function mudule(module, __webpack_exports__[, __webpack_require__])
    // Execute the module function
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

    // Flag the module as loaded
    module.l = true;

    // Return the exports of the module
    return module.exports;
  }

  // expose the modules object (__webpack_modules__)
  __webpack_require__.m = modules;

  // expose the module cache
  __webpack_require__.c = installedModules;

 ......

  // __webpack_public_path__
  __webpack_require__.p = "";

  // 加载Entry并返回Entry的exports
  // Load entry module and return exports
  return __webpack_require__(__webpack_require__.s = "./src/index.js");
})
  // modules其实就是一个对象，键是模块的路径，值就是模块的JS Function
  ({
    "./src/index.js": function (module, __webpack_exports__, __webpack_require__) {
      "use strict";
      eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _module_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./module.js */ \"./src/module.js\");\n/* harmony import */ var _module_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_module_js__WEBPACK_IMPORTED_MODULE_0__);\n{};\nconsole.log(_module_js__WEBPACK_IMPORTED_MODULE_0___default.a.s);\n\n//# sourceURL=webpack:///./src/index.js?");
    },
    "./src/module.js": function (module, exports) {
      eval("{};var s = 123;\nconsole.log(s);\nmodule.exports = {\n  s: s\n};\n\n//# sourceURL=webpack:///./src/module.js?");
    }
  });
```

![webpack完整的执行流程图](../images/progress.jpg)

* tapable的实现思路

```js
class SyncHook{
	constructor(){
		this.hooks = [];
	}
	// 订阅事件
	tap(name, fn){
		this.hooks.push(fn);
	}
	// 发布
	call(){
		this.hooks.forEach(hook => hook(...arguments));
	}
}
```

* chunkId

	一个chunk里面可以包含多个module。

* moduleId

	默认情况下，moduleId为增量数字，可以使用插件方式改变成其他ID。

```js
// modules数组用于保存所有的模块初始化函数, 通过 IIFE 的方式传入, 给所有模块外面加一层包装函数，使其成为模块初始化函数
(function (modules) {
  ...
})([
  (function (module, __webpack_exports__, __webpack_require__) {
    /* ... */		// moduleId
  }),
  (function (module, __webpack_exports__, __webpack_require__) {
    /* ... */
  }),
  (function (module, __webpack_exports__, __webpack_require__) {
    /* ... */
  })
])

// 模块加载函数, webpackJsonp调用
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

// webpackJsonp, require.ensure按需加载
function webpackJsonpCallback(chunkIds, moreModules, executeModules) {
		// add "moreModules" to the modules object,
		// then flag all "chunkIds" as loaded and fire callback
		var moduleId, chunkId, i = 0, resolves = [], result;
		for(;i < chunkIds.length; i++) {
				chunkId = chunkIds[i];
				if(installedChunks[chunkId]) {
						resolves.push(installedChunks[chunkId][0]);
				}
				installedChunks[chunkId] = 0;
		}
		for(moduleId in moreModules) {
				if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
						modules[moduleId] = moreModules[moduleId];
				}
		}
		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules, executeModules);
		while(resolves.length) {
				resolves.shift()();
		}
};

// 动态加载
// This file contains only the entry chunk.
// The chunk loading function for additional chunks
__webpack_require__.e = function requireEnsure(chunkId) {
		var installedChunkData = installedChunks[chunkId];
		if(installedChunkData === 0) {
				return new Promise(function(resolve) { resolve(); });
		}
		// a Promise means "currently loading".
		if(installedChunkData) {
				return installedChunkData[2];
		}
		// setup Promise in chunk cache
		var promise = new Promise(function(resolve, reject) {
				installedChunkData = installedChunks[chunkId] = [resolve, reject];
		});
		installedChunkData[2] = promise;
		// start chunk loading
		var head = document.getElementsByTagName('head')[0];
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.charset = 'utf-8';
		script.async = true;
		script.timeout = 120000;
		if (__webpack_require__.nc) {
				script.setAttribute("nonce", __webpack_require__.nc);
		}
		script.src = __webpack_require__.p + "" + ({"0":"foo","1":"bar"}[chunkId]||chunkId) + ".bundle.js";
		var timeout = setTimeout(onScriptComplete, 120000);
		script.onerror = script.onload = onScriptComplete;
		function onScriptComplete() {
				// avoid mem leaks in IE.
				script.onerror = script.onload = null;
				clearTimeout(timeout);
				var chunk = installedChunks[chunkId];
				if(chunk !== 0) {
						if(chunk) {
								chunk[1](new Error('Loading chunk ' + chunkId + ' failed.'));
						}
						installedChunks[chunkId] = undefined;
				}
		};
		head.appendChild(script);
		return promise;
};

// es6 module和commonjs模块混合使用
// getDefaultExport function for compatibility with non-harmony modules
__webpack_require__.n = function(module) {
    var getter = module && module.__esModule ?
        function getDefault() { return module['default']; } :
        function getModuleExports() { return module; };
    __webpack_require__.d(getter, 'a', getter);
    return getter;
};
```
