通用唯一识别码（英语：Universally Unique Identifier，简称UUID）是一种软件建构的标准，亦为开放软件基金会组织在分布式计算环境领域的一部分。
UUID的目的，是让分布式系统中的所有元素，都能有唯一的辨识信息，而不需要通过中央控制端来做辨识信息的指定。
UUID是由一组32位数的16进制数字所构成，是故UUID理论上的总数为1632=2128，约等于3.4 x 1038。也就是说若每纳秒产生1兆个UUID，要花100亿年才会将所有UUID用完。

```
// @radix 或位运算基数
var guid = function(len, radix) {		
	var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
	var uuid = [], i;
	radix = radix || chars.length;

	if (len) {
		for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
	} else {
		var r;
		uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
		uuid[14] = '4';
		for (i = 0; i < 36; i++) {
			if (!uuid[i]) {
				r = 0 | Math.random()*16;
				uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
			}
		}
	}

	return uuid.join('');
};
```
or
```
function uuid(len, timeLen){
	var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	len = len || 36;
	timeLen = timeLen || 12;
	timeLen = timeLen > len ? len / 2 : timeLen;
	var rLen = len - timeLen, result = '';
	var time = Date.now();
	for(var i = 0; i < timeLen; ++i){
		result += chars.charAt(Math.floor(time % timeLen));
		time = time / 3;
	}
	for(var j = 0; j < rLen; ++j){
		result += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return result;
}
```
or
```
function uuid(){
	var crypto = window.crypto || window.msCrypto; // for IE 11
	if (crypto && crypto.getRandomValues) {
	  var rnds8 = new Uint8Array(16);
	  rng = function whatwgRNG() {
	    crypto.getRandomValues(rnds8);
	    return rnds8;
	  };
	} else {
	  var  rnds = new Array(16);
	  rng = function() {
	    for (var i = 0, r; i < 16; i++) {
	      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
	      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
	    }
	    return rnds;
	  };
	}
	return rng();
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
	var byteToHex = [];
	for (var j = 0; j < 256; ++j) {
	  byteToHex[j] = (j + 0x100).toString(16).substr(1);
	}
  var bth = byteToHex;
  return  bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]]
		+ '-' + bth[buf[i++]] + bth[buf[i++]]
		+ '-' + bth[buf[i++]] + bth[buf[i++]]
		+ '-' + bth[buf[i++]] + bth[buf[i++]]
		+ '-' + bth[buf[i++]] + bth[buf[i++]]
		+ bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]];
}

// use
bytesToUuid(uuid())		// 48cf628e-f3e7-0cb1-6f58-dd309c874e9f
```
