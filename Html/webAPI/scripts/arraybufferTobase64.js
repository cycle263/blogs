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

or

var base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(arrayBuffer)));

or ES6

let base64String = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));


// arrayBuffer to string
function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint16Array(buf));
}

function str2ab(str) {
  var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
  var bufView = new Uint16Array(buf);
  for (var i=0, strLen=str.length; i<strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

// ArrayBuffer to Uint8
var buffer = new ArrayBuffer(32);
var blob = new Blob([buffer]);       // 注意必须包裹[]


// dataURL转换为Blob对象
function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(‘,‘), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}
//test:
var blob = dataURLtoBlob(‘data:text/plain;base64,YWFhYWFhYQ==‘);
