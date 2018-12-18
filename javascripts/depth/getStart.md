* 1、严格模式  

  "user strict"只有在脚本顶部或者函数顶部才会生效，对于合并部署脚本文件需要避免入坑（自执行函数包裹）。
  
  常见的严格模式异常：

  - 变量必须申明
  - 函数参数名唯一性
  - 禁用 `with`
  - 只读属性赋值会抛出异常
  - 八进制数字如00840是语法错误
  - 删除不可删除的属性、删除全局变量都会抛出一个错误
  - eval 和 arguments不能被赋值和绑定
  - 不支持使用 arguments.callee 和 arguments.caller
  - arguments不会随函数参数值改变而改变
  - 全局函数this执行undefined，而非window

* 2、浮点运算  

  javascript只有数字类型，不论是浮点数和整数，其实都是双精度浮点数，但能完美表达53位精度的整数。(-2五十三次方)~(2五十三次方)。  
  位运算比较特殊，javascript会将其隐式地转换成32位整数后进行运算，toString(2); 

  - 精度丢失 

  浮点运算经常不精准，例如：`0.1 + 0.2 = 0.30000000000000004`

  分析原因：`(0.1).toString(2) // 0.0001100110011...`。十进制中一位小数 0.1 ~ 0.9 当中除了 0.5 之外的值在转化成二进制的过程中都丢失了精度。
  
  解决方案：针对大数的整数可以考虑使用 bigint 类型(目前在 stage 3 阶段)，针对小数尽量使用整数运算。

  ```js
  function strip(num, precision = 12) {
    return +parseFloat(num.toPrecision(precision));
  }

  function add(num1, num2) {
    const num1Digits = (num1.toString().split('.')[1] || '').length;
    const num2Digits = (num2.toString().split('.')[1] || '').length;
    const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits));
    return (num1 * baseNum + num2 * baseNum) / baseNum;
  }

  // 大数相乘
  var multiply = function(num1, num2) {
    if(isNaN(num1) || isNaN(num2)) return '';
    var len1 = num1.length,
      len2 = num2.length;
    var ans = [];
    for (var i = len1 - 1; i >= 0; i--) {
      for (var j = len2 - 1; j >= 0; j--) {
        var index1 = i + j;
        var index2 = i + j + 1;
        var mul = num1[i] * num2[j] + (ans[index2] || 0);
        ans[index1] = Math.floor(mul / 10) + (ans[index1] || 0);
        ans[index2] = mul % 10;
      }
    }
    var result = ans.join('');
      //这里结果有可能会是多个零的情况，需要转成数字判断
    return +result === 0 ? '0' : result;
  }

  // 大数相加
  var plugs = function(n1, n2) {
    if (!n1.length || !n2.length) return;
    var res = '';
    var n = 0;
    var x, x1, x2;
    for(let i = n1.length - 1, j = n2.length - 1; i > -1 || j > -1; --i, --j) {
      x1 = i > -1 ? n1[i] : '0';
      x2 = j > -1 ? n2[j] : '0';
      x = (x1 - 0) + (x2 - 0) + n;
      n = Math.floor(x / 10); // 进位数
      x %= 10;  // 本位数
      res = x.toString() + res.toString();
    }
    res = n > 0 ? '1' + res : res;
    return res;
  };

  function sumStrings(a, b) {
    a = '0' + a;    // 加0是因为两个最大的位数相加后可能需要进位
    b = '0' + b;
  
    var arrA = a.split(''),
        arrB = b.split(''),
        res = [],
        temp = '',
        carry = 0,
        distance = a.length - b.length,
        len = distance > 0 ? a.length : b.length;
      
    // 在长度小的那个数值字符串前面添加distance个0，这样两个数值的位数就保持一致，
    // 如：9797979797、34646，需要将这两个数值转成['0','9','7','9','7','9','7','9','7','9','7']、['0','0','0','0','0','3','4','6','4','6']
    if(distance > 0){
        for(let i = 0; i < distance; i++){
            arrB.unshift('0');
        } 
    } else { 
        for(let i = 0; i < Math.abs(distance); i++){
            arrA.unshift('0');
        }
    }
  
    // 从数组的最后一位开始向前遍历，把两个数组对应位置的数值字符串转成整形后相加，
    // carry表示相加后的进位，比如最后一位相加是7+6=13，这里进位carry是1
    // 在遍历的时候每次都加上上次相加后的carry进位
    for(let i = len - 1; i >= 0; i--){
        temp = +arrA[i] + (+arrB[i]) + carry;
        if(temp >= 10){  
            carry = 1;
            res.push((temp + '')[1]);
        }else{
            carry = 0;
            res.push(temp);
        } 
    }
    res = res.reverse().join('').replace(/^0/,'');
    console.log(res)
  }
  ```

* 3、分号自动插入  

  - (1).分号仅在}标记之前、一个或多个换行之后和程序输入的结尾插入;
  - (2).分号仅在随后的输入标记不能解析时插入，也就是说分号插入也是一种错误校正机制;
  - (3).在以(、[、+、-、/字符开头的语句前绝对不能省略分号;
  - (4).当脚本连接的时候，在脚本之间的显式地插入分号;
  - (5).在return、throw、break、continue、++、--的参数之前绝不能用换行;
  - (6).分号不能作为for循环的头部或空语句的分隔符而被推导出。
  
* 4、字符串代码单元  

  javascript字符串由16位的代码单元组成，而不是由Unicode代码点组成，使用两个代码单元表示65536及以上的Unicode代码点，又叫代理对。  
  length、charAt、charCodeAt方法及正则模式(如：单字符模式（.）)都将受代理对影响，出现匹配不正常的状况。
  
* 5、尽量避免使用with语句  

  javascript对待所有变量都是相同，从最内层作用域开始向外查找变量，with语句好比一个变量作用域。  
  变量作用域和引入对象的字段歧义冲突，让代码的可读性几乎丧失，并且with代码库需要所搜对象的原型链来查找with代码块里的所有变量，导致运行速度降低，成为with语句最大的诟病，建议尽量使用短局部变量代替。  

* 6、迭代方法优于循环  

  使用迭代方法（如：Array.prototype.forEach、map）替换for循环，使得代码更可读，需要提前终止或者有控制流操作，建议使用循环，当然，some和every方法也具有控制流操作能力。
