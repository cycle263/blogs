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

    > DataView视图的创建，需要提供ArrayBuffer对象实例作为参数。 DataView视图提供更多操作选项，而且支持设定字节序。   

    DataView视图 vs TypedArray视图  

    TypedArray视图，是用来向网卡、声卡之类的本机设备传送数据，使用本机的字节序, 不可自行设定。  

    DataView视图的设计目的，是用来处理网络设备传来的数据，所以大端字节序或小端字节序是可以自行设定的。  

    - DataView实例提供8个方法读取内存：

        + getInt8：读取1个字节，返回一个8位整数。
        + getUint8：读取1个字节，返回一个无符号的8位整数。
        + getInt16：读取2个字节，返回一个16位整数。
        + getUint16：读取2个字节，返回一个无符号的16位整数。
        + getInt32：读取4个字节，返回一个32位整数。
        + getUint32：读取4个字节，返回一个无符号的32位整数。
        + getFloat32：读取4个字节，返回一个32位浮点数。
        + getFloat64：读取8个字节，返回一个64位浮点数。  

    如果一次读取两个或两个以上字节，就必须明确数据的存储方式，到底是小端字节序还是大端字节序。默认情况下，DataView的get方法使用大端字节序解读数据，如果需要使用小端字节序解读，必须在get方法的第二个参数指定true。  

    - DataView实例提供8个方法写入内存：(get => set)  

    第一个参数是字节序号，表示从哪个字节开始写入，第二个参数为写入的数据。对于那些写入两个或两个以上字节的方法，需要指定第三个参数，false或者undefined表示使用大端字节序写入，true表示使用小端字节序写入。

* TypedArray视图

    > TypedArray视图的构造函数，除了接受ArrayBuffer实例作为参数，还可以接受普通数组作为参数，直接分配内存生成底层的ArrayBuffer实例，并同时完成对这段内存的赋值。

    - Int8Array：8位有符号整数，长度1个字节, 表示-128到127的整数
    - Uint8Array：8位无符号整数，长度1个字节, 表示0-255的整数
    - Uint8ClampedArray：8位无符号整数，长度1个字节，溢出处理不同。正向溢出时都返回255，负向溢出都返回0。
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

### 构造函数有多种用法

    1、TypedArray(buffer, byteOffset=0, length?)  

    视图的构造函数可以接受三个参数：  

    - 第一个参数（必需）：视图对应的底层ArrayBuffer对象。
    - 第二个参数（可选）：视图开始的字节序号，默认从0开始。
    - 第三个参数（可选）：视图包含的数据个数，默认直到本段内存区域结束。

    2、TypedArray(length)    

    视图还可以不通过ArrayBuffer对象，直接分配内存而生成, length指成员长度，也就是字符长度，而非字节长度，一个字符长度占两个字节长度。  

    3、TypedArray(typedArray)   

    TypedArray数组的构造函数，可以接受另一个TypedArray实例作为参数。  

    4、TypedArray(array)   

    构造函数的参数也可以是一个普通数组，然后直接生成TypedArray实例。  

    #### TypedArray的原型方法(普通数组的操作方法和属性，对TypedArray数组完全适用)  

    - TypedArray.prototype.buffer 返回整段内存区域对应的ArrayBuffer对象,该属性为只读属性。
    - TypedArray.prototype.byteLength 返回TypedArray数组占据的内存长度，单位为字节(只读)。
    - TypedArray.prototype.byteOffset 返回TypedArray数组从底层ArrayBuffer对象的哪个字节开始(只读).
    - TypedArray.prototype.length 表示TypedArray数组含有多少个成员.
    - TypedArray.prototype.set() 用于复制数组（普通数组或TypedArray数组），也就是将一段内容完全复制到另一段内存。
    - TypedArray.prototype.subarray(start_index[, end_index]) 对于TypedArray数组的一部分，再建立一个新的视图。
    - TypedArray.prototype.slice() 返回一个指定位置的新的TypedArray实例, 支持倒数(负数).

    #### TypedArray的静态方法  

    - TypedArray.of() 用于将参数转为一个TypedArray实例。
    - TypedArray.from() 接受一个可遍历的数据结构（比如数组）作为参数，返回一个基于这个结构的TypedArray实例。方法还可以将一种TypedArray实例，转为另一种。方法还可以接受一个函数，作为第二个参数，用来对每个元素进行遍历，功能类似map方法。

