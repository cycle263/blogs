## FileReader API

  > FileReader API用于读取文件，即把文件内容读入内存。它的参数是File对象或Blob对象。

* 读取方法

  - readAsBinaryString(Blob|File)：返回二进制字符串，该字符串每个字节包含一个0到255之间的整数。

  - readAsText(Blob|File, opt_encoding)：返回文本字符串。默认情况下，文本编码格式是’UTF-8’，可以通过可选的格式参数，指定其他编码格式的文本。

  - readAsDataURL(Blob|File)：返回一个基于Base64编码的data-uri对象。

  - readAsArrayBuffer(Blob|File)：返回一个ArrayBuffer对象。

  - abort：用于中止文件上传。


* 读取回调方法

  - onabort方法：读取中断或调用reader.abort()方法时触发。

  - onerror方法：读取出错时触发。

    ```
    var reader = new FileReader();
    reader.onerror = errorHandler;

    function errorHandler(evt) {
      switch(evt.target.error.code) {
        case evt.target.error.NOT_FOUND_ERR:
          alert('File Not Found!');
          break;
        case evt.target.error.NOT_READABLE_ERR:
          alert('File is not readable');
          break;
        case evt.target.error.ABORT_ERR:
          break;
        default:
          alert('An error occurred reading this file.');
      };
    }
    ```

  - onload方法：读取成功后触发。

  - onloadend方法：读取完成后触发，不管是否成功。触发顺序排在 onload 或 onerror 后面。

  - onloadstart方法：读取将要开始时触发。

  - onprogress方法：读取过程中周期性触发。

    ```
    var reader = new FileReader();
    reader.onprogress = updateProgress;

    function updateProgress(evt) {
      if (evt.lengthComputable) {
        var percentLoaded = Math.round((evt.loaded / evt.total) * 100);
        var progress = document.querySelector('.percent');
        if (percentLoaded < 100) {
          progress.style.width = percentLoaded + '%';
          progress.textContent = percentLoaded + '%';
        }
      }
    }
    ```


  ```
  // 让canvas显示剪贴板中的图片
  document.onpaste = function(e){
    e.preventDefault();
    if(e.clipboardData&&e.clipboardData.items){
      // pasted image
      for(var i=0, items = e.clipboardData.items;i<items.length;i++){
        if( items[i].kind==='file' && items[i].type.match(/^image/) ){
          readFile(items[i].getAsFile());
          break;
        }
      }
    }
    return false;
  };
  ```
