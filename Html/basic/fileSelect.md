```html
<input type="file" id="input">
```
> 获取到用户所选择的文件:  document.getElementById('input').files[0]

预览上传图片的方法：

```js
var dropbox = document.getElementById("dropbox"),
    preview = document.getElementById("preview");
dropbox.addEventListener("dragenter", function(e){
    e.stopPropagation();
    e.preventDefault();
}, false);
dropbox.addEventListener("dragover", function(e){
    e.stopPropagation();
    e.preventDefault();
}, false);
dropbox.addEventListener("drop", function(e){
    e.stopPropagation();
    e.preventDefault();

    var dt = e.dataTransfer;
    var files = dt.files;
    handleFiles(files);
}, false);
```

```js
//方法1
function handleFiles(files) {
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var imageType = /^image\//;

    if ( !imageType.test(file.type) ) {
      continue;
    }

    var img = document.createElement("img");
    img.width = "200";
    img.classList.add("obj");
    img.file = file;
    // 假设 "preview" 是将要展示图片的 div
    preview.appendChild(img);

    var reader = new FileReader();
    reader.onload = (function(aImg) {
      return function(e) {
        aImg.src = e.target.result;
      };
    })(img);
    reader.readAsDataURL(file);
  }
}

//方法2
window.URL = window.URL || window.webkitURL;

function handleFiles(files) {
    for (var i = 0; i < files.length; i++) {
      var img = document.createElement("img");
      img.src = window.URL.createObjectURL(files[i]);
      img.height = 60;
      img.classList.add("obj");
      img.onload = function(e) {
        window.URL.revokeObjectURL(this.src);
      }
      preview.appendChild(img);
    }
}
```



