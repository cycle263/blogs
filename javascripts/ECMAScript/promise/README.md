## Promise标准

```
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

  ```
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
  * Promise.race()  // 完成一个，取或


## Promise 实现

  * 返回一个新的promise

  * 返回一个同步值

  * 抛出同步异常
