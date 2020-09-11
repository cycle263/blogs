### 类型推导

  ```ts
  type Language = 'JavaScript' | 'TypeScript' | 'Python'; 
  function setLanguage(language: Language) { 
    console.log(language);
  }

  setLanguage('JavaScript'); // OK，内联形式

  let language = 'JavaScript'; 
  setLanguage(language); // Error，引用形式

  const language = 'JavaScript'; 
  setLanguage(language); // OK，精确类型推导

  let language: Language = 'JavaScript'; 
  setLanguage(language); // OK
  ```

  ```ts
  // 元组类型
  // 参数是（经度，纬度）对
  function panTo(location: [number, number]) {
    console.log("latitude: " + location[0]);
    console.log("longitude: " + location[1]);
  }

  panTo([10, 20]); // OK，(A)

  const loc = [10, 20];   // loc：number[]类型
  panTo(loc); // Error，(B)  type number[] -\-> type [number, number]

  const loc = [10, 20] as const;  // Error，readonly [10, 20]

  function panTo(location: readonly [number, number]) {   // OK 
    console.log("latitude: " + location[0]);
    console.log("longitude: " + location[1]);
  }
  ```

### 类型断言

* 概念

  类型断言用来告诉编译器你比它更了解这个类型，并且它不应该再发出错误。类型断言不是类型转换，断言成一个联合类型中不存在的类型是不允许的。

* 语法

  最常见的断言语法：`<foo>` 或者 `as foo`。推荐使用 `as foo`语法，避免跟JSX的语法冲突。

* vs 类型转换

  类型转换意味着运行时的支持，断言纯粹是编译时的语法，为编译器提供如何分析代码的方法。

  ```ts
  function getLength(something: string | number): number {
      if ((<string>something).length) {
          return (<string>something).length;
      } else {
          return something.toString().length;
      }
  }

  // 推荐写法
  function getLength(something: string | number): number {
      if ((something as string).length) {
          return (something as string).length;
      } else {
          return something.toString().length;
      }
  }
  ```

* 双重断言

  断言成兼容所有类型的 any，编译器将不会报错

  ```ts
  function handler(event: Event) {
    const element = event as HTMLElement; // Error: 'Event' 和 'HTMLElement' 中的任何一个都不能赋值给另外一个
  }

  function handler(event: Event) {
    const element = (event as any) as HTMLElement; // ok
  }
  ```

* 联合类型


* readonly

  接口里使用 readonly 来标记属性，以一种更安全（不可修改）的方式工作。

  ```ts
  type Foo = {
    readonly bar: number;
    readonly bas: number;
  };

  // 初始化
  const foo: Foo = { bar: 123, bas: 456 };

  // 不能被改变
  foo.bar = 456; // Error: foo.bar 为仅读属性
  ```

  Readonly 的映射类型，它接收一个泛型 T，用来把它的所有属性标记为只读类型：

  ```ts
  type Foo = {
    bar: number;
    bas: number;
  };

  type FooReadonly = Readonly<Foo>;

  const foo: Foo = { bar: 123, bas: 456 };
  const fooReadonly: FooReadonly = { bar: 123, bas: 456 };

  foo.bar = 456; // ok
  fooReadonly.bar = 456; // Error: bar 属性只读
  ```


### 泛型