### 复合视图  

    由于视图的构造函数可以指定起始位置和长度，所以在同一段内存之中，可以依次存放不同类型的数据，这叫做“复合视图”。  

    ```
    var buffer = new ArrayBuffer(24);

    var idView = new Uint32Array(buffer, 0, 1); //字节0到字节3：1个32位无符号整数
    var usernameView = new Uint8Array(buffer, 4, 16);   //字节4到字节19：16个8位整数
    var amountDueView = new Float32Array(buffer, 20, 1); //字节20到字节23：1个32位浮点数
    ```

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

    或者

    var littleEndian = (function() {
      var buffer = new ArrayBuffer(2);
      new DataView(buffer).setInt16(0, 256, true);
      return new Int16Array(buffer)[0] === 256;
    })();       //true，就是小端字节序
    ```

    总之，与普通数组相比，TypedArray数组的最大优点就是可以直接操作内存，不需要数据类型转换，所以速度快得多。


* ArrayBuffer与字符串的互相转换

    ArrayBuffer转为字符串，或者字符串转为ArrayBuffer，有一个前提，即字符串的编码方法是确定的。假定字符串采用UTF-16编码（JavaScript的内部编码方式），可以自己编写转换函数。

    ```
    // ArrayBuffer转为字符串，参数为ArrayBuffer对象
    function ab2str(buf) {
      return String.fromCharCode.apply(null, new Uint16Array(buf));
    }

    // 字符串转为ArrayBuffer对象，参数为字符串
    function str2ab(str) {
      var buf = new ArrayBuffer(str.length * 2); // 每个字符占用2个字节
      var bufView = new Uint16Array(buf);
      for (var i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
      }
      return buf;
    }
    ```

* 视图溢出

    不同的视图类型，所能容纳的数值范围是确定的。超出这个范围，就会出现溢出。

    - 正向溢出(overflow)：当输入值大于当前数据类型的最大值，结果等于当前数据类型的最小值加上余值，再减去1。

    - 负向溢出(underflow)：当输入值小于当前数据类型的最小值，结果等于当前数据类型的最大值减去余值，再加上1。

    ```
    var uint8 = new Uint8Array(1);

    uint8[0] = 256;
    uint8[0] // 0

    uint8[0] = -1;
    uint8[0] // 255

    var int8 = new Int8Array(1);

    int8[0] = 128;
    int8[0] // -128

    int8[0] = -129;
    int8[0] // 127
    ```


## 二进制数组的应用  

* ajax(xhr.response + xhr.responseType)

    XMLHttpRequest第二版XHR2允许服务器返回二进制数据，这时分成两种情况。如果明确知道返回的二进制数据类型，可以把返回类型（responseType）设为arraybuffer；如果不知道，就设为blob。  

* canvas(ctx.getImageData)  

    针对Canvas元素的专有类型Uint8ClampedArray。这个视图类型的特点，就是专门针对颜色，把每个字节解读为无符号的8位整数，即只能取值0～255，而且发生运算的时候自动过滤高位溢出。这为图像处理带来了巨大的方便。

* WebSocket(socket.binaryType)

    WebSocket可以通过ArrayBuffer，发送或接收二进制数据。

* Fetch API

    Fetch API取回的数据，就是ArrayBuffer对象。

* File API

    ```
    (function(){
        var fileInput = document.getElementById('fileInput');
        fileInput.addEventListener('change', function(){
            var file = fileInput.files[0];
            var reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onload = function () {
                var arrayBuffer = reader.result;
                var v = new Uint8Array(arrayBuffer);
                // Uint8Array.from(v, function(v, k){
                //     console.log(v, k);
                // });

                var datav = new DataView(arrayBuffer);
                var bitmap = {};    //位图文件映射

                //具体处理图像数据时，先处理bmp的文件头
                bitmap.fileheader = {};
                bitmap.fileheader.bfType = datav.getUint16(0, true);
                bitmap.fileheader.bfSize = datav.getUint32(2, true);
                bitmap.fileheader.bfReserved1 = datav.getUint16(6, true);
                bitmap.fileheader.bfReserved2 = datav.getUint16(8, true);
                bitmap.fileheader.bfOffBits = datav.getUint32(10, true);

                //接着处理图像元信息部分
                bitmap.infoheader = {};
                bitmap.infoheader.biSize = datav.getUint32(14, true);
                bitmap.infoheader.biWidth = datav.getUint32(18, true);
                bitmap.infoheader.biHeight = datav.getUint32(22, true);
                bitmap.infoheader.biPlanes = datav.getUint16(26, true);
                bitmap.infoheader.biBitCount = datav.getUint16(28, true);
                bitmap.infoheader.biCompression = datav.getUint32(30, true);
                bitmap.infoheader.biSizeImage = datav.getUint32(34, true);
                bitmap.infoheader.biXPelsPerMeter = datav.getUint32(38, true);
                bitmap.infoheader.biYPelsPerMeter = datav.getUint32(42, true);
                bitmap.infoheader.biClrUsed = datav.getUint32(46, true);
                bitmap.infoheader.biClrImportant = datav.getUint32(50, true);

                //最后处理图像本身的像素信息
                var start = bitmap.fileheader.bfOffBits;
                bitmap.pixels = new Uint8Array(arrayBuffer, start);

                console.log(bitmap);
            };
        }, false);           
    })();
    ```
