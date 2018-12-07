## Promise标准

```js
var promise = new Promise(function(resolve, reject) {
  // 异步操作的代码

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```

* then方法返回一个新的Promise

* 不同的Promise的实现可以相互调用

* 初始状态为pending, 一旦状态确定则不可以修改为其他状态

* Promise值得穿透

  ```js
  new Promise(resolve=>resolve(8))
  .then()
  .catch()
  .then(function(value) {
    alert(value)
  })
  等同于
  new Promise(resolve=>resolve(8))
  .then(function(value){
    return value
  })
  .catch(function(reason){
    throw reason
  })
  .then(function(value) {
    alert(value)
  })
  ```

## Promise 基本API

  * Promise.resolve()
  * Promise.reject()
  * Promise.prototype.then()
  * Promise.prototype.catch()
  * Promise.all()   // 全部完成，取且
  * Promise.race()  // 完成一个，取或，竞速


## Promise 实现

  * 三种状态：未完成（pending）、已完成（resolved）和拒绝（rejected）

    ```js
    var p1 = new Promise(function(resolve,reject){
      resolve(1);
    });
    var p2 = new Promise(function(resolve,reject){
      setTimeout(function(){
        resolve(2);  
      }, 500);      
    });
    var p3 = new Promise(function(resolve,reject){
      setTimeout(function(){
        reject(3);  
      }, 500);      
    });

    console.log(p1);
    console.log(p2);
    console.log(p3);
    setTimeout(function(){
      console.log(p2);
    }, 1000);
    setTimeout(function(){
      console.log(p3);
    }, 1000);

    p1.then(function(value){
      console.log(value);
    });
    p2.then(function(value){
      console.log(value);
    });
    p3.catch(function(err){
      console.log(err);
    });
    // Promise {<resolved>: 1}
    // Promise {<pending>}
    // Promise {<pending>}
    // 1
    // 2
    // 3
    // Promise {<resolved>: 2}
    // Promise {<rejected>: 3}
    ```

  * 处理函数都放入队列，也就是注册回调函数

  * then方法返回一个新的promise，可以进行链式调用

  * 返回一个同步值

  * 抛出同步异常

  ```js
  function P(fn) {
    var value = null;
    var events = [];
    this.then = function(f) {
      events.push(f);
      return this;
    }
    function resolve(newValue) {
      var f = events.shift();
      f(newValue, resolve);
    }
    fn(resolve);
  }

  function a() {
    return new P(function(resolve) {
      console.log("get...");
      setTimeout(function() {
        console.log("get 1");
        resolve(1);
      }, 1000)
    });
  }
  a().then(function(value, resolve) {
    console.log("get...");
    setTimeout(function() {
      console.log("get 2");
      resolve(2);
    }, 1000)
  }).then(function(value, resolve) {
    console.log(value)
  })
  ```
