## 二进制数组  

    二进制数组是JavaScript操作二进制数据的一个接口。很像C语言的数组，允许开发者以数组下标的形式，直接操作内存，大大增强了JavaScript处理二进制数据的能力，使得开发者有可能通过JavaScript与操作系统的原生接口进行二进制通信。二进制数组并不是真正的数组，而是类似数组的对象。  

    文本格式传递一个32位整数, 很多时候需要进行格式转换(浏览器与显卡之间的通信), 将非常耗时耗能，二进制数组就是在这种背景下诞生的。

* 二进制由三类对象组成

    - ArrayBuffer对象：代表内存之中的一段二进制数据，可以通过“视图”进行操作。“视图”部署了数组接口，这意味着，可以用数组的方法操作内存。

    - TypedArray视图：共包括9种类型的视图，比如Uint8Array（无符号8位整数）数组视图, Int16Array（16位整数）数组视图, Float32Array（32位浮点数）数组视图等等。(Int8、Uint8、Uint8C、Int16、Uint16、Int32、Uint32、Float32、Float64)

    - DataView视图：可以自定义复合格式的视图，比如第一个字节是Uint8（无符号8位整数）、第二、三个字节是Int16（16位整数）、第四个字节开始是Float32（32位浮点数）等等，此外还可以自定义字节序。  

    简单说，ArrayBuffer对象代表原始的二进制数据，TypedArray视图用来读写简单类型的二进制数据，DataView视图用来读写复杂类型的二进制数据。


* ArrayBuffer对象

    > ArrayBuffer对象代表储存二进制数据的一段内存，它不能直接读写，只能通过视图（TypedArray视图和DataView视图)来读写，视图的作用是以指定格式解读二进制数据。

    - ArrayBuffer是一个构造函数，可以分配一段可以存放数据的连续内存区域。

    ```
    var buf = new ArrayBuffer(32);
    var dataView = new DataView(buf);
    dataView.getUint8(0) // 0
    ```

* DataView视图

    > DataView视图的创建，需要提供ArrayBuffer对象实例作为参数。

* TypedArray视图

    > TypedArray视图的构造函数，除了接受ArrayBuffer实例作为参数，还可以接受普通数组作为参数，直接分配内存生成底层的ArrayBuffer实例，并同时完成对这段内存的赋值。

    - Int8Array：8位有符号整数，长度1个字节。
    - Uint8Array：8位无符号整数，长度1个字节。
    - Uint8ClampedArray：8位无符号整数，长度1个字节，溢出处理不同。
    - Int16Array：16位有符号整数，长度2个字节。
    - Uint16Array：16位无符号整数，长度2个字节。
    - Int32Array：32位有符号整数，长度4个字节。
    - Uint32Array：32位无符号整数，长度4个字节。
    - Float32Array：32位浮点数，长度4个字节。
    - Float64Array：64位浮点数，长度8个字节。  

    普通数组与TypedArray数组的差异：  
    - TypedArray数组的所有成员，都是同一种类型。
    - TypedArray数组的成员是连续的，不会有空位。
    - TypedArray数组成员的默认值为0。比如，new Array(10)返回一个普通数组，里面没有任何成员，只是10个空位；new Uint8Array(10)返回一个TypedArray数组，里面10个成员都是0。
    - *TypedArray数组只是一层视图，本身不储存数据，它的数据都储存在底层的ArrayBuffer对象之中，要获取底层对象必须使用buffer属性。*
