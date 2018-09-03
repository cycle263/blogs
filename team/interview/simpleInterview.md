```js
Introduction -> ES 6、JavaScript -> React|Vue|Angular 
-> Webpack|Gulp -> Http|WebSocket
```

## 前端基础

* **CSS** 高度塌陷的原因？清除浮动的几种方法？行内元素和块元素区别？盒模型、选择器优先级？外边距叠加(空元素, 普通流相邻，父元素无内边距和边框)? 什么是 FOUC (无样式内容闪烁)？你如何来避免 FOUC？BFC(块级格式化上下文)? css像素和设备像素区别？ 布局方式(双飞翼、圣杯、弹性、格栅、浮动、瀑布流、响应式)？上下垂直居中方案？重构和回流、重绘(重新计算元素的几何大小和位置)？多个行内元素之间出现间距的原因？两个行内元素一个有内容一个没有就会出现错位的原因？css3动画？避免无样式内容闪烁(样式加载晚于HTML，或者出现多个不同位置覆盖的样式)? 渐进增强和优雅降级? inline-block之间为何有间隙？

* **ES6** 熟悉哪些新特性？箭头函数(是否有arguments, 是否有自身的this对象和上下文, call能否覆盖箭头函数this, 不能用作构造函数，this指向创建时的上下文)？实现promise(fulfilled、rejected 或 pending, 状态不可逆转，易读可并行异步请求)? Promise、generator、async/await 的原理解释？let vs const vs var(作用域级别，变量声明提升，重复声明, const内存地址不可变，对象属性可变)? file文件转换成arrayBuffer或者Blob，base64String, Float32Array, DataView? 解构赋值和扩展运算符，rest属性(解构赋值...放在最后一位)剩余变量？ Generator 和 Iterator(生成器和迭代器)? Module和import, export? proxy? ES 6模块和commonjs模块的区别(值的引用 vs 值的拷贝，编译时输出 vs 运行时加载, 符号链接-只读 vs module.exports)？ ES 7中的decorator-装饰器(@withHeader)？

* 字面量式函数和声明式函数的区别？(声明提升-not function) script defer(渲染完再按顺序执行) vs async(下载完就执行)? 原型继承 vs 类继承？(灵活，接口，抽象类) 怎么理解异步编程？立即执行函数（IIFE）作用？context vs scope vs this? 词法作用域(静态，不可变) vs 动态作用域(动态)? 闭包的理解、优缺点？this对象？原型链(顶端在哪)？作用域？变量声明提升？FormData提交的数据分为哪几部分? 事件冒泡和事件捕获，事件委托? 宿主对象(window,global,xmlhttprequest) vs 原生对象(String,Math,Array等)？setTimeout里面运行的函数的作用域this指向? setTimeout vs setInterval?  事件代理的原理？节流(固定时间段执行一次)和防抖(未到延迟时间，重新计时)？钩子函数vs回调函数vs高阶函数？怎么理解高阶函数？(将函数当做参数传递，并返回新函数) 柯里化函数 vs 高阶函数(柯里化函数一定是高阶函数，反之不一定)？

* Ajax跨域(jsonp, 动态script, iframe, window.name, postMessage, cors2, 代理服务器)？ webworker?(后台运行) localStorage vs sessionStorage? bind操作? new操作? IIFE(http协议标准、json标准)?js垃圾回收：标记清除和引用计数？异步编程(执行栈、消息队列)？严格模式的好处(意外全局变量，this自动转换，重复定义，无function.caller和function.arguments)？Function.prototype.call vs apply？iframe的优缺点(阻塞主页面的Onload事件,并行加载限制)？js中不可以直接使用【下标方式】修改字符串内容？js语句结束加分号吗？ 不可以，原因使用下标访问时，只是临时创建的array对象。++i vs i++?

* canvas、svg区别和各自特点，分别适合什么场景？canvas绘制边缘不够平滑？怎么绘制1像素宽的直线？canvas用css方式放大？Canvas适合像素处理，动态渲染和大数据量绘制, SVG是一整套独立的矢量图形语言，适合静态图片展示，高保真文档查看。

## 框架类库

* **react**生命周期？数据模型(redux、flux、Mobx、reselect)-什么场景适用？无状态函数组件(纯函数)，及其优势? react适合什么项目? redux的三大原则？redux的缺陷(临时状态，数据库vs状态管理，扁平化，数据庞大)？redux中间件（saga, thunk）？组件之间通信(订阅发布)？jsx语法？虚拟DOM和diff算法原理(按需更新，分层比较, 同层按key比较)？setState实现(存入pending队列，判断是否处于batch update，为何不是实时的(异步? - 在React控制之外的情况-setTimeout、event，setState会同步更新)？) 类组件和函数式组件选择？展示组件和容器组件？受控组件和非受控组件？循环组件需要用key(diff, unique)? 为什么不建议使用index作key(只是顺序变动)? react合成事件和js原生事件区别(冒泡到document)？如何阻止原生事件的冒泡？(避免原生事件与React事件混用，或者通过target进行判断, e.nativeEvent.stopImmediatePropagation) shouldComponentUpdate什么场景适用(手动判断是否render)？refs 的作用？调和算法Fiber? 如何保持父子组件之间的松耦合？组件数属性传递(context)？优化手段有哪些？React.Children作用（自动传递给包含着它的组件）? 高阶组件(属性代理方式-新旧props一起传递，反向继承方式-继承包裹组件)？高阶组件的主要功能是封装并抽离组件的通用逻辑，让此部分逻辑在组件间更好地被复用。

