## React-router4

> React-router4 本次采用单代码仓库模型架构（monorepo），这意味者这个仓库里面有若干相互独立的包。

* react-router React Router 核心

* react-router-dom 用于 DOM 绑定的 React Router，相比react-router多了<Link> <BrowserRouter> 这样的 DOM 类组件。

  - BrowserRouter 使用了 HTML5 history API 的高阶路由组件，保证你的 UI 界面和 URL 保持同步。

    + basename:string, 为所有位置添加一个基准Path

      ```js
      <BrowserRouter basename="/minooo" />
      <Link to="/react" />  // 渲染为 <a href="/minooo/react">
      ```

    + getUserConfirmation: func, 导航到此页面前执行的函数

    + forceRefresh: bool, 当浏览器不支持 HTML5 的 history API 时强制刷新页面。

      ```js
      const supportsHistory = 'pushState' in window.history
      <BrowserRouter forceRefresh={!supportsHistory} />
      ```

    + keyLength: number, 设置它里面路由的 location.key 的长度。默认是6。（key的作用：点击同一个链接时，每次该路由下的 location.key都会改变，可以通过 key 的变化来刷新页面。）

    BrowserRouter模式需求后端服务器配合，如nginx设置rewrite，如webpack-dev-server服务设置historyApiFallback配置。

  - Route 当页面的访问地址与 Route 上的 path 匹配时，就渲染出对应的 UI 界面。Route自带三个render method。每种 render method 都有不同的应用场景，同一个<Route> 应该只使用一种 render method ，大部分情况下你将使用 component 。

    + <Router component>

      - component 只有当访问地址和路由匹配时，一个 React component 才会被渲染，此时此组件接受 route props (match, location, history)。

        ```js
        <Route path="/user/:username" component={User} />
        const User = ({ match }) => {
          return <h1>Hello {match.params.username}!</h1>
        }
        ```

      - path: string, 任何可以被 path-to-regexp解析的有效 URL 路径

      - exact: bool, 是否精准匹配

      - strict: bool, 斜杠严格匹配。若为true，path 为 '/one/' 将不能匹配 '/one' 但可以匹配 '/one/two'。
    
    + <Router render>

    + <Router children>

  - Link 导航

    + to: object/string, object方式适用于携带参数跳转到指定路径

    + replace: bool, 为true时，后退无此记录

  - NavLink 有激活状态的导航

    + activeClassName，默认样式名：active

    + activeStyle:object

      ```js
      <NavLink to="/about" activeClassName="active" activeStyle={{ color: 'green', fontWeight: 'bold' }}>MyBlog</NavLink>
      ```
    
    + exact: bool, 是否精准匹配时才激活样式

    + strict: bool, 斜杠严格匹配时才激活样式

    + isActive: func, 导航激活的回调函数

  - Switch 只渲染出第一个与当前访问地址匹配的 <Route> 或 <Redirect>。

    ```js
    <Fade>
      <Switch>
        {/* 用了Switch 这里每次只匹配一个路由，所有只有一个节点。 */}
        <Route/>
        <Route/>
      </Switch>
    </Fade>
    ```

  - Redirect 渲染时将导航到一个新地址，这个新地址覆盖在访问历史信息里面的本该访问的那个地址。

    + to: string/object, 字符串或者location 对象

    + push: bool, 若为真，重定向操作将会把新地址加入到访问历史记录里面，并且无法回退到前面的页面。

    + from: string, 需要匹配的将要被重定向路径

  - Prompt 当用户离开当前页面前做出一些提示。

    + message: string/func, 提示信息或者参数为location对象的回调函数

    + when: bool, 通过设置一定条件要决定是否启用 Prompt

* react-router-native 用于 React Native 的 React Router

* react-router-redux React Router 和 Redux 的集成

* react-router-config 静态路由配置的小助手

## 对象和方法

* history history对象是可变的，因为建议从 <Route> 的 prop 里来获取 location，而不是从 history.location 直接获取。这样可以保证 React 在生命周期中的钩子函数正常执行。另外，history实现分为三种：

  - browser history
  - hash history
  - memory history

  history的属性和方法：

  - length, 浏览历史堆栈的条数
  - action, 跳转到当前页面的动作：push,replace,pop
  - state, 执行push(path, state)操作时，location的state将被提供到堆栈信息里，state只有在browser和 memory history 有效。
  - block(prompt) 阻止跳转

* location 位置信息，在Route component中，以this.props.location获取, 在Route render/children中，以({location}) => ()方式获取.

  location 对象不会发生改变，因此可以在生命周期的回调函数中使用 location 对象来查看当前页面的访问地址是否发生改变。这种技巧在获取远程数据以及使用动画时非常有用。

  ```js
  {
    key: 'sdfad1'
    pathname: '/about',
    search: '?name=minooo'
    hash: '#sdfas',
    state: {
      price: 123
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      // 已经跳转了！
    }
  }
  ```

* match
  match 对象包含了 <Route path> 如何与 URL 匹配的信息，在Route component中，以this.props.match, 在Route render/children中，以 ({match}) => ()方式获取。具有以下属性：

  - params: object 路径参数，通过解析 URL 中的动态部分获得键值对
  - isExact: bool 为 true 时，整个 URL 都需要匹配
  - path: string 用来匹配的路径模式，用于创建嵌套的 <Route>
  - url: string URL 匹配的部分，用于嵌套的 <Link>

