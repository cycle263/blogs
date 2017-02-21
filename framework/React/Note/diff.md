## react diff原理

![diff](../images/compare.png )

* diff 策略

  - Web UI 中 DOM 节点跨层级的移动操作特别少，可以忽略不计。

  - 拥有相同类的两个组件将会生成相似的树形结构，拥有不同类的两个组件将会生成不同的树形结构。

  - 对于同一层级的一组子节点，它们可以通过唯一 id 进行区分。

* tree diff
