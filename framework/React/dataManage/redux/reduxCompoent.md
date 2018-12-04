## redux + react

* 设计思路

  - 如何定义state结构

  - 如何定义component结构

  - 如何结合state和component

  - 如何更新state

* component分类

  - 展示component

  - 容器component  

    结合state和component的角色

* state的设计（Immutable state）

  - 在redux中，state只能通过action来变更，Reducer就是根据action的语义来完成state变更的函数。Reducer的执行时同步的。

  - Redux (Flux) 都建议在保存 State 数据的时候，应该尽可能地遵循范式，避免嵌套数据结构。如果出现了嵌套的对象，那么尽量通过 ID 来引用（未必从1开始）。范式化的存储也利于后面讲到的 Reducer 局部化，便于将大的 Reducer 分割为一系列小的 Reducers。

  ```json
  [{
    id: 1,
    title: 'Some Article',
    author: {
      id: 1,
      name: 'Dan'
    }
  }, {
    id: 2,
    title: 'Other Article',
    author: {
      id: 1,
      name: 'Dan'
    }
  }]

  // 转换成

  {
    result: [1, 2],
    entities: {
      articles: {
        1: {
          id: 1,
          title: 'Some Article',
          author: 1
        },
        2: {
          id: 2,
          title: 'Other Article',
          author: 1
        }
      },
      users: {
        1: {
          id: 1,
          name: 'Dan'
        }
      }
    }
  }
  ```
