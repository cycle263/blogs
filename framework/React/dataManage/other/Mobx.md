## Mobx

Mobx的基本思想是可变数据（Mutable Data）和可观察数据 (Observable Data) ，redux的数据思维是不可变数据（Immutable data）。

* Mobx 的优势

  - 可在任何地方随意修改state，redux必须通过action和reducer来修改

  - mobx文件少，便于修改和管理

  - mobx可多个store，并且完全由mobx来管理，数据量大时效率更高

  - 完美支持typescript

  - mobx利用了ES6的proxy来追踪属性，（旧版本是用Object.defineProperty来实现的）通过隐式订阅，自动追踪被监听的对象变化，然后触发组件的UI更新。

总结起来就是，mobx把简易的操作交给用户，繁琐的处理由内部实现控制。

* Mobx 的缺陷

  - 由于基于可变数据，可任意修改state，很难去做数据的回溯

  - 和redux一样存在没有完美方案来解决异步数据流的问题

  - store过多情况下，会增加维护成本，例如：多个store直接的数据同步和通信

  - 副作用更明显，与函数式编程思维背道而驰



