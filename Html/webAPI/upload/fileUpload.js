function sendFiles() {
  var imgs = document.querySelectorAll(".obj");

  for (var i = 0; i < imgs.length; i++) {
    new FileUpload(imgs[i], imgs[i].file);
  }
}

function FileUpload(img, file) {
  var reader = new FileReader();
  this.ctrl = createThrobber(img);
  var xhr = new XMLHttpRequest();
  this.xhr = xhr;

  var self = this;
  this.xhr.upload.addEventListener("progress", function(e) {
    if (e.lengthComputable) {
      var percentage = Math.round((e.loaded * 100) / e.total);
      self.ctrl.update(percentage);
    }
  }, false);

  xhr.upload.addEventListener("load", function(e){
    self.ctrl.update(100);
    var canvas = self.ctrl.ctx.canvas;
    canvas.parentNode.removeChild(canvas);
  }, false);
  xhr.open("POST", "http：//demos.hacks.mozilla.org/paul/demos/resources/webservices/devnull.php");
  xhr.overrideMimeType('text/plain; charset=x-user-defined-binary');
  reader.onload = function(evt) {
    xhr.sendAsBinary(evt.target.result);
  };
  reader.readAsBinaryString(file);
}

function createThrobber(img){
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  canvas.width = "600";
  canvas.height = "20";
  canvas.style = "border: 1px solid #ccc;";
  this.ctx = ctx;
  this.update = function(percentage){
    ctx.clearRect(0, 0, 600, 20);
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, percentage * 6, 40);
  };

  return this;
}

// [代码来源](https://developer.mozilla.org/zh-CN/docs/Using_files_from_web_applications)
