## redux中间件

  middleware 是指可以被嵌入在框架接收请求到产生响应过程之中的代码。例如，Express 或者 Koa 的 middleware 可以完成添加 CORS headers、记录日志、内容压缩等工作。Redux middleware 被用于解决不同的问题，它提供的是位于 action 被发起之后，到达 reducer 之前的扩展功能，可以用来进行日志记录、创建崩溃报告、调用异步接口或者路由等等。

* 常见的中间件

  - redux-thunk、redux-promise、redux-saga、redux-observable等。

* redux-thunk

  redux-thunk 选择以 middleware 的形式来增强 redux store 的 dispatch 方法（即：支持了 dispatch(function)），从而在拥有了异步获取数据能力的同时，又可以进一步将数据获取相关的业务逻辑从 View 层分离出去。

  redux-thunk是 Redux 作者自己写的，Redux 本身只会处理同步的简单对象 action，但可以通过 redux-thunk 拦截处理函数（function）类型的 action，通过回调来控制触发普通 action，从而达到异步的目的。

  ```js
  // sync thunk
  function add (x, y) {
    return x + y;
  }
  var thunk = function() {
    return add(10, 15);
  };
  thunk();    // 25

  // async thunk
  function addAsync (x, y, cb) {
    setTimeout(function(){
      cb(x + y);
    });
  }
  var thunk = function(cb) {
    addAsync(10, 15, cb);
  }
  thunk(function(sum) {
    console.log(sum);  // 25
  })

  // makeThunk
  function makeThunk(fn) {
    var args = [].slice.call(arguments, 1);   // 获取除fn以外的参数
    return function(cb) {
      args.push(cb);
      fn.apply(null, args);
    }
  }
  var thunk = makeThunk(addAsync, 10, 15);
  ```

  缺点：回调地狱

* redux-promise

  redux-thunk 是将从异步请求返回的 promise 后 dispatch 成不同 action，并直接将这个 promise 作为 action 给 dispatch，但需要写很多重复而又繁琐的 .then().catch() 之类的代码，redux-promise 正是解决了这个问题。

  ```js
  // 核心代码
  export default function promiseMiddleware({ dispatch }) {
    return next => action => {
      if (!isFSA(action))  {// 判断是否是标准的 flux action
        return isPromise(action)
          ? action.then(dispatch)
          : next(action);
      }

      return isPromise(action.payload)
        ? action.payload.then(
            result => dispatch({ ...action, payload: result }),
            error => {
              dispatch({ ...action, payload: error, error: true });
              return Promise.reject(error);
            }
          )
        : next(action);
    };
  }
  ```

  - 缺点

  redux-promise 的写法里 reducer 收到 action 时就已经被 resolve 了，这样如果要处理 loading 这种情景就还得写额外代码；另外，对于复杂的异步业务逻辑来说，大量的业务逻辑代码是放在 action 里处理还是在 reducer 层处理呢？

* redux-observable

  redux-observable 是基于 RxJS 实现的通过组合和取消异步动作去创建副作用的中间件。redux-observable 中处理异步的这一层叫 Epic，它接收一个以 action 流为参数的函数，并返回一个 action 流。

