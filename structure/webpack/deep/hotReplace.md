## HMR vs live reload

* live reload 监控文件的变化，然后通知浏览器端刷新页面。缺点：工具并不能够保存应用的状态（states），当刷新页面后，应用之前状态丢失。

* HMR 不会刷新浏览器，而是运行时对模块进行热替换，保证了应用状态不会丢失，提升了开发效率。

* HMR的工作原理：

  - 编译期间，通过EventSource为需要热更新的entry注入热更新代码

  - 页面首次打开，EventSouce建立通信，把下一次的hash返回给前端

  - 客户端获取到hash，作为下一次请求hot-update.js和hot-update.json的hash

  - webpack监听到变化，然后重新编译，并发送build的消息给客户端

  - 客户端创建hot-update.js的脚本插入主文档

  - 插入成功后，执行hotAPI的createRecord和reload方法，重新render组件，页面无刷新更新DOM