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

## 格式转换

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

* Float32 -> Int16

  ```js
  // method 1
  while (l--) {
    s = Math.max(-1, Math.min(1, samples[l]));  // -1, 0, 1
    buf[l] = s < 0 ? s * 0x8000 : s * 0x7FFF;
  }

  // method 2
  while(i < len)
    dataAsInt16Array[i] = convert(data[i++]);
  function convert(n) {
    var v = n < 0 ? n * 32768 : n * 32767;       // convert in range [-32768, 32767]
    return Math.max(-32768, Math.min(32768, v)); // clamp
  }
  ```

* Int16 -> Int8

  ```js
  var dataAsInt8Array = new Int8Array(int16Arr);
  var dataAsInt8Array = Int8Array.from(int16Arr);
  ```

* Uint8Array -> Float32Array

  ```js
  var convertBlock(incomingData) { // incoming data is a UInt8Array
    var i, l = incomingData.length;
    var outputData = new Float32Array(incomingData.length);
    for (i = 0; i < l; i++) {
        outputData[i] = (incomingData[i] - 128) / 128.0;
    }
    return outputData;
  }
  ```

* Int16Array -> AudioBuffer

  ```js
  function int16ToAudioBuffer(input) {
    var myArrayBuffer = audioCtx.createBuffer(1, input.length, audioCtx.sampleRate);
    var nowBuffering = myArrayBuffer.getChannelData(0);
    for (var i = 0; i < input.length; i++) {
      nowBuffering[i] = input[i];
    }
    return myArrayBuffer;
  }
  ```

* arrayBuffer <-> base64

  ```js
  // arrayBuffer to Base64
  function _arrayBufferToBase64( buffer ) {
      var binary = '';
      var bytes = new Uint8Array( buffer );
      var len = bytes.byteLength;
      for (var i = 0; i < len; i++) {
          binary += String.fromCharCode( bytes[ i ] );
      }
      return window.btoa( binary );
  }
  // or
  // arrayBuffer to Base64
  var base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(arrayBuffer)));
  // or ES6
  // arrayBuffer to Base64
  let base64String = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));

  image.src = 'data:image/gif;base64,' + base64String;
  ```

* -> unicode

  ```js
  var GB2312UnicodeConverter = {
    ToUnicode:function(str){
      return escape(str).toLocaleLowerCase().replace(/%u/gi,'\\u');
    }
    ,ToGB2312:function(str){
      return unescape(str.replace(/\\u/gi,'%u'));
    }
  };
  ```

* base64 <-> unicode

  ```js
  function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
    }));
  }

  b64EncodeUnicode('✓ à la mode'); // "4pyTIMOgIGxhIG1vZGU="
  b64EncodeUnicode('\n');       // "Cg=="

  function b64DecodeUnicode(str) {
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }

  b64DecodeUnicode('4pyTIMOgIGxhIG1vZGU='); // "✓ à la mode"
  b64DecodeUnicode('Cg==');     // "\n"
  ```

* string -> binary

  ```js
  function strToBinary(str) {
    let result = '';
    for( let i = 0 , len = str.length ; i < len ; i++){
        result += str.charCodeAt(i).toString(2)
    }
    return result;
  }
  ```

* utf8 <-> unicode

  ```js
  // unicode为1个接收数据，串口收到的字符编码放在该数组中
  function UnicodeToUtf8(unicode) {
    var uchar;
    var utf8str = "";
    
    for(let i = 0; i < unicode.length; i += 2){			
      uchar = (unicode[i] << 8) | unicode[i + 1];				// UNICODE为2字节编码，一次读入2个字节
      utf8str = utf8str + String.fromCharCode(uchar);	// 使用String.fromCharCode强制转换
    }
    return utf8str;
  }

  function Utf8ToUnicode(strUtf8){
    var bstr = "";
    var nTotalChars = strUtf8.length;        // total chars to be processed.
    var nOffset = 0;                         // processing point on strUtf8
    var nRemainingBytes = nTotalChars;       // how many bytes left to be converted
    var nOutputPosition = 0;
    var iCode, iCode1, iCode2;                // the value of the unicode.

    while (nOffset < nTotalChars) {
      iCode = strUtf8.charCodeAt(nOffset);
      if ((iCode & 0x80) == 0) {              // 1 byte
        if ( nRemainingBytes < 1 )            // not enough data
          break;

        bstr += String.fromCharCode(iCode & 0x7F);
        nOffset ++;
        nRemainingBytes -= 1;
      } else if ((iCode & 0xE0) == 0xC0) {    // 2 bytes
        iCode1 =  strUtf8.charCodeAt(nOffset + 1);
        if ( nRemainingBytes < 2 || (iCode1 & 0xC0) != 0x80 ) {
          break;
        }

        bstr += String.fromCharCode(((iCode & 0x3F) << 6) | (iCode1 & 0x3F));
        nOffset += 2;
        nRemainingBytes -= 2;
      } else if ((iCode & 0xF0) == 0xE0) {
        iCode1 =  strUtf8.charCodeAt(nOffset + 1);
        iCode2 =  strUtf8.charCodeAt(nOffset + 2);
        if ( nRemainingBytes < 3 ||  (iCode1 & 0xC0) != 0x80 || (iCode2 & 0xC0) != 0x80 ) {
          break;
        }

        bstr += String.fromCharCode(((iCode & 0x0F) << 12) | ((iCode1 & 0x3F) <<  6) | (iCode2 & 0x3F));
        nOffset += 3;
        nRemainingBytes -= 3;
      } else          // 4 or more bytes -- unsupported
        break;
    }

    if (nRemainingBytes != 0) {
      // bad UTF8 string.
      return "";
    }

    return bstr;
  }
  ```

