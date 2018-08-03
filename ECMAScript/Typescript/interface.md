## 接口

TypeScript的核心原则之一是对值所具有的结构进行类型检查。 

* 可选属性

  接口里的属性不全都是必需的，即给函数传入的参数对象中只有部分属性赋值了。带有可选属性的接口与普通的接口定义差不多，只是在可选属性名字定义的后面加一个?符号。

  可选属性的作用：

  - 可以对可能存在的属性进行预定义

  - 可以捕获引用了不存在的属性时的错误

  ```ts
  interface SquareConfig {
    color?: string;   // 可选属性
    width?: number;   // 可选属性
  }
  ```

* 只读属性

  一些对象属性只能在对象刚刚创建的时候修改其值，可以在属性名前用 readonly来指定只读属性。最简单判断该用readonly还是const的方法是看要把它做为变量使用还是做为一个属性。 

  ```ts
  interface Point {
    readonly x: number;
    readonly y: number;
  }

  let p1: Point = { x: 10, y: 20 };
  p1.x = 5; // error!
  ```

  TypeScript具有ReadonlyArray<T>类型，它与Array<T>相似，只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改。

* 属性检查