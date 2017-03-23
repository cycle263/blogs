## 错误收集

* velocity的宏需要重启生效

* velocity #if #else, #else 后面需要空格

* gbk中文编码占2个字节，utf-8中文编码占4个字节

  `%D6%D0%CE%C4   vs   %E4%B8%AD%E6%96%87   // 中文`

* XSS的过滤，使用velocity提供的xss过滤功能  

    - 1）对于html，可以使用  #SHTML($html)

    - 2）对于JS，可以用 #SJS($js)

    - 3）对于xml，可以使用#SXML($xml)

    - 4）屏蔽转义，可以使用#SLITERAL()
