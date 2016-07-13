## 二进制数组  

二进制数组是JavaScript操作二进制数据的一个接口。很像C语言的数组，允许开发者以数组下标的形式，直接操作内存，大大增强了JavaScript处理二进制数据的能力，使得开发者有可能通过JavaScript与操作系统的原生接口进行二进制通信。  

二进制数组并不是真正的数组，而是类似数组的对象。    

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
    - TypedArray数组只是一层视图，本身不储存数据，它的数据都储存在底层的ArrayBuffer对象之中，要获取底层对象必须使用buffer属性。

    ```
    // 创建一个8字节的ArrayBuffer
    var b = new ArrayBuffer(8);

    // 创建一个指向b的Int32视图，开始于字节0，直到缓冲区的末尾
    var v1 = new Int32Array(b);
    v1.length   //2

    // 创建一个指向b的Uint8视图，开始于字节2，直到缓冲区的末尾
    var v2 = new Uint8Array(b, 2);
    v2.length   //8-2=6

    // 创建一个指向b的Int16视图，开始于字节2，长度为2
    var v3 = new Int16Array(b, 2, 2);
    v3.length   //4-2=2
    ```

    #### 构造函数有多种用法

    1、视图的构造函数可以接受三个参数：

    - 第一个参数（必需）：视图对应的底层ArrayBuffer对象。
    - 第二个参数（可选）：视图开始的字节序号，默认从0开始。
    - 第三个参数（可选）：视图包含的数据个数，默认直到本段内存区域结束。

    2、TypedArray(length)   

    视图还可以不通过ArrayBuffer对象，直接分配内存而生成。  

    3、TypedArray(typedArray)   

    TypedArray数组的构造函数，可以接受另一个TypedArray实例作为参数。  

    4、TypedArray(array)   

    构造函数的参数也可以是一个普通数组，然后直接生成TypedArray实例。  

* 字节序

    > 字节序指的是数值在内存中的表示方式。  

    由于x86体系的计算机都采用小端字节序（little endian），相对重要的字节排在后面的内存地址，相对不重要字节排在前面的内存地址，所以就得到了上面的结果。  

    比如，一个占据四个字节的16进制数0x12345678，决定其大小的最重要的字节是“12”，最不重要的是“78”。小端字节序将最不重要的字节排在前面，储存顺序就是78563412；大端字节序则完全相反，将最重要的字节排在前面，储存顺序就是12345678。目前，所有个人电脑几乎都是小端字节序，所以TypedArray数组内部也采用小端字节序读写数据，或者更准确的说，按照本机操作系统设定的字节序读写数据。   

    这并不意味大端字节序不重要，事实上，很多网络设备和特定的操作系统采用的是大端字节序。这就带来一个严重的问题：如果一段数据是大端字节序，TypedArray数组将无法正确解析，因为它只能处理小端字节序！为了解决这个问题，JavaScript引入DataView对象，可以设定字节序，下文会详细介绍。  

    ```
    // 假定某段buffer包含如下字节 [0x02, 0x01, 0x03, 0x07]
    var buffer = new ArrayBuffer(4);
    var v1 = new Uint8Array(buffer);
    v1[0] = 2;
    v1[1] = 1;
    v1[2] = 3;
    v1[3] = 7;

    var uInt16View = new Uint16Array(buffer);

    // 计算机采用小端字节序
    // 所以头两个字节等于258
    if (uInt16View[0] === 258) {        //258=0x0102;
      console.log('OK'); // "OK"
    }

    // 赋值运算
    uInt16View[0] = 255;    // 字节变为[0xFF, 0x00, 0x03, 0x07]
    uInt16View[0] = 0xff05; // 字节变为[0x05, 0xFF, 0x03, 0x07]
    uInt16View[1] = 0x0210; // 字节变为[0x05, 0xFF, 0x10, 0x02]
    ```

    下面的函数可以用来判断，当前视图是小端字节序，还是大端字节序。  

    ```
    const BIG_ENDIAN = Symbol('BIG_ENDIAN');
    const LITTLE_ENDIAN = Symbol('LITTLE_ENDIAN');

    function getPlatformEndianness() {
      let arr32 = Uint32Array.of(0x12345678);
      let arr8 = new Uint8Array(arr32.buffer);
      switch ((arr8[0]*0x1000000) + (arr8[1]*0x10000) + (arr8[2]*0x100) + (arr8[3])) {
        case 0x12345678:
          return BIG_ENDIAN;
        case 0x78563412:
          return LITTLE_ENDIAN;
        default:
          throw new Error('Unknown endianness');
      }
    }
    ```

    总之，与普通数组相比，TypedArray数组的最大优点就是可以直接操作内存，不需要数据类型转换，所以速度快得多。
