## file

* filelist

  > FileList对象针对表单的file控件。

  ```
  // 当用户选取文件后，就可以读取该文件
  var selected_file = document.getElementById('input').files[0];

  // 采用拖放方式，也可以得到FileList对象
  var dropZone = document.getElementById('drop_zone');
  dropZone.addEventListener('drop', handleFileSelect, false);

  function handleFileSelect(evt) {
      evt.stopPropagation();
      evt.preventDefault();

      var files = evt.dataTransfer.files; // FileList object.

  }

  // 直接读取本地文件
  function readLocalFile(file, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', file, true);
    xhr.onreadystatechange = function(){
      if(xhr.readyState === 4) {
        if(xhr.status === 200 || xhr.status === 0) {
          callback(xhr.responseText);
        }
      }
    }
    xhr.send(null);
  }

  // readLocalFile('file:///C:/your/path/to/file.txt');
  ```

* file对象属性

   - name：文件名，该属性只读。

   - size：文件大小，单位为字节，该属性只读。

   - type：文件的MIME类型，如果分辨不出类型，则为空字符串，该属性只读。

   - lastModified：文件的上次修改时间，格式为时间戳。

   - lastModifiedDate：文件的上次修改时间，格式为Date对象实例。
