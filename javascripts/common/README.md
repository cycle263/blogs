## 技巧

* 判断类型
  Object.prototype.toString.call([]).slice(8,-1)；

* HTML特殊字符的饭转义

  ```js
  // HTML特殊字符反转义(&amp; => &, &copy; => ©, &nbsp; => 空格 )
	function HTMLDecode(text) {
		var temp = document.createElement("div");
		temp.innerHTML = text;
		var output = temp.innerHTML;
		temp = null;
		return output;
	}
  ```
