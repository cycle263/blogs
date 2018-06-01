// arrayBuffer to Base64
function _arrayBufferToBase64( buffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
}
// or
// arrayBuffer to Base64
var base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(arrayBuffer)));
// or ES6
// arrayBuffer to Base64
let base64String = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));


// arrayBuffer to string
function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint16Array(buf));
}

// string to arrayBuffer
function str2ab(str) {
  var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
  var bufView = new Uint16Array(buf);
  for (var i=0, strLen=str.length; i<strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

// string to blob
function str2ab(str){
  var byteNumbers = new Array(str.length);
  for (var i = 0; i < str.length; i++) {
      byteNumbers[i] = str.charCodeAt(i);
  }
	return new Blob(byteNumbers, {type: 'image/png'});
}

// ArrayBuffer to blob
var buffer = new ArrayBuffer(32);
var blob = new Blob([buffer]);       // 注意必须包裹[]


// dataURL（base64）转换为Blob对象
function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type: mime});
}
//test:
var blob = dataURLtoBlob('data:text/plain;base64,YWFhYWFhYQ==');

// dataURL（base64）转换为Blob对象
function b64toBlob(b64Data, contentType, sliceSize) {
  contentType = contentType || '';
  sliceSize = sliceSize || 512;

  var byteCharacters = atob(b64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);
    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    var byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  var blob = new Blob(byteArrays, {type: contentType});
  return blob;
}

// blob to arraybuffer
var blob = new Blob(); // blob是要转换的blob
var fr = new FileReader();
fr.onload = function () {
  var result = this.result; // result是转换后的结果
}
fr.readAsArrayBuffer(blob);

// Blob对象 to dataURL-base64
function blobToDataURL(blob, callback) {
    var fr = new FileReader();
    fr.onload = function (e) { callback(e.target.result); }
    fr.readAsDataURL(blob);
}

// blob to file
function blobToFile(theBlob, fileName){
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
}

// or blob to file
var file = new File([myBlob], "name");
