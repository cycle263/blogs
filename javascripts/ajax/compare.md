## XMLHttpRequest数据类型

- xhr1

  * DOMString，在JavaScript中，DOMString就是String，指的是UTF-16字符串，而JavaScript正是使用了这种编码的字符串。XHR的responseText就是字符串。

  * Document，Document对象，可以理解为XML数据类型，如responseXML

- xhr2

  * FormData，用键值对key-value方式模拟表单提交，并且可以一步上传二进制文件。可以使用append方法添加键值对。

    FormData提交格式的每个数据分三部分:

      + 分界线(boundary), 二进制大文件的分界线，chrome使用“——WebKitFormBoundary”加16位随机Base64位编码的字符串作为分隔边界。

      + 内容配置信息

      + 传输内容

  * Blob，BLOB (binary large object)，表示二进制大对象。

    > 一个Blob对象就是一个包含有只读原始数据的类文件对象。Blob对象中的数据并不一定得是JavaScript中的原生形式。File接口基于Blob, 继承了Blob的功能，并且扩展支持了用户计算机上的本地文件。创建Blob对象的方法有几种，可以调用Blob构造函数，还可以使用一个已有Blob对象上的slice()方法切出另一个Blob对象，还可以调用canvas对象上的toBlob方法。

  * File

  * ArrayBuffer
