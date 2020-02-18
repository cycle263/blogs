## Pont

Pont 用于桥接前后端数据层，对接的后端 API 使用 Java Swagger，Swagger 能提供所有 API 的元信息，包括请求和响应的类型格式。Pont 解析 API 元信息生成 TS 的取数函数，这些取数函数类型完美，并挂载到 API 模块下。

#### Pont 用途

* 根据方法名匹配URL和method，映射对应的response，并进行自动提示

* 后端API 或者 params 发生变更，前端对应的接口层代码会发生报错

* 前后端接口层的定义保持实时更新，也就不需要约定式的接口文档