* angular 双向绑定机制 -> 脏检查机制 (digest流程-->检查所有watcher) 不同团队整合angular应用？依赖注入？ng-repeat迭代数组中的相同值会怎样？(track by $index)ng-click中能写js原生对象方法吗？factory、service、provider什么关系？zone.js（猴子补丁，异步任务之间进行持久性传递，异步任务都将运行在global.zone的上下文中）

* vue 双向绑定(dom监听 + data监听 -> 访问器属性劫持)？模板语法，遇到过vuejs页面闪烁吗？v-if vs v-show区别(是否渲染)？vue 虚拟DOM和react 虚拟DOM的区别? 有哪些生命周期钩子函数？ 

* jQuery的事件绑定方式(on/bind)？$(window).load>$.fn.ready=DOMContentLoaded事件，$冲突(noConflict)？sizzle选择器?detach vs remove(事件和data)？为什么存在prop方法(html属性attribute和dom对象属性property)？.get() vs [] vs eq() - jq ? input标签的onchange事件怎么触发？输入后触发使用jquery的input事件。

* 可视化：d3.js、echart(canvas)、highchart(svg)、Three.js(基于D3)、highstock、EaselJS、flv.js，如何技术选型？优缺点

## 前端工程化

* **webpack**打包原理？插件的基本原理？webpack缓存可能存在的坑（精准缓存），解决方案？（构建hash化实现久缓存）webpack代码分隔？webpack性能优化手段？(tree shaking,scope hoisting,Code Splitting,Long-term caching) 编译出的文件过大怎么办，速度过慢怎么办？多页面可能存在的坑（跨路由跳转，传参），解决方案？webpack打包时，模块循环引用会发生什么后果(导出匿名方法)？webpack中的require.ensure什么作用？webpack为毛难用？(文档不完善，过于依赖插件，配置繁琐) 

* gulp、grunt、webpack等构建工具各自优缺点，相比grunt而言，gulp容易上手，基于stream,管道拼接多个tash; webpack提供模块化解决方案，支持es6写法的预编译解决方案。  

* 常用的页面性能指标？用什么工具来测试这些指标？常见的前端优化措施：合并压缩，雪碧图，按需加载，惰性加载，减少请求，网页Gzip，CDN托管，data缓存资源缓存，图片服务器，减少DOM操作，模块化等。 怎么理解组件化/模块化，组件化诉求复用(更多关注UI)，模块化诉求解耦(关注数据和功能封装)，组件接口设计，组件划分粒度？怎么绕开防盗链？babel转码的实现原理？commonJS和AMD规范区别？和ES6的模块有什么不同？

* 理想的前端开发和部署流程？（对前端工程进行流程化开发，nginx的combo技术，对前端GUI软件编译合并打包）无缝发布部署，先部署页面还是资源？非覆盖式更新，灰度发布(全量发布)，错误监控和分析，安全性监控？自动化测试框架（mocha）？SPA(单页面)优势？（减少请求，减少页面刷新，更适合多端） 版本控制系统(svn、git)? 

## 全面性考察
* 浏览器内核一般包括哪些线程？在浏览器中输入url到页面内容全部显示？html文档解析过程？Get vs Post(历史记录和日志，参数容量限制)  
  从上至下，从外至内。url -> 域名解析 -> ip地址和端口，建立TCP连接 -> 服务器返回HTML响应 -> 浏览器展示html -> css/img/script响应 -> 异步ajax响应

* 前端安全：sql注入? XSS(跨站脚本攻击->输入特殊字符转义过滤)? CSRF(跨站请求伪造->表单增加hash值，POST更新)？同源策略？

## 加分技能

* **http**协议？websocket vs http?(有并集, 相互推送信息，数据的传输使用帧来传递，并且允许跨域通信) 如何基于http协议建立一个长连接？浏览器缓存种类、区别与使用细节？post请求是否可以网络缓存？http 304状态码？协商缓存（etag、last-modified）与强制缓存（cache-control、expires）的区别在于强制缓存不需要访问服务器，返回结果是200，协商缓存需要访问服务器，如果命中缓存的话，返回结果是304。https加密的原理？http请求的幂等性（get,delete,put幂等，post不满足）？

* 熟悉的设计模式：订阅模式、观察者模式、工厂模式，单例模式; 流行的mvc，mvvc，mv*架构模式；接口的设计：REST API vs GraphQL(Apollo-请求多组数据)；其他脚本语言：typescrpt?  编码格式，字节码等： encodeURI vs escape(utf-8 vs unicode)？ASCII、Unicode、GBK、UTF-8之间的关系？新开发模式：PWA-渐进式增强progressive web app?(全屏运行、离线能力、推送通知) ，小程序，多端开发，WebAssembly-字节码标准(Java 字节码)?

* 擅长一门后端，如nodejs(事件驱动-无阻塞, 擅长IO密集，非计算密集)，关系型数据库和非关系型数据库，函数式编程，堆、栈和队列区别(全局持久手动 vs 局部临时自动)、八大排序算法(冒泡，选择，插入...)。特别的项目开发经验：多媒体前端经验(webRTC) 、可视化开发经验、数亿访问级别的项目经验等。

* 做过什么提高开发效率的工作？(包括团队) 如何降低项目的后期的维护成本？前端人员如何提高运营人员更强的支持力度？比较难的技术问题? 前端的价值体现？前端代码规范？有没有做过开源项目？有没有blog和github项目？最近在学什么？接下来半年打算学习什么？每天花多长时间学习？豁然开朗的知识点？开发过程中遇到的最大难点(超复杂的数据结构，扩展第三库)？最有挑战的项目？发布前发现bug如何处理？作为前端对于公司最大的价值贡献？相比其他前端的优势？如何面对编码凌乱和页面无设计的项目？
