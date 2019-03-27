## Symbol

* **Symbol 独一无二**  

  - (1). ES6引入了一种新的原始数据类型Symbol，表示独一无二的ID,通过Symbol函数生成。Symbol函数前不能使用new命令，否则会报错。

  Symbol类型的值不能与其他类型的值进行运算，会报错。但是，Symbol类型的值可以转为字符串(toString、String())。

  - (2). Symbol值作为对象属性名时，不能用点运算符。点运算符后面总是字符串，所以不会读取mySymbol作为标识名所指代的那个值。同理，在对象的内部，使用Symbol值定义属性时，Symbol值必须放在方括号之中。

  - (3). Symbol值作为属性名时，该属性还是公开属性，不是私有属性。

  - (4). Symbol作为属性名，该属性不会出现在for...in、for...of循环中，也不会被Object.keys()、Object.getOwnPropertyNames()返回。但是，它也不是私有属性，有一个Object.getOwnPropertySymbols方法，可以获取指定对象的所有Symbol属性名。
  
  - (5). for...in循环、Object.getOwnPropertyNames方法得不到Symbol属性名，需要使用Object.getOwnPropertySymbols方法。

  - (6). Reflect.ownKeys方法可以返回所有类型的键名，包括常规键名和Symbol键名。ES7

  - (7). Symbol.for()方法重新使用同一个Symbol值, 接受一个字符串作为参数，然后搜索有没有以该参数作为名称的Symbol值。Symbol.keyFor方法返回一个已登记的Symbol类型值的key，未登记的Symbol值，所以返回undefined。

  - (8). Symbol.for为Symbol值登记的名字，是全局环境的，可以在不同的iframe或service worker中取到同一个值。

* **内置的Symbol**  

  ES6还提供一些内置的Symbol值，指向语言内部使用的方法。  

  - (1).Symbol.hasInstance

  - (2).Symbol.isConcatSpreadable

  - (3).Symbol.isRegExp

  - (4).Symbol.match

  - (5).Symbol.iterator

  - (6).Symbol.toPrimitive

  - (7).Symbol.toStringTag
  
  - (8).Symbol.unscopables