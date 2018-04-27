## 数值的扩展

* **二进制和八进制表示法**  

  ES6提供了二进制和八进制数值的新的写法，分别用前缀`0b`和`0o`表示。八进制用0o前缀表示的方法，将要取代已经在ES5中被逐步淘汰的加前缀0的写法。

  ```js
  // 数字
  0xffff  65535   // 十六进制数字
  0o11    9       // 八进制数字
  0b11    3       // 二进制数字

  // 字符
  x       字符 x
  \\      反斜线字符
  \0n     八进制值的字符0n (0 <= n <= 7)
  \0nn    八进制值的字符 0nn (0 <= n <= 7)
  \0mnn   八进制值的字符0mnn 0mnn (0 <= m <= 3, 0 <= n <= 7)
  \xhh    十六进制值的字符0xhh
  \uhhhh  十六进制值的字符0xhhhh
  \t 制表符('\u0009')
  \n 换行符 ('\u000A')
  \r 回车符 ('\u000D')
  \f 换页符 ('\u000C')
  \a 响铃符 ('\u0007')
  \e 转义符 ('\u001B')
  ```

* **转换成十进制**

  要将0b和0o前缀的字符串数值转为十进制，要使用Number方法。

  ```js
  Number('0b111')   // 7
  Number('0o10')    // 8
  ```

* **Number.isFinite(), Number.isNaN()**  

  Number.isFinite()用来检查一个数值是否为有限的（finite），即不是Infinity， 如果参数类型不是数值，一律返回false。Number.isNaN()用来检查一个值是否为NaN，只有对于NaN才返回true，非NaN一律返回false。

  ```js
  Number.isFinite("15");      // false
  Number.isFinite(Infinity);  // false
  Number.isFinite('15');      // false

  Number.isNaN(NaN)     // true
  Number.isNaN(15)      // false
  Number.isNaN('15')    // false
  Number.isNaN(true)    // false
  Number.isNaN(9/NaN)   // true
  Number.isNaN('true' / 0) // true
  Number.isNaN('true' / 'true') // true

  (function (global) {
    var global_isFinite = global.isFinite;

    Object.defineProperty(Number, 'isFinite', {
      value: function isFinite(value) {
        return typeof value === 'number' && global_isFinite(value);
      },
      configurable: true,
      enumerable: false,
      writable: true
    });
  })(this);

  //es 5写法
  var isNaN = function (n) {
      return n !== n;
  };
  var isFinite = function (v) {
      return (typeof v === "number" && !isNaN(v) && v !== Infinity && v !== -Infinity);
  };
  ```

  与传统的全局方法isFinite()和isNaN()的区别在于，传统方法先调用Number()将非数值的值转为数值，再进行判断，而这两个新方法只对数值有效，非数值一律返回false。  

* **Number.parseInt(), Number.parseFloat()**  

  ES6将全局方法parseInt()和parseFloat()，移植到Number对象上面，行为完全保持不变。逐步减少全局性方法。这样做的目的，是逐步减少全局性方法，使得语言逐步模块化。

* **Number.isInteger()和安全整数Number.isSafeInteger())**  

  Number.isInteger()用来判断一个值是否为整数。需要注意的是，在JavaScript内部，整数和浮点数是同样的储存方法，所以3和3.0被视为同一个值。如果参数不是数值，Number.isInteger返回false。
  
  由于 JavaScript 采用 IEEE 754 标准，数值存储为64位双精度格式，数值精度最多可以达到 53 个二进制位（1 个隐藏位与 52 个有效位）。如果数值的精度超过这个限度，第54位及后面的位就会被丢弃，这种情况下，Number.isInteger可能会误判。`Number.isInteger(3.0000000000000002) // true`

  一个数值的绝对值小于Number.MIN_VALUE（5E-324），即小于 JavaScript 能够分辨的最小值，会被自动转为 0。这时，Number.isInteger也会误判。`Number.isInteger(5E-325) // true`

  因此，对数据精度的要求较高，不建议使用Number.isInteger()判断一个数值是否为整数。

  ```js
  Number.isInteger(25.0) // true
  Number.isInteger(25.1) // false
  Number.isInteger(null) // false

  (function (global) {
    var floor = Math.floor,
      isFinite = global.isFinite;

    Object.defineProperty(Number, 'isInteger', {
      value: function isInteger(value) {
        return typeof value === 'number' && isFinite(value) &&
          value > -9007199254740992 && value < 9007199254740992 &&
          floor(value) === value;
      },
      configurable: true,
      enumerable: false,
      writable: true
    });
  })(this);
  ```

  JavaScript能够准确表示的整数范围在-2ˆ53 and 2ˆ53之间。ES6引入了Number.MAX_SAFE_INTEGER和Number.MIN_SAFE_INTEGER这两个常量，用来表示这个范围的上下限。Number.isSafeInteger()则是用来判断一个整数是否落在这个范围之内。

* **Number.EPSILON**

  Number.EPSILON实际上是 JavaScript 能够表示的最小精度。即 1 与大于 1 的最小浮点数之间的差，对于 64 位浮点数来说，大于 1 的最小浮点数相当于二进制的1.00..001，小数点后面有连续 51 个零。这个值减去 1 之后，就等于 2 的 -52 次方。

  ```js
  Number.EPSILON === Math.pow(2, -52)   // true
  Number.EPSILON                // 2.220446049250313e-16
  Number.EPSILON.toFixed(20)    // "0.00000000000000022204"
  ```

  Number.EPSILON可以用来设置“能够接受的误差范围”，实质是一个可以接受的最小误差范围。

  ```js
  // 误差检测
  function withinErrorMargin (left, right) {
    return Math.abs(left - right) < Number.EPSILON * Math.pow(2, 2);
  }

  0.1 + 0.2 === 0.3   // false
  withinErrorMargin(0.1 + 0.2, 0.3)   // true
  ```