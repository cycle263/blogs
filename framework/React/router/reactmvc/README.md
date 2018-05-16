## reactmvc

* action

  action，唯一能改变state的方法就是触发action，此系统的action包含了UIModel的两个动作get/set和dataModel的call/remove，默认包含loadProps方法，是组件初始化渲染所有数据的实现方法。另外，需要注意的坑点：

  - uiModel.set操作避免覆盖，指定要叶子节点 uiModel.set('materialDetail.comment.page', page);  (推荐写法)
  
  - dataModel数据更新只需要清空对应数据缓存（dataModel.remove）, query要保持一致,包括顺序(Symbol)

* model

  Model分为dataModel和uiModel，便于区分服务端数据和本地UI数据，并且都是基于immutablejs。dataModel 实现服务端数据接口的数据交互，uiModel 是本地 UI 数据集合。具体参见src/model目录下的data-route和ui-route。

* view

* other

  - asyncProps

    配合 React-router 实现异步渲染，先异步获取组件所需数据，然后再渲染组件。

    + param: Route的path属性对应的字段值

    + location: react-router中的hashHistory
