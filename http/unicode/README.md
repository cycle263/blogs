## escape vs encodeURI(unicode vs utf-8)

  * escape
  escape方法把字符串生成十六进制转义序列字符（特色字符如: @*_+-./ 被排除在外），当该值小于等于0xFF时,用一个2位转移序列: %xx 表示. 大于的话则使用4位序列:%uxxxx 表示。目前该方法以及废弃，推荐使用encodeURI。escape 的编码有一个弊端在于，它后面是4位16进制，故不支持基本多文种平面（BMP）外的字符（unicode大于0xffff）的字符；而encodeURI是基于 UTF-8的，编码本身理论上可以支持0x10ffff内的字符（实际上现在的JavaScript不支持BMP外的字符，所以encodeURI也不支持 ）。

  ```
  escape("äöü");        // "%E4%F6%FC"
  escape("ć");          // "%u0107"
  ```

  * encodeURI
  encodeURI方法主要针对URL地址， encodeURI方法不会对下列字符编码： ASCII字母、数字、~!@#$&*()=:/,;?+'，
  ![保留字符](../images/encodeURI)


  * encodeURIComponent
  encodeURIComponent方法不会对下列字符编码： ASCII字母、数字、~!*()'

  备注：escape 在处理0xff之外字符的时候，是直接使用字符的unicode在前面加上一个 「%u」，而encodeURI则是先进行UTF-8，再在UTF-8的每个字节码前加上一个「%」；在处理0xff以内字符时，编码方式是一样的（都是「%XX」，XX为字符的16进制unicode，同时也是字符的UTF-8），只是范围（即哪些字符编码哪些字符不编码）不一样。encodeURI 是W3C 的标准，而 escape 是非标准。

  | 字符 | UTF-8编码十进制 | UTF-8编码十六进制  | Unicode编码十进制  | Unicode编码十进制 |
  |   -----------  |  ---------  |  ---------  |  ---------  |  ---------  |
  |   ä    | 50084 |	C3A4 |	228	|   E4  |
  |   ö    |	50102 |	C3B6 |	246 |	F6  |
  |   ü    |	50108 |	C3BC |	252 |	FC  |
  |   ć    |	50311 |	C487 |	263 |	107 |