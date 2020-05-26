## 常见错误收集

* prop...IntrinsicAttributes & IntrinsicClassAttributes...属性不匹配

  分析原因：create Form使用了高阶组件，props是直接加载到子组件的，导致类型检测报错。

  解决方案：导出高阶组件时，名字后面加上对应的类型 或者 any。
