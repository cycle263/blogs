## web api

    > [MDN-web api](https://developer.mozilla.org/en-US/docs/Web/API)

* file

* binary

* arrayBufferView

* content-type，常见的如下

  - multipart/form-data，支持文件上传，二进制方式，分隔符boundary切断分段传输，必须为POST方法

  - application/x- www-form-urlencoded，默认值，表单以键值对方式提交，key-value

  - text/plain，以纯文本形式进行编码

  - text/html

  - image/jpeg

  - audio/mp4

  等等，这些数据类型总称为MIME type，每个值包括一级类型和二级类型，之间用斜杠分隔。MIME type不仅用在HTTP协议，还可以用在其他地方，比如HTML网页。

* html5 download属性（兼容性不佳，IE和Safari不支持）

  > a标签包含download属性，则直接下载该资源，文件名为download指定的文件名称
