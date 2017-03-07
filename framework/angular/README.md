## angular

* 脏检查机制

  ng只有在指定事件触发后，才进入$digest cycle：

  - DOM事件，譬如用户输入文本，点击按钮等。(ng-click)
  - XHR响应事件 ($http)
  - 浏览器Location变更事件 ($location)
  - Timer事件($timeout, $interval)
  - 执行$digest()或$apply()

  Object.defineProperties中的setter/getter实现属性变化监控watcher，IE低版本可以用 `Object.__defineGetter__ / Object.__defineSetter__ `替换。

* $watch和$digest

  需要存储注册过的所有监听器，`this.$$watchers = [];  //$$约定为私有变量`

  ```
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
