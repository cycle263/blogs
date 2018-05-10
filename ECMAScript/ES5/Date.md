## Date对象

  > Date对象是基于1970年1月1日(世界标准时间 - UTC)起的毫秒数。

* **构造函数**

  ```js
  Date()  // 当前时间的字符串
  new Date();   // 当前时间的Date对象
  new Date(value);    // value为毫秒数，Number类型，字符串类型返回Invalid Date
  new Date(dateString);   // dateString能被 Date.parse() 方法识别的字符串
  // year推荐使用四位数，month从0开始计数
  new Date(year, month[, day[, hour[, minutes[, seconds[, milliseconds]]]]]);
  new Date() - new Date('2016-02-11 12:00:12')  // 70783769114
  +new Date('1992/02/13 12:12:09')  // 697954329000
  ```

  对象使用特性：

  - Date() 返回的字符串，new Date() 返回的Date对象

  - new Date(timestamp)中的时间戳必须是number格式，string会返回Invalid Date。

  - new Date(dateString)方式构造Date实例，dateString能被 Date.parse() 方法识别的字符串，具体能识别的格式包括：

    + RFC2822 标准日期字符串，YYYY/MM/DD HH:MM:SS ± timezon(时区用4位数字表示)，`1992/02/12 12:23:22+0800`，推荐使用此标准，[兼容性更好](http://dygraphs.com/date-formats.html)。

    + ISO 8601标准日期字符串，YYYY-MM-DDThh:mm:ss ± timezone(时区用HH:MM表示)

  - 两个Date实例之间可以进行减法、除法和取余等运算。

* **静态方法**

  - Date.now()  返回基于1970年起的毫秒数

  - Date.parse()  解析日期字符串，返回基于1970年起的毫秒数，无效字符串返回NaN

  - Date.UTC()  接受2-7个参数，返回基于1970年(UTC时间)起的毫秒数

* **实例方法**

  - Date.prototype.getDate() 根据本地时间返回指定日期对象的月份中的第几天（1-31）

  - Date.prototype.getDay() 返回指定日期对象的星期中的第几天（0-6）。

  - Date.prototype.getFullYear() 返回指定日期对象的年份（四位数年份时返回四位数字）。
  
  - Date.prototype.getHours() 返回指定日期对象的小时（0-23）。
  
  - Date.prototype.getMilliseconds() 返回指定日期对象的微秒（0-999）。
  
  - Date.prototype.getMinutes() 返回指定日期对象的分钟（0-59）。
  
  - Date.prototype.getMonth() 返回指定日期对象的月份（0-11）。
  
  - Date.prototype.getSeconds() 返回指定日期对象的秒数（0-59）。
  
  - Date.prototype.getTime() 返回从1970-1-1 00:00:00 UTC（协调世界时）到该日期经过的毫秒数，对于之前的时间返回负值。
  
  - Date.prototype.getTimezoneOffset() 返回当前时区的时区偏移，单位为分钟

* **缩写注解**

  - UTC - Universal Time Coordinated，世界协调时间

  - CST -  Central Standard Time，中央标准时间

  - GMT - Greenwich Mean Time，格林威治标准时间


### 参考文献

1、[MDN Date对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date)

2、[JavaScript and Dates, What a Mess!](http://blog.dygraphs.com/2012/03/javascript-and-dates-what-mess.html)