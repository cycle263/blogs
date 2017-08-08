## 岗位考察
* react生命周期？组件之间通信(订阅发布)？数据模型(redux、flux、reselect)？react适合什么项目? **虚拟DOM和diff算法原理(按需更新，分层比较)？**  一个基于state和props的组件渲染函数，state是自己的，props是外面引入的，变化就重新渲染。setState实现(存入pending队列，判断是否处于batch update，为何不是实时的？类组件和函数式组件选择？循环组件需要用key?)
* 在浏览器中输入url到页面内容全部显示？html文档解析过程？Get vs Post(历史记录和日志)  
  从上至下，从外至内。url -> 域名解析 -> 服务器返回HTML响应 -> 浏览器展示html -> css/img/script响应 -> 异步ajax响应
* ES6有哪些新特性？ES6 module可否做到按需加载？(stage3: dynamic import) ？箭头函数的作用域？babel转码的实现原理？
  实现promise(new Promise直接执行，then在当前tick的最后，但还在当前tick中)? aynsc和await
* commonJS和AMD规范区别？和ES6的模块有什么不同？（[Detail](../../structure/README.md)）

## 前端技术具体考察点
* 清除浮动的几种方法？行内元素和块元素区别？盒模型、选择器优先级？**BFC(块级格式化上下文)?** 布局方式？iframe的优缺点(阻塞主页面的Onload事件,并行加载限制)？重构和回流、重绘(重新计算元素的几何大小和位置)？css3动画？避免无样式内容闪烁(样式加载晚于HTML，或者出现多个不同位置覆盖的样式)?
* 字面量式函数和声明式函数的区分？原型继承vs类继承？(灵活，接口，抽象类) 闭包的理解、优缺点？this对象？原型链？作用域？**变量声明提升？** Ajax跨域(jsonp, 动态script, iframe, window.name, postMessage, cors2, 代理服务器)？websocket vs http?(有并集) webworker?(后台运行) storage? **冒泡和捕获?** bind操作? new操作? IIFE(http协议标准、json标准)?js垃圾回收：标记清除和引用计数？++i vs i++? **setTimeout里面运行的函数的作用域this指向?** 异步编程(执行栈、消息队列)？严格模式的好处(意外全局变量，this自动转换，重复定义)？Function.prototype.call vs apply？
* **事件代理的原理？** jQuery的事件绑定方式(on/bind)？$(window).load>$.fn.ready=DOMContentLoaded事件，$冲突(noConflict)？sizzle选择器?detach vs remove(事件和data)？为什么存在prop方法(html属性attribute和dom对象属性property)？.get() vs [] vs eq() - jq ?
* **js中不可以直接使用【下标方式】修改字符串内容？** 不可以，原因使用下标访问时，只是临时创建的array对象
* canvas、svg区别和各自特点，分别适合什么场景？canvas绘制边缘不够平滑？怎么绘制1像素宽的直线？canvas用css方式放大？
  Canvas适合像素处理，动态渲染和大数据量绘制, SVG是一整套独立的矢量图形语言，适合静态图片展示，高保真文档查看。

## 框架类库和工程化
* 常见的前端优化措施：合并压缩，雪碧图，按需加载，惰性加载，减少请求，网页Gzip，CDN托管，data缓存，图片服务器，减少DOM操作，模块化
* 熟悉的设计模式：订阅模式、工厂模式，单例模式，流行的mvc，mvvc，mv*架构模式，REST API vs GraphQL(Apollo-请求多组数据)
* 比较风靡的前端框架react, angular(脏检查机制、双向绑定, $digest), vue, backbone等，常见的模板引擎jade、velocity等
* angular数据绑定机制？不同团队整合angular应用？依赖注入？ng-repeat迭代数组中的相同值会怎样？(track by $index)ng-click中能写js原生对象方法吗？factory、service、provider什么关系？
* vue 双向绑定(dom监听，data监听)？遇到过vuejs页面闪烁吗？v-if vs v-show区别(是否渲染)？
* 可视化：d3.js、echart(canvas)、highchart(svg)、Three.js(基于D3)、highstock、EaselJS、flv.js，如何技术选型？优缺点
* **组件划分粒度？** 对前端工程进行流程化开发，对前端GUI软件编译合并打包，gulp、grunt、webpack等构建工具各自优缺点，nginx的combo技术，相比grunt而言，gulp容易上手，基于stream,管道拼接多个tash; webpack提供模块化解决方案，支持es6写法的预编译解决方案  
* **组件化/模块化，组件化诉求复用(更多关注UI)，模块化诉求解耦(关注数据和功能封装)，组件接口设计**

## 其他加分技能
* 前端安全：sql注入? XSS(跨站脚本攻击->输入特殊字符转义过滤)? CSRF(跨站请求伪造->表单增加hash值，POST更新)？同源策略？
* 无缝发布部署，相关文件的先后发布顺序，灰度发布(小范围)，平稳升级，错误监控和分析，安全性监控？自动化测试？
* 擅长一门后端，如nodejs(事件驱动-无阻塞)，关系型数据库和非关系型数据库，函数式编程，栈和队列区别、堆，多媒体前端经验，网络协议，http2等
* 做过什么提高开发效率的工作？(包括团队)？如何降低项目的后期的维护成本？前端人员如何提高运营人员更强的支持力度？比较难的技术问题?
* 有没有做过开源项目？有没有blog和github项目？最近在学什么？接下来半年打算学习什么？每天花多长时间学习？豁然开朗的知识点？开发过程中遇到的最大难点？
* **沟通能力：与ued分歧，前后端交互效率？发布前发现bug如何处理？作为前端对于公司最大的价值贡献？相比其他前端的优势？**
