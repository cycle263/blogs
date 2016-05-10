### 高效能使用jQuery
    * 尽可能使用最新版本，新版本有很多性能改进
    
    * 选择合适的选择器：id和tag(调用javascript原生方法) > class(getElementByClassName) > 伪类和属性(querySelector和querySelectorAll)  
    
    * 选择器的父子关系：
      + $parent.find('.child') >
      + $('.child', $parent) >  
      + $('.child', $('#parent')) > 
      + $parent.children('.child') > 
      + $('#parent > .child') > 
      + $('#parent .child')。
    
    总体原则：优先使用链式写法，其次缓存选择器变量
    
    * 不要过度依赖jQuery，尽量使用原生javascript。例如：事件回调内的this对象；浏览器原生的innterHTML()方法比jQuery对象的html()更快。
    
    * 减少DOM操作，j例如：$.data(ele, key, value)优于$(ele).data(key, value), $.data()会给元素对象设定一个属性internalKey，  
                并且在全局cache列表中增加一个同internalKey值一样的id，所有的数据实际存放的位置就是jQuery.cache中,   
                
                另外，elem.data()方法是定义在jQuery函数的prototype对象上面的， 而$.data()方法是定义jQuery函数上面的(类似静态方法)
                
    * 一个操作对某元素进行多次DOM操作，却无法使用变动class来实现，可以考虑使用detach分离元素
    
    * jQuery对象是一个很庞大的对象，带有很多属性和方法，会占用不少资源。所以，尽量少生成jQuery对象。
    
                许多jQuery方法都有两个版本，一个是供jQuery对象使用的版本，另一个是供jQuery函数使用的版本。
                $.text($text) > $text.text()
                
    * Javascript的变量采用链式作用域。读取变量的时候，先在当前作用域寻找该变量，如果找不到，
                就前往上一层的作用域寻找该变量。这样的设计，使得读取局部变量比读取全局变量快得多。
                
    * 使用join()来拼接字符串,特别是长字符串处理的时候