* gbk -> utf-8

  ```js
  function GB2312UTF8(){
    this.Dig2Dec = function(s){
      var retV = 0;
      if(s.length == 4){
        for(var i = 0; i < 4; i ++){
            retV += eval(s.charAt(i)) * Math.pow(2, 3 - i);
        }
        return retV;
      }
      return -1;
    } 
    this.Hex2Utf8 = function(s){
      var retS = "";
      var tempS = "";
      var ss = "";
      if(s.length == 16){
        tempS = "1110" + s.substring(0, 4);
        tempS += "10" + s.substring(4, 10); 
        tempS += "10" + s.substring(10,16); 
        var sss = "0123456789ABCDEF";
        for(var i = 0; i < 3; i ++){
          retS += "%";
          ss = tempS.substring(i * 8, (eval(i)+1)*8);
          retS += sss.charAt(this.Dig2Dec(ss.substring(0,4)));
          retS += sss.charAt(this.Dig2Dec(ss.substring(4,8)));
        }
        return retS;
      }
      return "";
    } 
    this.Dec2Dig = function(n1) {
      var s = "";
      var n2 = 0;
      for(var i = 0; i < 4; i++){
        n2 = Math.pow(2,3 - i);
        if(n1 >= n2){
          s += '1';
          n1 = n1 - n2;
        } else
          s += '0';
      }
      return s;      
    }
    this.Str2Hex = function(s) {
      var c = "";
      var n;
      var ss = "0123456789ABCDEF";
      var digS = "";
      for(var i = 0; i < s.length; i ++){
        c = s.charAt(i);
        n = ss.indexOf(c);
        digS += this.Dec2Dig(eval(n));
      }
      return digS;
    }
    this.Gb2312ToUtf8 = function(s1) {
      var s = escape(s1);
      var sa = s.split("%");
      var retV ="";
      if(sa[0] != ""){
        retV = sa[0];
      }
      for(var i = 1; i < sa.length; i ++){
        if(sa[i].substring(0,1) == "u"){
          retV += this.Hex2Utf8(this.Str2Hex(sa[i].substring(1,5)));
          if(sa[i].length){
            retV += sa[i].substring(5);
          }
        } else{
          retV += unescape("%" + sa[i]);
          if(sa[i].length){
            retV += sa[i].substring(5);
          }
        }
      }
      return retV;
    }
    this.Utf8ToGb2312 = function(str1) {
      var substr = "";
      var a = "";
      var b = "";
      var c = "";
      var i = -1;
      i = str1.indexOf("%");
      if(i ==- 1) {
        return str1;
      }
      while(i != -1) {
        if(i < 3) {
          substr = substr + str1.substr(0,i-1);
          str1 = str1.substr(i+1,str1.length-i);
          a = str1.substr(0,2);
          str1 = str1.substr(2,str1.length - 2);
          if(parseInt("0x" + a) & 0x80 == 0) {
            substr = substr + String.fromCharCode(parseInt("0x" + a));
          } else if(parseInt("0x" + a) & 0xE0 == 0xC0){ //two byte
            b = str1.substr(1,2);
            str1 = str1.substr(3,str1.length - 3);
            var widechar = (parseInt("0x" + a) & 0x1F) << 6;
            widechar = widechar | (parseInt("0x" + b) & 0x3F);
            substr = substr + String.fromCharCode(widechar);
          } else {
            b = str1.substr(1,2);
            str1 = str1.substr(3,str1.length - 3);
            c = str1.substr(1,2);
            str1 = str1.substr(3,str1.length - 3);
            var widechar = (parseInt("0x" + a) & 0x0F) << 12;
            widechar = widechar | ((parseInt("0x" + b) & 0x3F) << 6);
            widechar = widechar | (parseInt("0x" + c) & 0x3F);
            substr = substr + String.fromCharCode(widechar);
          }
        } else {
          substr = substr + str1.substring(0,i);
          str1= str1.substring(i);
        }
        i = str1.indexOf("%");
      }
      return substr+str1;
    }
  }
  ```

