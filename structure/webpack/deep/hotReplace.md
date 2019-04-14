## HMR vs live reload

* live reload 监控文件的变化，然后通知浏览器端刷新页面。

  缺点：工具并不能够保存应用的状态（states），当刷新页面后，应用之前状态丢失。

  - 文件监听

    判断文件是否变化是通过不断地询问系统指定的文件有没有变化，也就是定时去获取这个文件的最后修改时间，并缓存最新的修改时间，用于下次对比是否变化。默认情况下webpack会询问1000次，可用`watchOptions.poll`参数配置次数。

    发送变化后，并不会立即通知监听者，而是先缓存起来，避免高频变化导致构建卡死，类似缓存批处理。默认情况下webpack会延迟300毫秒，可用`watchOptions.aggregateTimeout`参数配置延迟时间，来降低构建频率。

    默认情况下，webpack会从监听entry文件及其所有依赖的文件，监听文件过多会导致性能下降，因此，绝大部分情况下，可以配置忽略监听`node_modules`目录，一般情况下是不会去直接修改第三方模块的。

  - 自动刷新浏览器

    webpack负责监听文件的变化，devServer负责刷新浏览器。

    **常见自动刷新浏览器的方式**

    + 调用浏览器的扩展插件接口
    + 向页面注入代理客户端代码，通过客户端代码实现刷新
    + 向页面塞入一个iframe，刷新iframe实现刷新效果

    devServer支持后面两种方式，并且默认采用注入客户端代码方式。也就是，由代理客户端向devServer发起websocket连接。

* HMR 不会刷新浏览器，而是运行时对模块进行热替换，保证了应用状态不会丢失，提升了开发效率。

* HMR的工作原理：

  - 编译期间，通过EventSource为需要热更新的entry注入热更新代码

  - 页面首次打开，EventSouce建立通信，把下一次的hash返回给前端

  - 客户端获取到hash，作为下一次请求hot-update.js和hot-update.json的hash

  - webpack监听到变化，然后重新编译，并发送build的消息给客户端

  - 客户端创建hot-update.js的脚本插入主文档

  - 插入成功后，执行hotAPI的createRecord和reload方法，重新render组件，页面无刷新更新DOM