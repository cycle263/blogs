## fetch

fetch 号称是 AJAX 的替代品，是在 ES6 出现的，使用了 ES6 中的 promise 对象。Fetch 是基于 promise 设计的。Fetch 的代码结构比起 ajax 简单多了，参数有点像 jQuery ajax。但是，一定记住 fetch 不是 ajax 的进一步封装，而是原生 js。Fetch 函数就是原生 js，没有使用 XMLHttpRequest 对象。

- 优势

  - 更加底层，提供的 API 丰富（request, response）
  - 脱离了 XHR，是 ES 规范里新的实现方式

- 缺点

  - fetch 只对网络请求报错，对 400，500 都当做成功的请求，需要封装去处理
  - fetch 默认不会带 cookie，需要添加配置项
  - fetch 不支持 abort，不支持超时控制，使用 setTimeout 及 Promise.reject 的实现的超时控制并不能阻止请求过程继续在后台运行，造成了流量的浪费
  - fetch 没有办法原生监测请求的进度，而 XHR 可以
  - fetch 对象的 body.json 和 body.text 方法默认使用 utf-8 编码，并且无法修改编码格式

```js
fetch(fetchurl, {
  credentials: "include", // 默认值为omit 不带上cookie，include为任意地址都带上cookie
  method: "POST",
  headers: {},
  body: JSON.stringify(params)
});
```

![fetch body type](../../images/fetch.png)

### fetch 无法中断请求

通过创建一个 AbortController 实例，我们得到了一个 Fetch API 原生支持的控制中断的控制器。

```js
const controller = new AbortController();
const { signal } = controller;
fetch('/foo', { signal }).then(...);
signal.onabort = () => { ... };
controller.abort();
```

- 解决方案

### fetch 请求 gbk 数据乱码问题

fetch 默认的请求编码格式为 utf-8，若后端返回的 gbk 数据，修改 fetch 的请求编码格式，也不见效果

- 分析原因

  fetch 的方式中使用了 res.json 方法，默认使用的 utf-8 编码，导致乱码出现；使用 XMLHTTPRequest 设置 responseType 为 json 同样存在此问题，设置为 text 时不存乱码问题，因为浏览器会自动识别为 gbk 编码；总之，json 格式的默认编码为 utf-8。

  ```js
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://domain/question.json");
  xhr.responseType = "json"; // 去掉则不会出现乱码，但需要手动解析text为json
  xhr.onload = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200 || xhr.status === 0) {
        console.log(xhr.responseText);
      }
    }
  };
  xhr.send(null);
  ```

- 解决方案

  ```js
  // method1
  fetch("http://domain/question.json")
    .then(res => res.blob())
    .then(blob => {
      var reader = new FileReader();
      reader.onload = function(e) {
        var text = reader.result;
        console.log(JSON.parse(text.replace(/\\"/gi, '"'))); // 转换为json
      };
      reader.readAsText(blob, "gbk"); // 用gbk编码格式读取
    });

  // method2
  // 使用动态script脚本方式，指定脚本编码为gbk

  // method3
  // 浏览器内置对象TextDecoder， decoder.decode(dataView)

  // method4
  function GB2312UTF8() {
    this.Dig2Dec = function(s) {
      var retV = 0;
      if (s.length == 4) {
        for (var i = 0; i < 4; i++) {
          retV += eval(s.charAt(i)) * Math.pow(2, 3 - i);
        }
        return retV;
      }
      return -1;
    };
    this.Hex2Utf8 = function(s) {
      var retS = "";
      var tempS = "";
      var ss = "";
      if (s.length == 16) {
        tempS = "1110" + s.substring(0, 4);
        tempS += "10" + s.substring(4, 10);
        tempS += "10" + s.substring(10, 16);
        var sss = "0123456789ABCDEF";
        for (var i = 0; i < 3; i++) {
          retS += "%";
          ss = tempS.substring(i * 8, (eval(i) + 1) * 8);
          retS += sss.charAt(this.Dig2Dec(ss.substring(0, 4)));
          retS += sss.charAt(this.Dig2Dec(ss.substring(4, 8)));
        }
        return retS;
      }
      return "";
    };
    this.Dec2Dig = function(n1) {
      var s = "";
      var n2 = 0;
      for (var i = 0; i < 4; i++) {
        n2 = Math.pow(2, 3 - i);
        if (n1 >= n2) {
          s += "1";
          n1 = n1 - n2;
        } else s += "0";
      }
      return s;
    };

    this.Str2Hex = function(s) {
      var c = "";
      var n;
      var ss = "0123456789ABCDEF";
      var digS = "";
      for (var i = 0; i < s.length; i++) {
        c = s.charAt(i);
        n = ss.indexOf(c);
        digS += this.Dec2Dig(eval(n));
      }
      return digS;
    };
    this.Gb2312ToUtf8 = function(s1) {
      var s = escape(s1);
      var sa = s.split("%");
      var retV = "";
      if (sa[0] != "") {
        retV = sa[0];
      }
      for (var i = 1; i < sa.length; i++) {
        if (sa[i].substring(0, 1) == "u") {
          retV += this.Hex2Utf8(this.Str2Hex(sa[i].substring(1, 5)));
          if (sa[i].length) {
            retV += sa[i].substring(5);
          }
        } else {
          retV += unescape("%" + sa[i]);
          if (sa[i].length) {
            retV += sa[i].substring(5);
          }
        }
      }
      return retV;
    };
    this.Utf8ToGb2312 = function(str1) {
      var substr = "";
      var a = "";
      var b = "";
      var c = "";
      var i = -1;
      i = str1.indexOf("%");
      if (i == -1) {
        return str1;
      }
      while (i != -1) {
        if (i < 3) {
          substr = substr + str1.substr(0, i - 1);
          str1 = str1.substr(i + 1, str1.length - i);
          a = str1.substr(0, 2);
          str1 = str1.substr(2, str1.length - 2);
          if (parseInt("0x" + a) & (0x80 == 0)) {
            substr = substr + String.fromCharCode(parseInt("0x" + a));
          } else if (parseInt("0x" + a) & (0xe0 == 0xc0)) {
            //two byte
            b = str1.substr(1, 2);
            str1 = str1.substr(3, str1.length - 3);
            var widechar = (parseInt("0x" + a) & 0x1f) << 6;
            widechar = widechar | (parseInt("0x" + b) & 0x3f);
            substr = substr + String.fromCharCode(widechar);
          } else {
            b = str1.substr(1, 2);
            str1 = str1.substr(3, str1.length - 3);
            c = str1.substr(1, 2);
            str1 = str1.substr(3, str1.length - 3);
            var widechar = (parseInt("0x" + a) & 0x0f) << 12;
            widechar = widechar | ((parseInt("0x" + b) & 0x3f) << 6);
            widechar = widechar | (parseInt("0x" + c) & 0x3f);
            substr = substr + String.fromCharCode(widechar);
          }
        } else {
          substr = substr + str1.substring(0, i);
          str1 = str1.substring(i);
        }
        i = str1.indexOf("%");
      }
      return substr + str1;
    };
  }
  ```

### 参考资料

[fetch vs xhr](https://stackoverflow.com/questions/35549547/fetch-api-vs-xmlhttprequest)

[stream vs fetch](https://segmentfault.com/a/1190000021367378)
