## ajax二进制

* 发送二进制数据
```
var oReq = new XMLHttpRequest();
oReq.open("POST", url, true);
oReq.onload = function (oEvent) {
    // Uploaded.
};
var blob = new Blob(['abc123'], {type: 'text/plain'});
oReq.send(blob);

或者

var myArray = new ArrayBuffer(512);
var longInt8View = new Uint8Array(myArray);
for (var i=0; i< longInt8View.length; i++) {
    longInt8View[i] = i % 255;
}
var xhr = new XMLHttpRequest;
xhr.open("POST", url, false);
xhr.send(myArray);
```

* 接收二进制数据

```
var oReq = new XMLHttpRequest();
oReq.open("GET", "/myfile.png", true);
oReq.responseType = "arraybuffer";
oReq.onload = function (oEvent) {
    var arrayBuffer = oReq.response; // Note: not oReq.responseText
    if (arrayBuffer) {
        var byteArray = new Uint8Array(arrayBuffer);
        for (var i = 0; i < byteArray.byteLength; i++) {

        }
    }
};
oReq.send(null);
```
当然，如上设置只能是文本类型，如果是Blob类型，那么如下即可
```
var oReq = new XMLHttpRequest();
oReq.open("GET", "/myfile.png", true);
oReq.responseType = "arraybuffer";
oReq.onload = function(oEvent) {
    var blob = new Blob([oReq.response], {type: "image/png"});
    // ...
};
oReq.send();

或者

var oReq = new XMLHttpRequest();
oReq.open("GET", "/myfile.png", true);
oReq.responseType = "blob";
oReq.onload = function(oEvent) {
    var blob = oReq.response;
    // ...
};
oReq.send();
```
如果你使用的是旧版本的浏览器，那么加载二进制可以如下
```
function load_binary_resource(url) {
    var req = new XMLHttpRequest();
    req.open('GET', url, false);
    //XHR binary charset opt by Marcus Granado 2006
    req.overrideMimeType('text\/plain; charset=x-user-defined');
    req.send(null);
    if (req.status != 200) return '';
    return req.responseText;
}
```

* 处理二进制流

  ```
  var reader = new FileReader();
  reader.readAsDataURL(myBytes);
  reader.onload = function(){
    var img = document.createElement("img");
    img.src = this.result ;
    document.body.appendChild(img) ;
  };

  或者

  var href = URL.createObjectURL(myBytes);
  // after load
  URL.revokeObjectURL(href);
