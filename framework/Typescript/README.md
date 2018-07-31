## TypeScript

Typescript是JavaScript类型的超集，可以编译成纯JavaScript。

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
    enum Color {Red = 1, Green = 2, Blue = 4};  // 编号默认从0开始
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