## redux

[redux中文文档](http://cn.redux.js.org/index.html)

* 定义

    > Redux 是为 Javascript 应用而生的可预估的状态容器.应用中所有的 state 都以一个对象树的形式储存在一个单一的 store 中。惟一改变 state 的办法是触发 action，一个描述发生什么的对象。为了描述 action 如何改变 state 树，你需要编写 reducers。

    ![reducer](./images/reducer.png)

* redux几个概念

    - store: 应用数据的存储中心，由 Redux 的 createStore(reducer) 生成

    - state: 通过 store.getState() 获取，本质上一般是一个存储着整个应用状态的对象

    - action: 应用数据的改变的描述, 本质上是一个包含 type 属性的普通对象，由 Action Creator (函数) 产生，改变 state 必须 dispatch 一个 action

    - reducer: 决定应用数据新状态的函数，接收应用之前的状态和一个 action 返回数据的新状态，reducer作为一个函数，可以根据web应用之前的状态（previousState）和交互行为（通过flux中提到的action来表征），决定web应用的下一状态（newState），从而实现state端的数据更新处理。本质上是根据 action.type 来更新 state 并返回 nextState 的函数，“更新” 并不是指 reducer 可以直接对 state 进行修改。Redux 规定，须先复制一份 state，在副本 nextState 上进行修改操作

    ```
    /** 本代码块记为 code-7 **/
    var initState = {
      counter: 0,
      todos: []
    }

    function reducer(state, action) {
      // ※ 应用的初始状态是在第一次执行 reducer 时设置的 ※
      if (!state) state = initState

      switch (action.type) {
        case 'ADD_TODO':
          var nextState = _.cloneDeep(state) // 用到了 lodash 的深克隆
          nextState.todos.push(action.payload)
          return nextState

        default:
        // 由于 nextState 会把原 state 整个替换掉
        // 若无修改，必须返回原 state（否则就是 undefined）
          return state
      }
    }
    ```

    - middleware: redux 提供中间件的方式，完成一些 flux 流程的自定义控制，同时形成其插件体系

* redux的原则

    - 单一的store

      区别于 flux 模式中可以有多个 state，整个应用的数据以树状结构存放在一个 state 对象中。

    - state 只读

      state 包含的应用数据不能随意修改，修改数据的唯一方式是 dispatch action，action 描述要修改的信息.

* 比较react

  a. 需要回调通知state (等同于回调参数) -> action  

  b. 需要根据回调处理 (等同于父级方法) -> reducer  

  c. 需要state (等同于总状态) -> store  

  - React有props和state: props意味着父级分发下来的属性，state意味着组件内部可以自行管理的状态，并且整个React没有数据向上回溯的能力，也就是说数据只能单向向下分发，或者自行内部消化。

  - React根本无法让两个组件互相交流，使用对方的数据。解决的唯一办法就是提升state，将state放到共有的父组件中来管理，再作为props分发回子组件。

  - 子组件改变父组件state的办法只能是通过onClick触发父组件声明好的回调，也就是父组件提前声明好函数或方法作为契约描述自己的state将如何变化，再将它同样作为属性交给子组件使用。

  - 为了面临所有可能的扩展问题，最容易想到的办法就是把所有state集中放到所有组件顶层，然后分发给所有组件。这就是redux诞生的背景

* 高阶组件

  - 由原始组件创造一个新的组件并且扩展它的行为。


  ```
  // MyComponent 是纯的 UI 组件
  <div className="index">
    <p>{this.props.text}</p>
    <input
      defaultValue={this.props.name}
      onChange={this.props.onChange}
    />
  </div>


  const App = connect(
    mapStateToProps,
    mapDispatchToProps
  )(MyComponent);

  // mapStateToProps: 定义 UI 组件参数与 State 之间的映射
  // mapDispatchToProps：定义 UI 组件与 Action 之间的映射

  function reducer(state = {
    text: '你好，访问者',
    name: '访问者'
  }, action) {
    switch (action.type) {
      case 'change':
        return {
          name: action.payload,
          text: '你好，' + action.payload
        };
    }
  }

  const store = createStore(reducer);

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.body.appendChild(document.createElement('div'))
  );

  // Store由 Redux 提供的createStore方法生成，该方法接受reducer作为参数。
  // 为了把Store传入组件，必须使用 Redux 提供的Provider组件在应用的最外面，包裹一层。
  ```
