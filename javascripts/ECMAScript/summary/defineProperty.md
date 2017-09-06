## defineProperty

  > Object.defineProperty()方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回这个对象。`Object.defineProperty(obj, prop, descriptor)`

* descriptor 将被定义或修改的属性的描述符。对象里目前存在的属性描述符有两种主要形式：数据描述符和存取描述符。描述符必须是两种形式之一；不能同时是两者。

  - 数据描述符和存取描述符均具有以下可选键值:

    + configurable: 当且仅当该属性的configurable为true时，该属性描述符才能够被改变，也能够被删除, 以及除writable特性外的其他特性是否可以被修改。默认为false。

    + enumerable: 当且仅当该属性的enumerable为true时，该属性才能够出现在对象的枚举属性中( for...in 循环和 Object.keys() 中)。默认为false。

  - 数据描述符同时具有以下可选键值:

    + value: 该属性对应的值。可以是任何有效的JavaScript值（数值，对象，函数等）。默认为undefined。

    + writable：当且仅当该属性的writable为true时，该属性才能被赋值运算符改变。默认为false。

  - 存取描述符同时具有以下可选键值:

    + get: 给属性提供getter的方法，如果没有getter则为undefined。该方法返回值被用作属性值。默认为undefined。

    + set: 给属性提供setter的方法，如果没有setter则为undefined。该方法将接受唯一参数，并将该参数的新值分配给该属性。默认为 undefined。


  ```
  var o = {}; // 创建一个新对象

  // Example of an object property added with defineProperty with a data property descriptor
  Object.defineProperty(o, "a", {
    value : 37,
    writable : true,
    enumerable : true,
    configurable : true
  });

  // 对象o拥有了属性a，值为37

  // Example of an object property added with defineProperty with an accessor property descriptor
  var bValue;
  Object.defineProperty(o, "b", {
    get : function(){
      return bValue;
    },
    set : function(newValue){
      bValue = newValue;
    },
    enumerable : true,
    configurable : true
  });

  o.b = 38;
  // 对象o拥有了属性b，值为38

  // The value of o.b is now always identical to bValue, unless o.b is redefined

  // 数据描述符和存取描述符不能混合使用
  Object.defineProperty(o, "conflict", {
    value: 0x9f91102,
    get: function() {
      return 0xdeadbeef;
    }
  });
  // throws a TypeError: value appears only in data descriptors, get appears only in accessor descriptors

  var o = {};

  ob.a = 1;
  // 等同于 :
  Object.defineProperty(ob, "a", {
    value : 1,
    writable : true,
    configurable : true,
    enumerable : true
  });


  // 另一方面，
  Object.defineProperty(ob, "b", { value : 1 });
  // 等同于 :
  Object.defineProperty(ob, "b", {
    value : 1,
    writable : false,
    configurable : false,
    enumerable : false
  });
  ```
