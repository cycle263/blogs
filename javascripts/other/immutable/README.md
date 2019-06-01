## IMMUTABLE

> JavaScript 中的对象一般是可变的（Mutable），因为使用了引用赋值，新的对象简单的引用了原始对象，改变新的对象将影响到原始对象。为了解决这个问题，一般的做法是使用 shallowCopy（浅拷贝）或 deepCopy（深拷贝）来避免被修改，但这样做造成了 CPU 和内存的浪费。Immutable 可以很好地解决这些问题。

* 原理机制

Immutable Data 就是一旦创建，就不能再被更改的数据。对 Immutable 对象的任何修改或添加删除操作都会返回一个新的 Immutable 对象。Immutable 实现的原理是 Persistent Data Structure（持久化数据结构），也就是使用旧数据创建新数据时，要保证旧数据同时可用且不变。同时为了避免 deepCopy 把所有节点都复制一遍带来的性能损耗，Immutable 使用了 Structural Sharing（结构共享），即如果对象树中一个节点发生变化，只修改这个节点和受它影响的父节点，其它节点则进行共享。

在 Immutable.js 中这里的 “节点” 并不能简单理解成对象中的 “key”，其内部使用了 Trie(字典树) 数据结构, Immutable.js 会把对象所有的 key 进行 hash 映射，将得到的 hash 值转化为二进制，从后向前每 5 位进行分割后再转化为 Trie 树。

* 数据类型

  - Collection
  - List  有序可重复的列表
  - Map   键值对集合
  - Set   无序且不可重复的列表
  - Record
  - Seq

* 性能优化

  Immutable 则提供了简洁高效的判断数据是否变化的方法，只需 `===` 和 `is` 比较就能知道是否需要执行 `render()`，而这个操作几乎 0 成本，所以可以极大提高性能。也可以借助 `React.addons.PureRenderMixin` 或支持 class 语法的pure-render-decorator 来实现。

  ```js
  import { is } from 'immutable';

  shouldComponentUpdate: (nextProps = {}, nextState = {}) => {
    const thisProps = this.props || {}, thisState = this.state || {};

    if (Object.keys(thisProps).length !== Object.keys(nextProps).length ||
        Object.keys(thisState).length !== Object.keys(nextState).length) {
      return true;
    }

    for (const key in nextProps) {
      if (thisProps[key] !== nextProps[key] || ！is(thisProps[key], nextProps[key])) {
        return true;
      }
    }

    for (const key in nextState) {
      if (thisState[key] !== nextState[key] || ！is(thisState[key], nextState[key])) {
        return true;
      }
    }
    return false;
  }
  ```

* 优点

  - Immutable降低了Mutable带来的复杂度，可变（Mutable）数据耦合了Time和Value的概念，造成了数据很难被回溯。
  - Immutable.js 使用了 Structure Sharing 会尽量复用内存，没有被引用的对象会被垃圾回收。
  - Undo/Redo，Copy/Paste，甚至时间旅行这些功能都容易实现
  - 并发安全，适合函数式编程

* 缺点

  - 学习新的API，容易跟原生对象混淆
  - 增加资源文件的大小，压缩后16k，可以考虑（seamless-immutable），只有2k

## Immutable 的常用方法

* fromJS() 深层转换js对象和数组成map对象和list

  `fromJS(json: any, reviver?: (k: any, v: Iterable<any, any>) => any): any`

* is() 判断语法，类似于Object.is

  `is(first: any, second: any): boolean`

* Range() 范围数组，返回indexed

  `Range(start?: number, end?: number, step?: number): Seq.Indexed<number>`

* Repeat() 重复数组

  `Repeat<T>(value: T, times?: number): Seq.Indexed<T>`

* get vs getIn

  `get(key: number, notSetValue?: T)`  vs   `getIn([key: number, ...] notSetValue?: T)`

* Cursor

  由于 Immutable 数据一般嵌套非常深，为了便于访问深层数据，Cursor 提供了可以直接访问这个深层数据的引用。

  ```js
  import Immutable from 'immutable';
  import Cursor from 'immutable/contrib/cursor';

  let data = Immutable.fromJS({ a: { b: { c: 1 } } });
  // 让 cursor 指向 { c: 1 }
  let cursor = Cursor.from(data, ['a', 'b'], newData => {
    // 当 cursor 或其子 cursor 执行 update 时调用
    console.log(newData);
  });

  cursor.get('c'); // 1
  cursor = cursor.update('c', x => x + 1);
  cursor.get('c'); // 2
  ```


### 参考资料

[数据immutable方案比较](https://juejin.im/post/5bbad07ce51d450e894e4228)

[是否需要用immutable](https://cn.redux.js.org/docs/recipes/UsingImmutableJS.html)

[immutable在react中的使用](https://zhuanlan.zhihu.com/p/20295971?columnSlug=purerender)