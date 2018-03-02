## Blob vs ArrayBuffer vs TypeArray

  > 二进制数组是JavaScript操作二进制数据的一个接口。(ArrayBuffer对象、TypedArray视图和DataView视图)。三者之间的关系可以理解为：Blob <-> ArrayBuffer <-> TypeArray <—> Array

  - Blob对象：是现代浏览器中提供的能够装载二进制流（文件）的容器对象，该对象代表了一段二进制数据，提供了一系列操作接口。其他操作二进制数据的API（比如File对象），都是建立在Blob对象基础上的，继承了它的属性和方法。

  - ArrayBuffer对象：是能够装载Blob（二进制流）数据的原始缓冲区，代表内存之中的一段二进制数据，ArrayBuffer不能直接通过js读写，但是可以通过“视图”进行操作。“视图”部署了数组接口，这意味着，可以用数组的方法操作内存。

  - TypedArray视图：共包括9种类型的视图，比如Uint8Array（无符号8位整数）数组视图, Int16Array（16位整数）数组视图, Float32Array（32位浮点数）数组视图等等。

  - DataView视图：可以自定义复合格式的视图，比如第一个字节是Uint8（无符号8位整数）、第二、三个字节是Int16（16位整数）、第四个字节开始是Float32（32位浮点数）等等，此外还可以自定义字节序。  

  简单说，ArrayBuffer对象代表原始的二进制数据，TypedArray视图用来读写简单类型的二进制数据，DataView视图用来读写复杂类型的二进制数据。

  
* websocket接受arraybuffer
    ```js
    /* websocket的情况下二进制流的获取 */
    var url = 'ws://127.0.0.1:8080';
    var ws = new WebSocket(url);
    ws.binaryType = 'arraybuffer'
    ws.onmessage = function (e) {
        var data = e.data;
    }
    ```

* blob <-> arraybuffer
    ```js
    var blob = new Blob(); // blob是要转换的blob
    var fr = new FileReader();
    fr.onload = function(){
        var result = this.result; // result是转换后的结果
    }
    fr.readAsArrayBuffer(blob);


    new Blob(Array[, typeObject])   // array 是一个由ArrayBuffer, ArrayBufferView, Blob, DOMString 等对象构成的 Array, typeObject为MIME类型
    ```

* arraybuffer <-> Uint8
    ```js
    var u8 = new Uint8Array(arraybuffer);
    var buffer = u8.buffer;
    ```

* array -> arraybuffer
    ```js
    var arr = [0x15,0xFF,0x01,0x00,0x34,0xAB,0x11];
    var u8 = new Uint8Array(arr);
    var ab = u8.buffer;
    ```