## dva

* 背景

使用React技术栈管理大型复杂的应用往往要使用Redux来管理应用的状态，然而随着深度使用，Redux也暴露出了一些问题。如编写页面配套（action、reducer）过于繁琐、复杂，组件之间耦合较深、不够扁平化、调用action creator发起动作破坏action纯洁性且必须层层传递等。

* 用途

dva 帮你自动化了Redux 架构一些繁琐的步骤，比如上面所说的redux store 的创建，中间件的配置，路由的初始化等等,没有什么魔法，只是帮你做了redux + react-router + redux-saga 架构的那些恶心、繁琐、容易出错的步骤，只需写几行代码就可以实现上述步骤，它解决了背景所说的所有缺点。

dva其实就是把之前Redux每个路由下的state、reducer、sagas写到一块去了，做了写到一块去也能做到以前redux能做的事，并且让思路变得很清晰。

* 机制

它的核心是提供了app.model方法，用于把 reducer, initialState, action, saga 封装到model层。

* Subscription

Subscription 语义是订阅，用于订阅一个数据源，然后根据条件 dispatch 需要的 action。数据源可以是当前的时间、服务器的 websocket 连接、keyboard 输入、geolocation 变化、history 路由变化等等。

![dva流程](../../images/dva.jpeg)


### 参考资料

[dva介绍](https://dvajs.com/guide/introduce-class.html#app-model)

