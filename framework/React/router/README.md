## router

![路由流程](./images/router.jpg)
```js
import React from 'react';
import { render, findDOMNode } from 'react-dom';
import { Router, Route, Link, IndexRoute, Redirect } from 'react-router';
import { createHistory, createHashHistory, useBasename } from 'history';

// 此处用于添加根路径
const history = useBasename(createHashHistory)({
  queryKey: '_key',
  basename: '/blog-app',
});

React.render((
  <Router history={history}>
    <Route path="/" component={BlogApp}>
      <IndexRoute component={SignIn}/>
      <Route path="signIn" component={SignIn}/>
      <Route path="signOut" component={SignOut}/>
      <Redirect from="/archives" to="/archives/posts"/>
      <Route onEnter={requireAuth} path="archives" component={Archives}>
        <Route path="posts" components={{
          original: Original,
          reproduce: Reproduce,
        }}/>
      </Route>
      <Route path="article/:id" component={Article}/>
      <Route path="about" component={About}/>
    </Route>
  </Router>
), document.getElementById('example'));
```

* react-router

  > React Router 保持 UI 与 URL 同步。它拥有简单的 API 与强大的功能例如代码缓冲加载、动态路由匹配、以及建立正确的位置过渡处理。

* 组成部分

  - Router: 它的history对象是整个路由系统的核心，它暴露了很多属性和方法在路由系统中使用

  - Route: path 属性表示路由组件所对应的路径，可以是绝对或相对路径，相对路径可继承；onEnter 钩子将用于在渲染对象的组件前做拦截操作，比如验证权限；可以使用 component 指定单个组件，或者通过 components 指定多个组件集合；

  - Redirect: 是一个重定向组件，有 from 和 to 两个属性；

  - state: location.state, 共享数据

  - param: 通过 /:param 的方式传递

  - Link: 组件最终会渲染为 HTML 标签 <a>，它的 to、query、hash 属性会被组合在一起并渲染为 href 属性。虽然 Link 被渲染为超链接，但在内部实现上使用脚本拦截了浏览器的默认行为，然后调用了history.pushState 方法

* 分类

  - BrowserRouter  使用了HTML5的history API来记录你的路由历史

  - HashRouter  使用URL(window.location.hash)的hash部分来记录
  
  - MemoryRouter node环境下的history，存储在memory中
  
* [按需加载](https://react-guide.github.io/react-router-cn/docs/guides/advanced/DynamicRouting.html)

[基于路由的按需加载](https://react.docschina.org/docs/code-splitting.html)