## angular

* 脏检查机制

  > Angular在scope模型上设置了一个监听队列，用来监听数据变化并更新view 。每次绑定一个东西到view上时AngularJS就会往$watch队列里插入一条$watch，用来检测它监视的model里是否有变化的东西。当浏览器接收到可以被angular context处理的事件时，$digest循环就会触发，遍历所有的$watch，最后更新dom。

  ng只有在指定事件触发后，才进入$digest cycle：

  - DOM事件，譬如用户输入文本，点击按钮等。(ng-click)
  - XHR响应事件 ($http)
  - 浏览器Location变更事件 ($location)
  - Timer事件($timeout, $interval)
  - 执行$digest()或$apply()

  Object.defineProperties中的setter/getter实现属性变化监控watcher，IE低版本可以用 `Object.__defineGetter__ / Object.__defineSetter__ `替换。

  ```html
  <button ng-click="val=val+1">increase 1</button>
  ```
  1. 按下按钮
  2. 浏览器接收到一个事件，进入到 angular context
  3. $digest 循环开始执行，查询每个 $watch 是否变化
  4. 由于监视 $scope.val 的 $watch 报告了变化，因此强制再执行一次 $digest 循环
  5. 新的 $digest 循环未检测到变化
  6. 浏览器拿回控制器，更新 $scope.val 新值对应的 dom

  
* $watch和$digest

  需要存储注册过的所有监听器，`this.$$watchers = [];  //$$约定为私有变量`

  ```js
  Scope.prototype.$watch = function(watchFn, listenerFn, valueEq) {
    var watcher = {
      watchFn: watchFn,
      listenerFn: listenerFn || function(){},
      valueEq: !!valueEq  // true基于值的检查，flase引用检查
    };
    this.$$watchers.push(watcher);
  };

  Scope.prototype.$digest = function() {
    var dirty;
    var ttl = 10;
    do {
      dirty = this.$$digestOnce();
      if (dirty && !(ttl--)) {
        throw "10 digest iterations reached";
      }
    } while (dirty);
  };

  Scope.prototype.$$digestOnce = function(){
    var self = this;
    var dirty;
    this.$$watcher.forEach(function(watcher){
      var newValue = watcher.watchFn(self);
      var oldValue = watcher.last;
      if (newValue !== oldValue) {
        watcher.listenerFn(newValue, oldValue, self);
        dirty = true;
      }
      watcher.last = newValue;
    });
    return dirty;
  };

  Scope.prototype.$$areEqual = function(newValue, oldValue, valueEq) {
    if (valueEq) {
      return _.isEqual(newValue, oldValue);
    } else {
      return newValue === oldValue ||
        (typeof newValue === 'number' && typeof oldValue === 'number' &&
         isNaN(newValue) && isNaN(oldValue));
    }
  };
  ```
