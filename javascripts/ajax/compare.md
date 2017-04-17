## XMLHttpRequest数据类型

- xhr1

  * DOMString，在JavaScript中，DOMString就是String，指的是UTF-16字符串，而JavaScript正是使用了这种编码的字符串。XHR的responseText就是字符串。

  * Document，Document对象，可以理解为XML数据类型，如responseXML

- xhr2

  * FormData，构造函数，可以传递HTMLFormElement参数（可选），表示要序列化的表单元素。formdata用键值对key-value方式模拟表单提交，并且可以一步上传二进制文件。可以使用append方法添加键值对。

    FormData提交格式的每个数据分三部分:

      + 分界线(boundary), 二进制大文件的分界线，chrome使用“——WebKitFormBoundary”加16位随机Base64位编码的字符串作为分隔边界。

      + 内容配置信息

      ![formdata](../images/formdata.png)

      + 传输内容

    ```
    var formdata = new FormData();
    formdata.append('key', 'value');
    // ...
    xhr.send(formdata);
    jQuery.ajax({
      url: '',
      data: formdata,
      processData: false,
      contentType: false
    })
    ```

    注意点：*jQuery.ajax时，加上processData: false, contentType: false,避免jQuery解析data发生异常*

  * Blob，BLOB (binary large object)，表示二进制大对象。

    > 一个Blob对象就是一个包含有只读原始数据的类文件对象。Blob对象中的数据并不一定得是JavaScript中的原生形式。File接口基于Blob, 继承了Blob的功能，并且扩展支持了用户计算机上的本地文件。创建Blob对象的方法有几种，可以调用Blob构造函数，还可以使用一个已有Blob对象上的slice()方法切出另一个Blob对象，还可以调用canvas对象上的toBlob方法。

    构造函数，可选两个参数：

      - parts 数组，包含了将要添加到Blob对象中的数据。数组元素可以是任意多个的ArrayBuffer, ArrayBufferView(typed array), Blob, 或者DOMString对象。

      - properties 一个对象，设置Blob对象的一些属性。目前仅支持一个type属性，表示Blob的类型。

    Blob对象有两个属性：

      - size Blob对象的数据大小，单位为字节，只读

      - type 字符串，表明Blob对象包含数据的MIME类型，例如："image/jpeg"

    Blob对象的方法slice，可以实现文件的分隔，传递三个参数 start：开始索引，end：结束索引，contentType：新的Blob对象的MIME类型。

    ```
    var xhr = new XMLHttpRequest();    
    xhr.open("get", "some.png", true);
    xhr.responseType = "blob";
    xhr.onload = function() {
        if (this.status == 200) {
            var blob = this.response;  // this.response也就是请求的返回就是Blob对象
            var img = document.createElement("img");
            img.onload = function(e) {
              window.URL.revokeObjectURL(img.src); // 清除释放
            };
            img.src = window.URL.createObjectURL(blob);
            eleAppend.appendChild(img);    
        }
    }
    xhr.send();
    ```

    注意点：*blob方式跟ajax同样存在跨域的问题*

  * File

  * ArrayBuffer
