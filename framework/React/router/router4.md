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

    + isActive: func, 

* react-router-native 用于 React Native 的 React Router

* react-router-redux React Router 和 Redux 的集成

* react-router-config 静态路由配置的小助手
