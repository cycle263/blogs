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
  declare const myConfig: SquareConfig;

  // 内联写法
  declare const myConfig: {
    color?: string;
    width?: number;
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

  对象字面量会被会经过额外属性检查，当将它们赋值给变量或作为参数传递的时候。如果一个对象字面量存在任何“目标类型”不包含的属性时，会得到一个错误。绕开这些检查非常简单。最简便的方法是使用类型断言。然而，最佳的方式是能够添加一个字符串索引签名，前提是你能够确定这个对象可能具有某些做为特殊用途使用的额外属性。 

  索引签名，表示的是可以有任意数量的属性，并且只要它们不是已定义的属性，那么就无所谓它们的类型是什么。

  ```ts
  interface SquareConfig {
    color?: string;
    width?: number;
  }

  function createSquare(config: SquareConfig): { color: string; area: number } {
    // ...
  }
  let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);  // 断言

  // 索引签名
  interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
  }
  ```

* 接口开放性

  ```ts
  // Lib a.d.ts
  interface Point {
    x: number,
    y: number
  }
  declare const myPoint: Point

  // Lib b.d.ts
  interface Point {
    z: number
  }

  // Your code
  myPoint.z // Allowed!
  ```

* 实现接口

  ```ts
  interface Point {
    x: number;
    y: number;
    z: number; // New member
  }

  class MyPoint implements Point {
    // ERROR : missing member `z`
    x: number;
    y: number;
  }
  ```