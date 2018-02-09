## cookie

ajax和jsonp默认是带上cookie；cors跨域和fetch默认是不带上cookie；

fetch要带上cookie需设置options  -  credentials属性，可设置为include(任意域名都带上)或者same-origin

cors跨域请求，可加上这个option `xhrFields: { withCredentials: true }, crossDomain: true, `