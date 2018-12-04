## react-redux

  > redux本身是个非常纯粹的状态管理库，需要通过react-redux这个库的帮助来管理react的状态。
  
  Redux 的作者封装了一个 React 专用的库 React-Redux。React-Redux 将所有组件分成两大类：UI 组件（presentational component）和容器组件（container component）。
  
  **React-Redux 规定，所有的 UI 组件都由用户提供，容器组件则是由 React-Redux 自动生成。也就是说，用户负责视觉层，状态管理则是全部交给它。**

  * UI组件(纯组件)的特征

    - 只负责 UI 的呈现，不带有任何业务逻辑
    
    - 没有状态（即不使用this.state这个变量）
    
    - 所有数据都由参数（this.props）提供
    
    - 不使用任何 Redux 的 API

  * 容器组件的特征
    
    - 负责管理数据和业务逻辑，不负责 UI 的呈现
    
    - 带有内部状态
    
    - 使用 Redux 的 API

### 常见概念

  * Provider是一个普通组件，也是一个代理模式实现的高阶组件，可以作为顶层app的分发点，它只需要store属性就可以了。它会将state分发给所有被connect的组件，不管它在哪里，被嵌套多少层。一般的做法是，Provider在根组件外面包了一层，这样一来，所有子组件就默认都可以拿到state了。其过程就是，接收 redux 生成的 store 做参数后，通过上下文 context 将 store 传递进被代理组件。
  
  Provider的原理是React组件的context属性，getChildContext传递给子组件对应属性。注意：如果 contextTypes 没有定义， context 将是一个空对象。

  * connect是真正的重点，它是一个科里化函数，也就是一个代理模式实现的高阶组件，意思是先接受两个参数（数据绑定mapStateToProps和事件绑定mapDispatchToProps），再接受一个参数（将要绑定的组件本身）

    - mapStateToProps：负责输入逻辑，即将state映射到 UI 组件的参数（props）。构建好Redux系统的时候，它会被自动初始化，但是你的React组件并不知道它的存在，因此你需要分拣出你需要的Redux状态，所以你需要绑定一个函数，它的参数是state，简单返回你关心的几个值。

    传入mapStateToProps之后，会订阅store的状态改变，在每次store的state发生变化的时候，都会被调用。

    ```js
    const mapStateToProps = (state, ownProps) => {
      return {
        active: ownProps.filter === state.visibilityFilter
      }
    }
    ```

    - mapDispatchToProps：负责输出逻辑，即将用户对 UI 组件的操作映射成 Action。声明好的action作为回调，也可以被注入到组件里，就是通过这个函数，它的参数是dispatch，通过redux的辅助方法bindActionCreator绑定所有action以及参数的dispatch，就可以作为属性在组件里面作为函数简单使用了，不需要手动dispatch。这个mapDispatchToProps是可选的，如果不传这个参数redux会简单把dispatch作为属性注入给组件，可以手动当做store.dispatch使用。

    ```js
    action.increase = function (info) {
      return {
        {
          type:'INCREASE'，
          info
        }
      }
    }

    const mapDispatchToProps = (dispatch, ownProps) => {
      return {
        increase: (...args) => dispatch(actions.increase(...args)),
        decrease: (...args) => dispatch(actions.decrease(...args))
      }
    }
    ```

### 案例

  ```jsx
  import { connect } from 'react-redux'

  const VisibleTodoList = connect(
    mapStateToProps,
    mapDispatchToProps
  )(TodoList)
  ```