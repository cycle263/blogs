## URL

  > URL对象用于生成指向File对象或Blob对象的URL。类似于“blob:http%3A//test.com/666e6730-f45c-47c1-8012-ccc706f17191”。

  ```
  // URL的存在时间，等同于网页的存在时间，一旦网页刷新或卸载，这个URL就失效。

  // 本机视频预览
  var video = document.getElementById('video');
  var obj_url = window.URL.createObjectURL(blob);
  video.src = obj_url;
  video.play()
  window.URL.revokeObjectURL(obj_url);
  ```
