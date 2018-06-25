## async函数

  > async 函数就是 Generator 函数的语法糖，也就是将 Generator 函数的星号（\*）替换成 async，将 yield 替换成 await，仅此而已。

  * async vs Generator

    - 内置执行器, 不需要像generator一步步执行next

    - 更好的语义， async 和 await，比起星号和 yield，语义更清楚了。

    - 更广的适用性，yield 命令后面只能是Thunk函数或Promise对象，await命令后面，可以跟Promise对象和原始类型的值(数值，字符串等)

  * 使用

    - await 命令后面的 Promise 对象，运行结果可能是 rejected，所以最好把 await 命令放在 try...catch 代码块中。

      ```js
      async function myFunction() {
        try {
          await somethingThatReturnsAPromise();
        } catch (err) {
          console.log(err);
        }
      }

      // 另一种写法

      async function myFunction() {
        await somethingThatReturnsAPromise().catch(function (err){
          console.log(err);
        });
      }
      ```

    - await 命令只能用在 async 函数之中，如果用在普通函数，就会报错。

      ```js
      async function dbFuc(db) {
        let docs = [{}, {}, {}];

        // 报错, await 命令在匿名函数中, 不能直接在 forEach, map 之类的方法里处理
        docs.forEach(function (doc) {
          await db.post(doc);
        });
      }

      async function dbFuc(db) {
        let docs = [{}, {}, {}];

        // 可能得到错误结果，并发执行
        docs.forEach(async function (doc) {
          await db.post(doc);
        });
      }

      async function dbFuc(db) {
        let docs = [{}, {}, {}];

        // 继发执行，一个执行结束再执行下一个
        for (let doc of docs) {
          await db.post(doc);
        }
      }

      // 推荐的并发执行写法
      async function dbFuc(db) {
        let docs = [{}, {}, {}];
        let promises = docs.map((doc) => db.post(doc));

        let results = await Promise.all(promises);
        console.log(results);
      }
      ```
