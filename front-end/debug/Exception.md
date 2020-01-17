## 异常处理

### 为何要处理异常？

* 用户体验
* 尽早发现定位问题
* 完善前端监控平台

### 需要处理哪些异常？

* 代码语法、运行异常
* 请求异常
* 资源加载异常
* Promise、异步异常
* 跨域异常
* 浏览器卡顿、崩溃
* 内存泄露

### 如何处理异常？

* try-catch 捕获异常
能捕获到运行异常，对语法异常和异步错误不能捕获。try-catch主要用来捕获可以预见的异常信息。
```js
try {
    console.log(a); // 能捕获运行错误
    console.log('); // 无法捕获语法错误
    setTimeout(() => {
        null.map(() => {}); // 无法捕获异步错误
    }); 
} catch(e) {
    console.log('捕获的异常信息：' + e);
}
```

* window.onerror 监控异常
当js发生错误，会触发一个ErrorEvent接口的error事件，并执行onerror。onerror定位用来监控不可预料的异常信息。
```js
window.onerror = (errMessage, source, lineNo, colNo, error) => {
    console.log('监控到异常：' + errMessage, lineNo, colNo);
};
console.log(a); // 能监控运行错误
console.log('); // 无法监控语法错误
setTimeout(() => {
    null.map(() => {}); // 能监控异步错误
});
<img src="./noImage.png" alt="图片不存在">  // 无法监控资源加载异常
```

* window.addEventListener 监听异常
当一项资源（如图片或脚本）加载失败，加载资源的元素会触发一个 Event 接口的 error 事件，并执行该元素上的onerror() 处理函数。这些 error 事件不会向上冒泡到 window，因此onerror无法监听此类异常。
```js
window.addEventListener('error', (error) => {
    console.log('监听到异常：', error);
}, true);
```

* Promise catch
Promise 中没写 catch，抛出的错误无法被 onerror 或 try-catch 捕获到，所以我们务必要在 Promise 中不要忘记写 catch 处理抛出的异常。另外一种方式，全局增加一个对 unhandledrejection 的监听，用来全局监听Uncaught Promise Error。
```js
window.addEventListener("unhandledrejection", (e) => {
  console.log('promise异常：' + e);
});
```

* Vue errorHandler

```js
Vue.config.errorHandler = (err, vm, info) => {
    console.log('vue异常：' + err);
};
```

* React errorHandler

```js
componentDidCatch(error, info) {
    console.log('react异常：' + error, info);
}
```