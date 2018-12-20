* 一. 插件扩展

  > 两种方式扩展：全局函数扩展和对象扩展。

  - 1、尽量使用jQuery.[plugs].js来进行命名，避免跟其他库的插件混淆；
  - 2、所有的对象方法应当附加在jQuery.fn对象上（jQuery.fn.extend），而全局函数应该附加到jquery对象上（jQuery.extend）;
  - 3、在插件内部，this对象统一指向jQuery对象；
  - 4、避免遗漏分号引发压缩后的错误，可以在文件开头添加分号，避免其他文件的不规范带来影响；
  - 5、除非插件用来返回查询的数据和信息，尽量以返回jQuery对象结束；
  - 6、尽量使用jQuery，而不是缩写$，当然也可以使用闭包来规避这个问题。

  案例：
  ```js
  ;(function($){
    $.fn.extend({
      "plugin": function(options){
        options = $.extend({
          test: true
        }, options);
        return this.each(function(){

        });
      }
    });
  })(jQuery);
  ```

* 二. 选择器扩展

  jQuery选择符解析器首先会使用一组正则表达式来解析选择器，然后会针对每个解析出来的选择符执行函数，又称为选择器函数，最后根据
  这个选择器函数返回值（布尔值）来决定是否保留这个元素。

  例如： :gt()选择器在jQuery中的源码：

  ```js
  gt: function(a, i, m){  //a表示当前遍历的DOM元素； i表示当前DOM元素的索引值；m表示jQuery正则解析出来的数组（match）
    return i > m[3] - 0;
  }
  ```

  例如：$("p:gt(1)")中，m[0]表示:gt(1)这部分; m[1]表示引导符":"，即冒号; m[2]表示gt,选择器函数; m[3]表示数字1; m[4]案例中没有；
  “div :l(s(d))”,这个案例中，m[3]表示s(d); m[4]表示(d)，带括号。

  案例：
  ```js
  ;(function($){
    $.extend($.expr[":"], {
      between: function(a, i, m){
        var temp = m[3].split(",");
        return temp[0] - 0 < i && temp[1] - 0 > i;
      }
    });
  })(jQuery);
  ```

* 三、插件-屏幕居中

  ```js
  jQuery.fn.extend({
    "center": function(){
      var $w = $(window);
      this.css({"position": "absolute", "top": ($w.height()-this.height())/2+$w.scrollTop()+'px', "left": ($w.width()-this.width())/2+$w.scrollLeft()+'px'});
      return this;
    }
  });
  ```


### 案例

* [stars](./examples/stars.html)