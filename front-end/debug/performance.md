## chrome性能分析

* Heap snapshot 内存快照

  - Constructor 显示所有的构造函数，点击每一个构造函数可以查看由该构造函数创建的所有对象。

  - Distance 显示通过最短的节点路径到根节点的距离。

  - shallow size 对象本身内存占用，不包括引用对象。

  - retained size 当前对象大小，加上直接和间接引用的对象大小。换言之，就是GC此对象，能从heap中释放的内存大小。

* Allocation instrumentation on timeline  （时间轴上的分配工具）

* Allocaiton sampling (分配样本)

* DevTools Audits （审计）

  - Performance (性能)

    Metrics： 各类性能指标

    + First meaningful paint      首次有效绘制
    + First interactive (beta)    首次交互
    + Consistently interactive (beta)   持续交互
    + Perceptual speed index      速度指数
    + Estimated input latency     输入延迟

    Opportunities： 可优化项

    + Reduce render-blocking stylesheets    较少阻塞渲染的样式和脚本
    + Unused CSS rules      未用到的css

  - PWA

    检查网页对于PWA的兼容性。

    Does not register a service worker      没有注册service worker
    Does not respond with a 200 when offline      离线没有响应200
    uses HTTPS    使用了https
    User will not be prompted to install the app  

  - Accessibility (辅助功能)

    辅助功能指的是那些可能超出“典型”用户范围之外的用户的体验，例如：人道主义功能

  - Best practice （最佳实践）

    - Avoids document.write()   避免使用document.write

  - SEO (搜索引擎优化)

    - Page is mobile friendly
    - Document does not have a meta description

* 火焰图

- y 轴表示调用栈，每一层都是一个函数。调用栈越深，火焰就越高，火焰尖就是正在执行的函数，上方都是它的父函数。

- x 轴表示时间轴u，如果一个函数在x轴占据的宽度越宽，就表示它执行的时间长。

### 参考资料

[读懂火焰图](http://www.ruanyifeng.com/blog/2017/09/flame-graph.html)