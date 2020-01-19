## react-router-redux

Redux用来管理应用状态（state），React Router用来管理路由。react-router-redux则用来协调和同步state和router。

* 实现原理

对router的history进行升级强化，让history中的变化直接映射到state中；

```js
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import reducers from '<project-path>/reducers'

// Add the reducer to your store on the `routing` key
const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  })
)

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    { /* Tell the Router to use our enhanced history */ }
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="foo" component={Foo}/>
        <Route path="bar" component={Bar}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('mount')
)
```

* 结合Immutable

- 默认情况下，期望能在state.routing中找到state历史记录。如果wrapper阻止直接访问属性，或者您希望将路由状态放在其他位置，则通过syncHistoryWithStore上的selectLocationState选项传递选择器函数来访问历史状态。

- 提供您自己的reducer函数，该函数将接收LOCATION_CHANGE类型的操作，并将合并的有效负载返回到路由状态的locationBeforeTransitions属性。 例如：`state.set("routing", { locationBeforeTransitions: action.payload })`。