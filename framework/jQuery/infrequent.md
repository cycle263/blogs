* 1、jquery只使用一次的事件，即调用一次后将事件解绑，可以使用$(ele).one方法；

* 2、触发事件可以使用trigger方法，或者直接调用事件（click()）;原生javascript可直接调用click方法，其他事件则需创建自定义事件，
然后在IE中，fireEvent触发，其他浏览器dispatchEvent(event)；

* 3、创建自定义事件方式
- ①.document.createEvent(eventType)--不推荐。eventType：UIEvent、MouseEvent、MutationEvent、MutationNameEvent、TextEvent、
KeyboardEvent、CustomEvent、Event。
- ②.new CustomEvent、new MouseEvent、new ClipboardEvent、new UIEvent、new TouchEvent等等（https://developer.mozilla.org/en-US/docs/Web/API/Event）

* 4、元素ownerDocument即包含该元素的document元素。

* 5、prop和attr分别何时使用？
  > 在有些浏览器，只用写disabled就能生效，有些则需要写disabled="disabled"，使用attr来获取则会出现问题。
  attributes表示文档中DOM状态信息, 是HTML属性值，而properties表示元素的动态状态(js对象)信息，是DOM接口，存取由DOM规范定义，跟HTML上的属性不一定是对应的，因此jQuery在1.6版之后提供了prop。
  - ①.只用添加属性名称就生效的使用prop；
  - ②.只存在true/false的属性应该使用prop(checked、disabled、selected...);
  - ③.其他情况尽可能使用attr,当然获取value等除外

* 6、获取所有的表单域jQuery(':input'), 其中包括select、textarea等。

* 7、jQuery.extend 和 jQuery.fn.extend
    ```js
    $.fn.extend({myMethod: function(){}});
    //jQuery("div").myMethod(),  creates 1 plugin
    $.extend({myMethod2: function(){}});
    //jQuery.myMethod2()
    ```

* 8、jQuery不触发浏览器默认事件，调用triggerHandler方法，只会触发jQuery绑定的事件处理函数。

* 9、获取元素下的子元素的index方法：
  - Array.prototype.indexOf.call(this.parentElement.children, this);
  - Array.prototype.slice.call(htmlCollection)//htmlCollection快速转换为array

* 10、jQuery常见数组操作
  - $.each(array, [callback]) 遍历
  - $.grep(array, callback, [invert])使用过滤函数过滤数组元素(第三个参数为true或false,对过滤函数返回值取反)
  - $.map(array,[callback])按给定条件转换数组
  - $.merge(first,second)合并两个数组
  - $.unique(array)过滤数组中重复元素
  - $.makeArray(obj) 将类数组对象转换为数组
  - $(dom).toArray()将所有DOM元素恢复成数组
