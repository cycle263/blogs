## flux开发思维

  > Flux 是一种架构思想，专门解决软件的结构问题。(state, action) => state

![flux流程](./images/flux.png)

* Flux 提供了一种非常清晰的方式来存储和更新应用状态，并且只会在必要的时候才触发页面渲染。Flux 致力于应用的全局状态管理。

*  假设我们正在构建一个网站应用，那么这个网站应用会由什么组成呢？

  - 1) 模板/HTML = View

  - 2) 填充视图的数据 = Model

  - 3) 获取数据、将所有视图组装在一起、响应用户事件、数据操作等等的逻辑 = Controller

* flux的组成呢？

  - Model 看起来像 Store

  - 用户事件、数据操作以及它们的处理程序看起来像"action creators" -> action -> dispatcher -> callback

    举一个例子，获取数据是一个 action，一个点击是一个 action，一个 input 变化也是一个 action 等等

  - View 看起来像 React view (或者其它类似的概念)
