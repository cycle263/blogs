## 字符串的扩展  

* 1、codePointAt()  

  JavaScript内部，字符以UTF-16的格式储存，每个字符固定为2个字节。对于那些需要4个字节储存的字符(Unicode码点大于0xFFFF的字符)，
  JavaScript会认为它们是两个字符。  
  ES6提供了codePointAt方法，能够正确处理4个字节储存的字符，返回一个字符的码点。codePointAt方法是测试一个字符由两个字节还是
  由四个字节组成的最简单方法。  

  ```js
  function is32Bit(c) {
      return c.codePointAt(0) > 0xFFFF;
  }
  is32Bit("𠮷") // true
  ```

* 2、String.fromCodePoint()  

  ES5提供String.fromCharCode方法，用于从码点返回对应字符，但是这个方法不能识别辅助平面的字符（编号大于0xFFFF）。  
  注意，fromCodePoint方法定义在String对象上，而codePointAt方法定义在字符串的实例对象上。  

* 3、at()  

  ES5提供String.prototype.charAt方法，返回字符串给定位置的字符。该方法不能识别码点大于0xFFFF的字符。  
  ES7提供了at方法，可以识别Unicode编号大于0xFFFF的字符，返回正确的字符。  

* 4、字符的Unicode表示法  

  JavaScript允许采用“\uxxxx”形式表示一个字符，其中“xxxx”表示字符的码点。这种表示法只限于\u0000——\uFFFF之间的字符。超出这个范围的字符，必须用两个双字节的形式表达。ES6对这一点做出了改进，只要将码点放入大括号，就能正确解读该字符。  

* 5、正则表达式的修饰符  

  - 修饰符u  
  用来正确处理大于\uFFFF的Unicode字符。  
  点（.）字符在正则表达式中，对于码点大于0xFFFF的Unicode字符，点字符不能识别，必须加上u修饰符。\S预定义模式也一样。  

  - y修饰符  
  y修饰符，叫做“粘连”（sticky）修饰符。它的作用与g修饰符类似，也是全局匹配，后一次匹配都从上一次匹配成功的下一个位置开始，
  不同之处在于，g修饰符只要剩余位置中存在匹配就可，而y修饰符确保匹配必须从剩余的第一个位置开始。 

  ```js
  // 和ES5.1相同
  "𠮷".length == 2

  // 正则表达式新的u模式
  "𠮷".match(/./u)[0].length == 2

  // 新的unicode表示法
  "\u{20BB7}" == "𠮷" == "\uD842\uDFB7"

  // 新的字符串方法
  "𠮷".codePointAt(0) == 0x20BB7

  // for of迭代码点
  for(var c of "𠮷") {
    console.log(c);
  }
  ```

* 6、includes(), startsWith(), endsWith()  

  - includes(str[,startIndex])：返回布尔值，表示是否找到了参数字符串。
  - startsWith(str[,startIndex])：返回布尔值，表示参数字符串是否在源字符串的头部。
  - endsWith(str[,startIndex])：返回布尔值，表示参数字符串是否在源字符串的尾部。  

  上面方法表示，使用第二个参数n时，endsWith的行为与其他两个方法有所不同。它针对前n个字符，而其他两个方法针对从
  第n个位置直到字符串结束。  

* 7、repeat()  

  repeat()返回一个新字符串，表示将原字符串重复n次。  

  `"foo".repeat(3)` 等价于 `Array(3 + 1).join("foo");`

* 8、Regexp.escape()  

  字符串必须转义，必须使用反斜杠对其中的特殊字符转义，才能用来作为一个正则匹配的模式。  

  ```js
  function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  }
  ```
  已经有提议将这个需求标准化，作为Regexp.escape()，放入ES7。

* 9、模板字符串  

  模板字符串（template string）是增强版的字符串，用反引号（\`）标识。它可以当作普通字符串使用，也可以用来定义多行字符串，
  或者在字符串中嵌入变量。  
  大括号内部可以放入任意的JavaScript表达式，可以进行运算，以及引用对象属性。  

  ```js
  function fn() {
    return "Hello World";
  }
  console.log(`foo ${fn()} bar`);
  console.log(`string text line 1
  string text line 2`);
  ```

* 10、标签模板  

  模板字符串的功能，不仅仅是上面这些。它可以紧跟在一个函数名后面，该函数将被调用来处理这个模板字符串。这被称为“标签模板”功能
  （tagged template）。  
  函数依次接受三个参数。第一个参数是一个数组，该数组的成员是模板字符串中那些没有变量替换的部分，也就是说，变量替换只发生在
  数组的第一个成员与第二个成员之间、第二个成员与第三个成员之间，以此类推。第一个参数之后的参数，都是模板字符串各个变量被替换
  后的值。  
  “标签模板”的一个重要应用，就是过滤HTML字符串，防止用户输入恶意内容。  

  ```js
  var message =
  SaferHTML`<p>${sender} has sent you a message.</p>`;

  function SaferHTML(templateData) {
    var s = templateData[0];
    for (var i = 1; i < arguments.length; i++) {
      var arg = String(arguments[i]);

      // Escape special characters in the substitution.
      s += arg.replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;");

      // Don't escape special characters in the template.
      s += templateData[i];
    }
    return s;
  }
  ```

  标签模板的另一个应用，就是多语言转换（国际化处理）。  
  模板处理函数的第一个参数，还有一个raw属性。它也是一个数组，成员与处理函数的第一个参数完全一致，唯一的区别是字符串被转义前
  的原始格式，这是为了模板函数处理的方便而提供的。  

  ```
  tag`First line\nSecond line`
  function tag(strings) {
    console.log(strings.raw[0]);
    // "First line\\nSecond line"
  }
  ```

* 11、String.raw()  

  String.raw方法，往往用来充当模板字符串的处理函数，返回字符串被转义前的原始格式。  
  String.raw方法也可以正常的函数形式使用。这时，它的第一个参数，应该是一个具有raw属性的对象，且raw属性的值应该是一个数组。  