* arrayBuffer <-> string

  ```js
  // arrayBuffer to string
  function ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint16Array(buf));
  }

  // string to arrayBuffer
  function str2ab(str) {
    var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
    var bufView = new Uint16Array(buf);
    for (var i=0, strLen=str.length; i<strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }
  ```

* string <-> blob

  ```js
  // string to blob
  function str2ab(str){
    var byteNumbers = new Array(str.length);
    for (var i = 0; i < str.length; i++) {
        byteNumbers[i] = str.charCodeAt(i);
    }
    return new Blob(byteNumbers, {type: 'image/png'});
  }
  ```

* base64 <-> blob

  ```js
  // dataURL（base64）转换为Blob对象
  function dataURLtoBlob(dataurl) {
      var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while(n--){
          u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], {type: mime});
  }
  //test:
  var blob = dataURLtoBlob('data:text/plain;base64,YWFhYWFhYQ==');

  // dataURL（base64）转换为Blob对象
  function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);
      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }

  // Blob对象 to dataURL-base64
  function blobToDataURL(blob, callback) {
      var fr = new FileReader();
      fr.onload = function (e) { callback(e.target.result); }
      fr.readAsDataURL(blob);
  }
  ```

* blob -> file

  ```js
  // blob to file
  function blobToFile(theBlob, fileName){
      //A Blob() is almost a File() - it's just missing the two properties below which we will add
      theBlob.lastModifiedDate = new Date();
      theBlob.name = fileName;
      return theBlob;
  }

  // or blob to file
  var file = new File([myBlob], "name");
  ```


## 其他概念

* base64

  单个字符一般用一个字节就可以表示(中文等其他特殊文字除外)，而一个字节由8位二进制数构成。那么base64编码中,是将每6位二进制作为一个单位解析后参照字符集的索引就可以得到编码后的字符。多余的2位，base64编码时会将二进制通过在末尾补0的方式使其位数满足24的倍数。

  base64的字符集[A-Za-z0-9+/]，补位的零转换为字符`=`，`=`的数量代表补位的数量。

  js中window对象的atob()和btoa()方法可进行base64的编码和解码。

* buffer

  为数据缓冲对象，是一个类似数组结构的对象，可以通过指定开始写入的位置及写入的数据长度，往其中写入二进制数据。

* stream

  是对buffer对象的高级封装，其操作的底层还是buffer对象，stream可以设置为可读、可写，或者即可读也可写，在nodejs中继承了EventEmitter接口，可以监听读入、写入的过程。具体实现有文件流，httpresponse等~~

* 整数在计算机中的表示

  一个整数可能占 1 个、2 个或 4 个字节，即 8 个、16 个或 32 个二进制位。整数还分无符号数和有符号数。无符号数的所有二进制位都用于表示数值，于是 n 位无符号数的范围就是 0 到2^n-1，例如 8 位无符号数的范围是 0 ~ 255。有符号数则把最高位用作符号位，0 表示正数（或 0），1 表示负数。剩下的 n-1 位用于表示数值，正数直接表示，而负数则用「补码」表示 —— 负数-a的这 n-1 位的值是2^{n-1} - a。因此，n 位有符号数的范围是-2^{n-1}到2^{n-1} - 1，例如 8 位有符号数的范围是 -128 ~ 127。

　举几个例子。正数 233 的二进制形式是 11101001，它用不同长度的无符号数和有符号数的表示如下图，红色的 0 表示符 号位。注意图中没有 8 位有符号数，因为 233 超出了 8 位有符号数的范围。

  ![整数在计算机中的表示](../../images/buffer.jpg)

  再如，负数 -23 用不同长度的有符号数的表示如下图，红色的 1 表示符号位。-23 用 8 位有符号数表示的形式跟 233 用 8 位无符号数表示的形式是一样的，请读者自行验证。

  ![整数在计算机中的表示](../../images/buffer2.jpg)

* 浮点数在计算机中的表示

  int型整数变量，值为9（二进制写法为1001）。普通的32位计算机，用4个字节表示int变量，所以9就被保存为00000000 00000000 00000000 00001001，写成16进制就是0x00000009。

  根据国际标准IEEE 754，任意一个二进制浮点数V可以表示成下面的形式：

　 -（1）(-1)^s表示符号位，当s=0，V为正数；当s=1，V为负数。

　 -（2）M表示有效数字，大于等于1，小于2。

　 -（3）2^E表示指数位。

  十进制的-5.0，写成二进制是-101.0，相当于-1.01×2^2。那么，s=1，M=1.01，E=2。

  IEEE 754规定，对于32位的浮点数，最高的1位是符号位s，接着的8位是指数E，剩下的23位为有效数字M。对于64位的浮点数，最高的1位是符号位S，接着的11位是指数E，剩下的52位为有效数字M