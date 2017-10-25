## react diff原理

![diff](../images/compare.png )

* diff 策略

  - Web UI 中 DOM 节点跨层级的移动操作特别少，可以忽略不计。

  - 拥有相同类的两个组件将会生成相似的树形结构，拥有不同类的两个组件将会生成不同的树形结构。

  - 对于同一层级的一组子节点，它们可以通过唯一 id 进行区分。

* tree diff

  对树进行分层比较，两棵树只会对同一层次的节点进行比较。而对于不同层级的节点，只有创建和删除操作。

* component diff

  - 如果是同一类型的组件，按照原策略继续比较 virtual DOM tree。

  - 如果不是，则将该组件判断为dirty component，从而替换整个组件下的所有子节点。

  - 对于同一类型的组件，有可能其Virtual DOM没有任何变化，如果能够确切的知道这点那可以节省大量的diff运算时间，因此React允许用户通过 shouldComponentUpdate()来判断该组件是否需要进行 diff。

* element diff

  - 同一层级的同组子节点，添加唯一 key 进行区分


## react setState

![diff](../images/setstate.png )

```

var Transaction = require('./Transaction');

// 我们自己定义的 Transaction
var MyTransaction = function() {
  // do sth.
};

Object.assign(MyTransaction.prototype, Transaction.Mixin, {
  getTransactionWrappers: function() {
    return [{
      initialize: function() {
        console.log('before method perform');
      },
      close: function() {
        console.log('after method perform');
      }
    }];
  };
});

var transaction = new MyTransaction();
var testMethod = function() {
  console.log('test');
}
transaction.perform(testMethod);

// before method perform
// test
// after method perform

```
