## 解决方案大比较

dva、roadhog、atool-build、umi、antd pro、bigfish、next.js

* roadhog是基于webpack的配置工具，为了简化配置而诞生，类似的工具有crate-react-app

* umi可以简单看做roadhog+router+antd，加以插件机制的解决方案，类似于next.js

* dva可以理解为基于react+redux+redux-saga+react-router数据流的集成方案，dva 实现上尽量不创建新语法，而是用依赖库本身的语法，和umi和roadhog没有直接的依赖关系。它的核心是提供了app.model方法，用于把 reducer, initialState, action, saga 封装到model层。

* bigfish是umi的超集，都是基于webpack，可以理解为umi的最佳实现。

* antd Pro是基于antd的前端解决方案，开箱即用，可以理解它是一个脚手架，能快速搭建符合ant design设计体系的初始化代码。
