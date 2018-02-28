## 内存泄漏

    > 不再用到的内存，没有及时释放，就叫做内存泄漏（memory leak）。

* js自动释放内存（垃圾回收机制）

    - 引用计数(reference counting)：语言引擎有一张"引用表"，保存了内存里面所有的资源（通常是各种值）的引用次数。如果一个值的引用次数是0，就表示这个值不再用到了，可以将这块内存释放。

    ```
    let arr = [1, 2, 3, 4];     // arr引用了数组值，引用次数为1
    console.log('hello world');
    arr = null;         // arr解除了引用，引用次数为0，内存自动释放
    ```

## 内存泄露的常见情况：

* 1、当页面中的元素被移除，若元素的绑定事件仍未被移除，部分浏览器可能存在内存泄露（IE）;  

    解决办法：先手动移除绑定事件，然后移除元素，或者使用事件代理。  

    example：  

    ```
    <div id="myDiv">
        <input type="button" value="Click me" id="myBtn">
    </div>
    <script type="text/javascript">
        document.onclick = function(event){
            event = event || window.event;
            if(event.target.id == "myBtn"){
                document.getElementById("myDiv").innerHTML = "Processing...";
            }
        }
    </script>
    ```

* 2、对象之间的相互引用，部分浏览器可能存在不能释放，进而导致内存泄露;  

    解决办法：先解除相互引用关系，然后进行移除;

* 3、自动类型装箱转换（string -> String）  

    解决办法：先进行显式类型转换  

    example：  

    ```
    var s = '123';
    console.log(s.length);  //s本身是一个string并非object，并没有length属性，因此js引擎会临时创建一个String对象封装s, 而这个对象一定会泄露。
    console.log((new String(s)).length);    //显式转换
    ```