* redux-saga

  redux-saga 是一个用于管理应用程序 Side Effect（副作用，例如：异步获取数据，访问浏览器缓存等）的 library，它的目标是让副作用管理更容易，执行更高效，测试更简单，在处理故障时更容易。redux-saga 是一个 redux 中间件，意味着这个线程可以通过正常的 redux action 从主应用程序启动，暂停和取消，它能访问完整的 redux state，也可以 dispatch redux action。

  另外，redux-saga 使用了 ES6 的 Generator 功能，让异步的流程更易于读取，写入和测试。

  **原理机制**

  redux-saga在原来 Redux 数据流中增加了 saga 层，用于监听 action 并衍生出新的 action 来对 store 进行操作。

  ```js
  import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
  import Api from '...'

  // worker Saga : 将在 USER_FETCH_REQUESTED action 被 dispatch 时调用
  function* fetchUser(action) {
    try {
        const user = yield call(Api.fetchUser, action.payload.userId);
        yield put({type: "USER_FETCH_SUCCEEDED", user: user});
    } catch (e) {
        yield put({type: "USER_FETCH_FAILED", message: e.message});
    }
  }

  /*
    在每个 `USER_FETCH_REQUESTED` action 被 dispatch 时调用 fetchUser
    允许并发（译注：即同时处理多个相同的 action）
  */
  function* mySaga() {
    yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
  }

  /*
    也可以使用 takeLatest 不允许并发，dispatch 一个 `USER_FETCH_REQUESTED` action 时，
    如果在这之前已经有一个 `USER_FETCH_REQUESTED` action 在处理中，
    那么处理中的 action 会被取消，只会执行当前的
  */
  function* mySaga() {
    yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
  }

  export default mySaga;
  ```

  **常见api**

  put 用于触发 action，call 用于调用异步处理逻辑，select 用于从 state 中获取数据。详情如下：

  - take(pattern) 在 Store 上等待指定的 action。在发起与 pattern 匹配的 action 之前，Generator 将暂停。

  - takeEvery(channel, saga, ...args) 在发起（dispatch）到 Store 并且匹配 pattern 的每一个 action 上派生一个 saga。也就是说，takeEvery 允许处理并发的 action，包括相同的action，但不保证顺序。其中，saga: Function: 为一个 Generator 函数。

    ```js
    import { takeEvery } from `redux-saga/effects`;

    function* watchFetchUser() {
      yield takeEvery('USER_REQUESTED', fetchUser);
    }

    /* code content */
    const takeEvery = (patternOrChannel, saga, ...args) => fork(function*() {
      while (true) {
        const action = yield take(patternOrChannel)
        yield fork(saga, ...args.concat(action))
      }
    });
    ```

  - takeLatest(channel, saga, ...args) 在发起到 Store 并且匹配 pattern 的每一个 action 上派生一个 saga，并自动取消之前所有已经启动但仍在执行中的 saga 任务。极速连续多次触发action，最终只有最后一次有效。

    ```js
    const takeLatest = (patternOrChannel, saga, ...args) => fork(function*() {
      let lastTask;
      while (true) {
        const action = yield take(patternOrChannel);
        if (lastTask) {
          yield cancel(lastTask);  /* 如果任务已经结束，cancel则是空操作 */
        }
        lastTask = yield fork(saga, ...args.concat(action))
      }
    });
    ```

  - call(fn, ...args) / call([context, fnName], ...args) 用来创建 effect 对象，被称作是 effect factory。以参数 args 调用函数。其中 fn 是一个 Generator 函数( yield )或者普通函数, apply(context, fn, [args])另一种写法。

    ```js
    const users = yield call(fetch, '/users'),
      repos = yield call(fetch, '/repos');  // 先后顺序执行，阻塞形式

    const [users, repos] = yield [
      call(fetch, '/users'),
      call(fetch, '/repos')
    ];  // 同步执行
    ```

  - put(action) 向 Store 发起一个 action。 这个 effect 是非阻塞型的，并且所有下游抛出的错误（例如在 reducer 中），都不会冒泡回到 saga 当中。 put.resolve(action)为阻塞型，返回了 promise，它将会等待其结果。

  - fork(fn, ...args) 用来命令 middleware 以 非阻塞调用 的形式执行 fn。

    ```js
    function* fetchData() {
      /* 等待 2 秒后，打印欢迎语（阻塞） */
      const greeting = yield call(fn);
      console.log('greeting: ', greeting);

      /* 立即打印 task 对象（非阻塞） */
      const task = yield fork(fn);
      console.log('task: ', task);
    }
    ```

* redux数据流竞态问题

  - 问题描述

    查看某用户的详情信息，偶遇网络堵塞，loading太久，用户返回主页并进入另一个用户的详情信息页面，这时上个详情请求刚好返回，就会展示上个用户的信息。

  - 解决方案

    + 判断store中的id和Promise的入参id是否相同

    + reducer中判断action带过来的id和url的id是否一致

    + redux-saga的 takeLatest 方法，新的action过来就会取消上一个

    + Rxjs中的switchMap方法，新的 action 会将老的 action 取消掉

  - 其他类似问题

    + 智能搜索，用户输入请求节流

    + 临时状态残留（dialog是否显示状态）

备注：侵图告之必删

参考资料

[redux异步中间件对比](https://juejin.im/post/59e6cd68f265da43163c2821)

[异步 Action](http://cn.redux.js.org/docs/advanced/AsyncActions.html)

[redux中间件原理](https://juejin.im/post/59dc7e43f265da4332268906)

[redux-saga中文文档](https://redux-saga-in-chinese.js.org/)