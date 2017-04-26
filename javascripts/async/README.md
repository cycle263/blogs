## 异步编程方式



* 回调

  典型的有事件回调，ajax回调

* Promise

  ```
  function defer() {
    var tasks = [],
      progresses = [],
      state = 'pending',
      value,
      reason;
          return {
              resolve: function(_value) {
                  if (tasks) {
                      value = ref(_value);
                      tasks.forEach(function(task) {                      
                          nextTick(function() {
                              value.then.apply(value, task);
                          });
                      });
                      tasks = null;
                      state = 'resolved';
                  }else {
                      if (state === 'resolved') {
                          throw new Error('A promise should been resolved once.');
                      }
                  }
              },
              reject: function(reason) {
                  if (tasks) {
                      value = ref(reason);
                      tasks.forEach(function(task) {
                          nextTick(function() {
                              value.then.apply(value, [task[1], task[0]]);
                          });
                      });
                      tasks = undefined;
                      state = 'rejected';
                  }else {
                      if (state === 'rejected') {
                          throw new Error('A promise should been rejected once.');
                      }
                  }
              },
              notify: function(progress) {
                  if (state === 'resolved' || state === 'rejected') {
                      return;
                  }
                  progresses.push(progress);
              },
              promise: {
                  then: function(_callback, _errback, _notifyback) {
                      var deferred = defer();
                      _callback = _callback || function(value) {
                          return value;
                      };
                      _errback = _errback || function(reason) {
                          return reject(reason);
                      };
                      _notifyback = _notifyback || function(progress) {
                          return progress;
                      };
                      var callback = function(value) {
                          var result;
                          try {
                              result = _callback(value);
                          }catch(e) {
                              deferred.reject(e);
                          }finally {
                              deferred.resolve(result);
                          }
                      };      
                      var errback = function(reason) {
                          var result;
                          try {
                              result = _errback(reason);
                          }catch(e) {
                              deferred.reject(e);
                          }finally {
                              deferred.resolve(result);
                          }
                      }
                      nextTick(function() {
                          while (progresses.length) {
                              try {
                                  _notifyback(progresses.shift());
                              }catch(e) {
                                  deferred.reject(e);
                                  break;
                              }
                          }
                      });             
                      if (tasks) {
                          tasks.push([callback, errback]);
                      }else {
                          nextTick(function() {
                              if (state === 'rejected') {
                                  value.then(errback);
                              }else if (state === 'resolved') {   
                                  value.then(callback);
                              }
                          });
                      }
                      return deferred.promise;
                  }
              }
          };
      }
      var ref = function(value) {
          if (value && typeof value.then === 'function') {
              return value;
          }
          return {
              then: function(callback) {
                  return ref(callback(value));
              }
          }
      };
      var reject = function(reason) {
          return {
              then: function(callback, errback) {
                  return ref(errback(reason));
              }
          };
      };
      var nextTick = function(callback) {
          setTimeout(callback, 0);
      };
      //Promise实例
      var deferred = defer(),
          promise = deferred.promise;
      promise.then(function(value) {
          console.log(value);
          throw 'zhangsan';
      }).then(function (v) {
          console.log(v);
      }, function (err) {
          console.error(err);
          done();
      });
      setTimeout(function () {
          deferred.resolve('zhangsan1');
      }, 1000);
  ```


* 发布订阅

  ```
  var PubSub = function(){
      this.handlers = {};
  };
  PubSub.prototype.subscribe = function(eventType, handler) {
      if (!(eventType in this.handlers)) {
          this.handlers[eventType] = [];
      }
      this.handlers[eventType].push(handler); //添加事件监听器
      return this;//返回上下文环境以实现链式调用
  };
  PubSub.prototype.publish = function(eventType) {
      var _args = Array.prototype.slice.call(arguments, 1);
      for (var i = 0, _handlers = this.handlers[eventType]; i < _handlers.length; i++) {
          _handlers[i].apply(this, _args);//遍历事件监听器
      }
      return this;
  };
  var event = new PubSub;//构造PubSub实例
  event.subscribe('list', function(msg) {
      console.log(msg);
  });
  event.publish('list', {data: ['one,', 'two']});
  //Object {data: Array[2]}
  ```

* Generator
