## json

* 隐藏域缓存json字符串

  一般情况可以JSON.stringify方法进行缓存，但也会出现截断情况，建议使用encodeURIComponent方法编码字符串。

  `<input type="hidden" value="%7B%22name%22%3A%22John%22%7D">`
