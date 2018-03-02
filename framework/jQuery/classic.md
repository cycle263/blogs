* 1、全选复选框联动(jQuery版本)
	```js
	var $checkboxs = $("[name=items]:checkbox"),
	    $checkAll = $("$checkAll");
	$checkboxs.click(function(){
	    $checkAll.prop("checked", $checkboxs.filter(":checked").length === $checkboxs.length);
	});
	$checkAll.click(function(){
	    $checkboxs.prop("checked", this.checked);
	});
	```

* 2、jQuery.ajax模板总结
	- jQuery.ajaxPerfilter([dataTypes], handler(options, originalOptions, jqXHR)), 发送请求之前的一个全局过滤器。
	- jQuery.ajaxSetup, global属性为true,其他的全局方法才会生效，不论global为何值，跨域脚本和jsonp请求除外则永远不会生效
	- jQuery.ajaxSend, 请求发送之前
	- jQuery.ajaxStart，jQuery请求前的全局方法，可以用在展示loadding，避免重复提交等。例如showLoading()
	- jQuery.ajaxStop，jQuery请求完全结束方法。
	- jQuery.ajaxComplete,
	- jQuery.stop,
	- jQuery.ajaxSuccess

	- 备注：0.UNSENT、1.OPENED、2.HEADERS_RECEIVED、3.LOADING、4.DONE、

* 3、deferred对象的总结
	- deferred.done(doneCallbacks)
	- deferred.fail(failCallbacks)
	- deferred.promise(), 返回延迟对象的Promise对象
	- deferred.reject(args), 拒绝延迟对象，传参调用失败的回调函数
	- deferred.rejectWith(context, [args]), 带上上下文的拒绝
	- deferred.resolve(args), 解决延迟对象，传参调用成功的回调函数
	- deferred.resolveWith(context, [args]), 带上下文解决延迟对象，传参调用成功的回调函数
	- deferred.then(doneCallbacks, failCallbacks)， 延迟对象得到解决或拒绝
	- deferred.alwarys(alwarysCallbacks), 不论延迟对象是解决还是拒绝，都有处理的程序
	- deferred.pipe([doneFilter], [failFilter]), 筛选器（和或）, 返回promise

* 4、选择器使用技巧
	- $('a[href^="http://"]'), 表示属性href值以http://开头的超链接元素
	- $('a[href$=".pdf"]'), 表示href值以后缀名pdf结尾的超链接

* 5、jQuery事件回调中的event和e
	- $(ele).click(function(e){});尽量在回调的形参中使用e,而不是event，因为event是javascript原生事件返回的，避免用jQuery事件重写

* 6、兄弟选择器siblings vs $("ele ~ ele") vs prevAll vs nextAll vs prevUtil vs parent vs parents vs closest
	- siblings(ele), 所有的同辈元素, ele参数可以进行过滤
	- $("ele1 ~ ele2"), 选择ele1元素后面的所有兄弟元素ele2
	- prevUtil(ele), 直到ele元素为止

* 7、获取元素内容contents vs html vs text
	- contents, 返回的是jQuery对象，
	- html, 返回的是string字符串, 包含元素，
	- text, 返回的是所有的textContent文本内容

* 8、input输入框和textarea键盘事件包含selectionStart、selectionEnd、selectionDirection属性，
	分别代表：选择文本开始位置，结束位置，选择方向。

* 9、快速获取URL查询字符串
	```js
	$.urlParam = function(name[, url]){
		var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(url || window.location.href) || '';
		return results[1] || '';
	}
	```
