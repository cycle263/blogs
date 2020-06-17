## TypeScript

Typescript是JavaScript类型的超集，可以编译成纯JavaScript。设计目标之一是让你在 TypeScript 中安全、轻松地使用现有的 JavaScript 库，TypeScript 通过声明文件来做到这一点。

* 基本类型

  - 布尔值

  - 数值 和JavaScript一样，TypeScript里的所有数字都是浮点数。 这些浮点数的类型是 number。 除了支持十进制和十六进制字面量，TypeScript还支持ECMAScript 2015中引入的二进制和八进制字面量。

  - 字符串 普通字符串和模板字符串

  - 数组 两种方式可以定义数组

    + 元素类型后面接上 []，表示由此类型元素组成的一个数组，`let list: number[] = [1, 2, 3];`

    + 使用数组泛型，Array<元素类型>， `let list: Array<number> = [1, 2, 3];`

  - 元组 元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。 比如，你可以定义一对值分别为 string和number类型的元组。 `let a: [string, number];`

  - 枚举 enum类型是对JavaScript标准数据类型的一个补充。 

    ```js
    enum Color { Red = 1, Green = 2, Blue = 4 };  // 编号默认从0开始
    ```

  - Any 不希望类型检查器对进行检查，希望让它们通过编译阶段的检查，可以使用 any类型来标记这些变量

  - Void void类型像是与any类型相反，它表示没有任何类型。当一个函数没有返回值时，返回值类型是void

  - Null 和 Undefined

  - Never never类型表示的是那些永不存在的值的类型。

* 变量声明

  let和const是JavaScript里相对较新的变量声明方式，const是对let的一个增强，它能阻止对一个变量再次赋值。

  对比var：
  
  - 同个块级作用域不可以多次声明
  
  - 块级作用域
  
  - 没有变量声明提升

* 属性重命名

  ```js
  let { a: newName1, b: newName2 } = o;

  // 指定类型
  let {a, b}: {a: string, b: number} = o;
  ```

* 可调用 和 可实例化

  ```ts
  // 可调用
  interface ReturnString {
    (): string;
  };
  declare const foo: ReturnString;

  // 可实例化
  interface CallMeWithNewToGetString {
    new (): string;
  };
  declare const Foo: CallMeWithNewToGetString;
  ```

* 字面量验证

  ```ts
  function logName(something: { name: string }) {
    console.log(something.name);
  }

  const person = { name: 'matt', job: 'being awesome' };
  const animal = { name: 'cow', diet: 'vegan, but has milk of own specie' };
  const randow = { note: `I don't have a name property` };

  logName(person); // ok
  logName(animal); // ok
  logName(randow); // Error: 没有 `name` 属性

  // 允许额外属性
  let x: { foo: number, [x: string]: any };
  x = { foo: 1, baz: 2 }; // ok, 'baz' 属性匹配于索引签名
  ```