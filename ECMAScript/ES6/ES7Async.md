## async/await 函数

函数前面的async意味着这个函数总是返回一个promise，如果代码中有return <非promise>语句，JavaScript会自动把返回的这个value值包装成promise的resolved值。其实，async 函数就是 Generator 函数的语法糖，也就是将 Generator 函数的星号（\*）替换成 async，将 yield 替换成 await，仅此而已。

  ```js
  async function testAsync() {
    return "hello async";
  }

  const result = testAsync();
  console.log(result);  // Promise {<resolved>: "hello async"}
  ```

* async vs Generator

  - 内置执行器, 不需要像generator一步步执行next

  - 更好的语义，async 和 await，比起星号和 yield，语义更清楚了。

  - 更广的适用性，yield 命令后面只能是Thunk函数或Promise对象，await命令后面，可以跟Promise对象和原始类型的值(数值，字符串等)

* await vs promise.then

  - await会暂停所在的async函数的执行, promise.then将函数加入回调链中之后(放入微任务队列中)，会继续执行当前函数，并且调试可以直接在await语句上打断点，语义和写法更加简单明了。

  - promise resolve异常时，promise所在的作用域已经不存在了，要打印它的堆栈信息，需要额外记录，对性能和资源都有一定消耗。另外，不能在then语句上断点调试，会直接跳过整个异步代码。

  - 在没有 await 的情况下执行 async 函数，它会立即执行，返回一个 Promise 对象，并且绝不会阻塞后面的语句，和普通返回 Promise 对象的函数并无区别。

  ```js
  // promise.then
  const a = () => {
    b().then(() => c());
  };

  // async/await
  const a = async () => {
    await b();
    c();
  };
  ```

* 使用注意事项

  - async函数会隐式地返回一个promise，该promise的reosolve值就是函数return的值。

    ```js
    const makeRequest = async () => {
      /* await getJSON()表示console.log会等到getJSON的promise成功reosolve之后再执行。 */
      console.log(await getJSON());
      return "done";
    };
    ```

  - await 不仅仅用于等待 Promise 对象 和 async函数的返回值，它可以等任意表达式的 **结果**，所以，await 后面实际是可以接普通函数调用或者直接量的。

    ```js
    function getSomething() {
      return "something";
    }

    async function testAsync() {
      return Promise.resolve("hello async");
    }

    async function test() {
      const v1 = await getSomething();
      const v2 = await testAsync();
      console.log(v1, v2);
    }
    ```

  - await 命令后面的 Promise 对象，运行结果可能是 rejected，所以最好把 await 命令放在 try...catch 代码块中。

    ```js
    async function myFunction() {
      try {
        await somethingThatReturnsAPromise();
      } catch (err) {
        console.log(err);
      }
    }

    /* 另一种写法 */
    async function myFunction() {
      await somethingThatReturnsAPromise().catch(function (err){
        console.log(err);
      });
    }
    ```

  - await 命令只能用在 async 函数之中，如果用在普通函数或者全局作用域中，就会报错。

    ```js
    async function dbFuc(db) {
      let docs = [{}, {}, {}];
      /* 报错, await 命令在匿名函数中, 不能直接在 forEach, map 之类的方法里处理  */
      docs.forEach(function (doc) {
        await db.post(doc);
      });
    }

    async function dbFuc(db) {
      let docs = [{}, {}, {}];
      /* 可能得到错误结果，并发执行  */
      docs.forEach(async function (doc) {
        await db.post(doc);
      });
    }

    async function dbFuc(db) {
      let docs = [{}, {}, {}];
      /* 继发执行，一个执行结束再执行下一个  */
      for (let doc of docs) {
        await db.post(doc);
      }
    }

    /* 推荐的并发执行写法  */
    async function dbFuc(db) {
      let docs = [{}, {}, {}];
      let promises = docs.map((doc) => db.post(doc));

      let results = await Promise.all(promises);
      console.log(results);
    }
    ```

  - 异常处理

    ```js
    async function f() {
      try {
        let response = await fetch('./url');
        let user = await response.json();
      } catch(err) {
        /* 在fetch和response.json中都能捕获错误 */
        alert(err);
      }
    }

    async function f() {
      let response = await fetch('./url');
      return await response.json();
    }
    f().catch(alert);
    ```
