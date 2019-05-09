## 手写代码

* 实现new

  ```js
  function myNew(target) {
    var res = {};
    res.__proto__ = target.prototype;
    var result = target.apply(res, Array.prototype.slice.call(arguments, 1));
    return typeof result === 'object' ? result : res;   // 构造函数返回非对象会被忽略
  }
  ```

* 实现多版本继承

  ```js
  function extends(sup, sub) {
    var temp = function(){};
    temp.prototype = sup.prototype;
    sub.prototype = new temp();
    sub.prototype.constructor = sub;
  }
  ```

* 实现promise

  ```js
  const PENDING = 'Pending';
  const RESOLVED = 'Resolved';
  const REJECTED = 'Rejected';
  function myPromise(excutor) {
    const that = this;
    this.status = PENDING;
    that.result = null;
    that.reason = null;
    that.onResolvedCbs = [];
    that.onRejectedCbs = [];
    that.resolveFunc = resolve;
    that.rejectFunc = reject;

    function resolve(result) {
      if (result instanceof myPromise) {
        return result.then(resolve, reject);
      }
      setTimeout(() => {
        if(that.status === PENDING) {
          that.status = RESOLVED;
          that.result = result;
          that.onResolvedCbs.forEach(cb => cb(result));
        }
      });
    }

    function reject(reason) {
      setTimeout(() => {
        if(that.status === PENDING) {
          that.status = REJECTED;
          that.result = reason;
          that.onRejectedCbs.forEach(cb => cb(reason));
        }
      });
    }

    try {
      excutor(resolve, reject);
    } catch(e) {
      reject(e);
    }
  }

  myPromise.prototype.then(onResolved = value => value, onRejected = reason => reason) {
    const that = this;
    let promise2;
    if (that.status === PENDING) {
      that.onResolvedCbs.push((result) => {
        try {
          const p = onResolved(result);
          if (p instanceof myPromise) {
            p.then(that.resolveFunc, that.rejectFunc);
          }
        } catch(e) {
          that.rejectFunc(e);
        }
      });

      that.onRejectedCbs.push((reason) => {
        try {
          const p = onRejected(reason);
          if (p instanceof myPromise) {
            p.then(that.resolveFunc, that.rejectFunc);
          }
        } catch(e) {
          that.rejectFunc(e);
        }
      });
    } else if (that.status === RESOLVED) {
      return promise2 = new myPromise(resolve, reject) {
        try {
          const p = onResolved(that.result);
          if (p instanceof myPromise) {
            p.then(resolve, reject);
          } else
            resolve(p);
        } catch(e) {
          reject(e);
        }
      }
    } else if (that.status === REJECTED) {
      return promise2 = new myPromise(resolve, reject) {
        try {
          const p = onRejected(that.reason);
          if (p instanceof myPromise) {
            p.then(resolve, reject);
          } else
            reject(p);
        } catch(e) {
          reject(e);
        }
      }
    }
  }
  ```

* 实现节流/节流

  ```js
  // @isDe 是否是防抖 
  function throttle (fn, delay, isDe) {
    let t = null;
    return function(...arg) {
      if (isDe) {
        if (t) clearTimeout(t);
        t = setTimeout(() => {
          fn.apply(arg);
        }, delay);
      } else {
        if (t) return;
        fn.apply(arg);
        setTimeout(() => {
          t = null;
        }, delay);
      }
    };
  }

   // @isDe 是否是防抖 
  function throttle (fn, delay, isDe) {
    let t = null;
    let last = 0;
    return function(...arg) {
      if (isDe) {
        if (t) clearTimeout(t);
        t = setTimeout(() => {
          fn(...arg);
        }, delay);
      } else {
        if (!t) t = Date.now();
        if (t - last < delay) return;
        fn(...arg);
        last = Date.now();
      }
    };
  }
  ```

* 实现call/apply/bind

  ```js
  function call(fn, context, ...arg) {
    context.func = fn;
    let result = context.func(...arg);
    delete context.func;
    return result;
  }

  function bind(fn, context, ...arg) {
    let refn =  fn.call(context, ...arg);
    function Temp() {}
    Temp.prototype = fn.prototype;
    refn.prorotype = new Temp();
    return refn;
  }
  ```

* 简单实现async函数

* 实现 EventEmitter

  ```js
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