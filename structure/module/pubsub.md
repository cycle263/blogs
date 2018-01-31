## 发布订阅

* 事件发射

  ```
  // 简单实现了一下 subscribe 和 dispatch
  var EventEmitter = {
      _events: {},
      dispatch: function (event, data) {
          if (!this._events[event]) { // 没有监听事件
            return;
          }
          for (var i = 0; i < this._events[event].length; i++) {
              this._events[event][i](data);
          }
      },
      subscribe: function (event, callback) {
        // 创建一个新事件数组
        if (!this._events[event]) {
          this._events[event] = [];
        }
        this._events[event].push(callback);
      }
  };

  EventEmitter.subscribe('namechanged', function(data) { alert(data.name); });
  EventEmitter.dispatch('namechanged', { name: 'John' });
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
  var event = new PubSub(); // 构造PubSub实例
  event.subscribe('list', function(msg) {
      console.log(msg);
  });
  event.publish('list', {data: ['one,', 'two']});
  // Object {data: Array[2]}
  ```

* 观察者
    ```
    function observe(data){
    if(!data || typeof data !== 'object'){
        console.error('The data format error!');
        return;
    }
    Object.keys(data).forEach(function(k){
        var value = data[k];
        if(typeof value === 'object')
        observe(value);
        Object.defineProperty(data, k, {
        enumerable: true,
        configurable: true,
        get: function() {
            return value;
        },
        set: function(newVal) {
            if(value === newVal) return;
            console.log('Data has changed, new value: ' + newVal);
            value = newVal;
            Pubsub.publish();
        }
        });
    });
    }
    ```