- seajs：按需异步加载，即需即加载（CMD）
- requirejs：提前预加载（AMD）

> seajs内部运作案例：

```js
index.js :
seajs.use(['./a','jquery'],function(a,$){
    var num = a.a;
    $('#J_A').text(num);
})

a.js :
;define(function(require,exports,module){
    var b = require('./b');
    var a = function(){
        return 1 + parseInt(b.b());
    }
    exports.a = a;
})

b.js :
;define(function(require,exports,module){
    var c = require('./c');

    var b = function(){
        return 2 + parseInt(c.c());
    }
    exports.b = b;
})

c.js :
;define(function(require,exports,module){
    var c = function(){
        return 3;
    }
    exports.c = c;
})
```

由上述可知 a 依赖 b ，b依赖c。
首先将会执行seajs本身，在这个过程中将会定义其中一些全局的方法，seajs多版本的容错等等。
当程序进入到index.js

seajs的use方法源码：

```js
// 从配置文件读取是否有需要提前加载的模块
// 如果有预先加载模块，事先设置预加载模块为空，并加载预加载模块并执行回调，如果没有则顺序执行

seajs.use = function(ids, callback) {
    var preloadMods = config.preload;
    if (preloadMods.length) {
        // Loads preload modules before all other modules.
        globalModule._use(preloadMods, function() {
            config.preload = [];
            globalModule._use(ids, callback);
        });
    }
    else {
        globalModule._use(ids, callback);
    }
    return seajs;
}
```

use方法将会从config配置中查看，是否有预先加载的模块，如果config中并没有相关设置，将直接执行globalModule._use(ids, callback)。
globalModule为seajs初始化时Module的实例，var globalModule = new Module(util.pageUri, STATUS.COMPILED),util.pageUri为页面地址
 
接下来将调用 globalModule._use(ids, callback)：

```js
Module.prototype._use = function(ids, callback) {
    //查看传入的ids为字符串还是数组
    //如果传入的ids为字符串 例：ids =  './a' -> ids =['./a']
    //如果传入的ids为数组 例： ids = ['./a','./b'] -> ids = ['./a','./b'] (原样不变)
    util.isString(ids) && (ids = [ids]);
    
    //得到uri 或者 uri数组
    var uris = resolve(ids, this.uri);
    
    this._load(uris, function() {
        //util.map : 让数据成员全部执行一次一个指定的函数，并返回一个新的数组，该数组为原数组成员执行回调后的结果
        var args = util.map(uris, function(uri) {
            return uri ? cachedModules[uri]._compile() : null;
        });
        if (callback) {
            callback.apply(null, args);
        }
    });
};
 ```
 
 
 
