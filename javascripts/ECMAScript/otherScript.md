* 1、AtScript是一门语言，它是ES6的超集，被用来编写Angular 2.0。它使用TypeScript的类型语法来表达可选类型，这可以用来做运行时的类型推断
，而不是编译时的检测。它也使用了元数据注解来扩展语言。这里有一个示例，有些AtScript代码就长这样：

```
import {Component} from 'angular';
import {Server} from './server';

@Component({selector: 'foo'})
export class MyComponent {
  constructor(server:Server) {
      this.server = server;
  }
}
```

* 2、Dart是Google开发的另一种语言。它跟某种简单的解释性语言有所不同，是因为它有自己的运行时和基础类库。结果就是，Dart拥有自己的API，
用于DOM处理，集合，事件，正则表达式等等。这些API在它们自己的领域中都很优秀，但跟已有的JavaScript代码不兼容。由于这种阻抗不匹配，
Dart和外界的任何通讯都必须通过一个特殊的编组API来完成。所以，虽然从技术上可以调用现有的JavaScript库，一般来说不太实用。
