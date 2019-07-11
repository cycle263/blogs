## 前端下载

* a标签download属性

  download 属性是 HTML 5 的新特性，因此它不支持旧版本的浏览器。

* window.open下载链接

  response header设置如下：

  ```js
  // response header
  Content-Disposition: attachment;filename=test.xls
  Content-Type: application/vnd.ms-excel;charset=utf-8
  Transfer-Encoding: chunked
  ```

* 创建表单来下载

  ```js
  // 此方式存在表单注入风险
  function ajax_download(url, data) {
    var $iframe,
      iframe_doc,
      iframe_html;

    if (($iframe = $('#download_iframe')).length === 0) {
      $iframe = $("<iframe id='download_iframe' style='display: none'></iframe>").appendTo("body");
    }

    iframe_doc = $iframe[0].contentWindow || $iframe[0].contentDocument;
    if (iframe_doc.document) {
      iframe_doc = iframe_doc.document;
    }

    iframe_html = "<html><head></head><body><form method='POST' action='" + url +"'>" 

    Object.keys(data).forEach(function(key){
      iframe_html += "<input type='hidden' name='"+key+"' value='"+data[key]+"'>";
    });

    iframe_html +="</form></body></html>";

    iframe_doc.open();
    iframe_doc.write(iframe_html);
    $(iframe_doc).find('form').submit();
  }
  ```

* ajax请求blob

  ajax本身因为安全性问题，不能直接下载文件，不过可以读取blob数据流，然后转换成objectUrl进行下载。具体实现思路：

  ```js
  var xhr = new XMLHttpRequest();
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.responseType = 'blob';
  xhr.onreadystatechange = function(){
    if (xhr.readyState === 4 && xhr.status === 200) {
      var a = document.createElement('a');
      // 或者使用 window.open 打卡此 ObjectUrl, 这种方式无法命名
      a.href = window.URL.createObjectURL(xhr.response);
      var name = xhttp.getResponseHeader('content-disposition').split('=')[1] || '';
      a.download = decodeURIComponent(name);
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
    }
  };
  ```

### 参考资料

[Http头Content-Disposition](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Disposition)

[ajax下载文件](https://cloud.tencent.com/developer/ask/43902)

[如何用JavaScript下载文件](https://scarletsky.github.io/2016/07/03/download-file-using-javascript/)