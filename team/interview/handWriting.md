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

* 实现call/apply/bind