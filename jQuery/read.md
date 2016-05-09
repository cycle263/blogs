### 阅读心得

* 使用data缓存数据(名称为小写)
    - 原生javascript：element.dataset获取或设置，对象先进行字符串化（JSON.stringify），可在DOM结构中查看到“data-*”的属性值
    - 三种方式，以object保存则可以直接赋值和读取，以json字符串方式赋值，直接需解析获取
    - Query: $.data(ele, data ,key),ele为javascript元素对象，将会把DOM属性中data-*值也保存到jQuery.cache中(后续js增加的除外)，而$(ele).data()不会，jQuery的两种方式都会保存在jQuery.cache中

* jQuery(document).ready VS window.onload</h3>
    - window.onload是在网页中的所有元素（包括关联的资源文件：图片、样式等）完全加载后才会执行，并且只会执行一次；等价于jQuery(window).load
    - jQuery(document).ready是在DOM准备就绪的时候被调用，并且可以多次执行。简式写法：$(function(){})或者$().ready()

* animate
    - 当一组元素的一个动画应用于多个属性，则属性值同时发生变化；当多个动画函数或者以链式写法的动画，则是以先后顺序发生变化。
    - 当多组元素的动画默认情况下是同时发生，除非使用回调函数
    - 停止动画使用stop([clearQueue], [gotoEnd]), clearQueue表示是否清空未执行完的动画队列，gotoEnd表示是否直接将正在执行的动画跳至末状态。  
        未传参数则表示，立即停止当前进行中的动画,并以当前状态开始接下来的动画，不会清空队列中的动画。
    - 判断元素是否在动画状态中，使用is(":animated")，延迟动画使用delay(number), 可以避免连续单击触发动画按钮后，动画一直执行。

* end方法
    - 这个方法返回的prevObject,也就是jQuery中上一个最近的选择器。

* ajax的请求证书{xhrFields:'withCredentials': true}--1.5.1版本之上可用
    - 在跨域请求时，浏览器默认不会发送cookie和身份验证信息，需要在jQuery的ajax请求option内设置xhrFields对象中的withCredentials属性

* jQuery.fn.each vs jQuery.each
    - jQuery.fn.each内部也通过调用静态方法jQuery.each方法来实现。each会遍历jQuery对象，并在每个元素上执行回调函数。回调函数也是在当前元素的上下文语境中出发，也即是this指向当前元素。
                
* jQuery.pushStack
    - jQuery.pushStack是核心方法之一，它创建了一个新的空jQuery对象，然后把DOM集合放入这个对象，并保留对当前jQuery对象的引用。

