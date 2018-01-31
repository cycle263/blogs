## Blob对象

  > Blob（Binary Large Object）是现代浏览器中提供的能够装载二进制流（文件）的容器对象，该对象代表了一段二进制数据，提供了一系列操作接口。其他操作二进制数据的API（比如File对象），都是建立在Blob对象基础上的，继承了它的属性和方法。

  - 生成Blob对象的方法

    + Blob构造函数，new Blob(Array[, typeObject]), typeObject是个对象，例如：{type: 'image/png'}

      ```
      // 生成了一个超级链接，点击后提示下载文本文件hello-world.txt，文件内容为“Hello World”。
      var blob = new Blob(["Hello World"]);

      var a = document.createElement("a");
      a.href = window.URL.createObjectURL(blob);
      a.download = "hello-world.txt";
      a.textContent = "Download Hello World!";

      body.appendChild(a);
      ```

    + slice方法，将二进制数据分块，返回一个新的Blob对象

      ```
      // 使用XMLHttpRequest对象，将大文件分割上传
      function upload(blobOrFile) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/server', true);
        xhr.onload = function(e) { ... };
        xhr.send(blobOrFile);
      }

      document.querySelector('input[type="file"]').addEventListener('change', function(e) {
        var blob = this.files[0];

        const BYTES_PER_CHUNK = 1024 * 1024; // 1MB chunk sizes.
        const SIZE = blob.size;

        var start = 0;
        var end = BYTES_PER_CHUNK;

        while(start < SIZE) {
          upload(blob.slice(start, end));

          start = end;
          end = start + BYTES_PER_CHUNK;
        }
      }, false);

      })();
      ```

  - 属性

    + size: 二进制数据的大小，单位为字节。

    + type: 二进制数据的MIME类型，全部为小写，如果类型未知，则该值为空字符串。
