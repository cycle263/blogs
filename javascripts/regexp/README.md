## 正则

[regexp](http://javascript.ruanyifeng.com/stdlib/regexp.html#toc15)

String.prototype.replace方法的第二个参数可以使用美元符号$，用来指代所替换的内容。

  - $& 指代匹配的子字符串。  
  - $\` 指代匹配结果前面的文本。  
  - $' 指代匹配结果后面的文本。  
  - $n 指代匹配成功的第n组内容，n是从1开始的自然数。  
  - $$ 指代美元符号$。  

  ```
  var prices = {
    'pr_1': '$1.99',
    'pr_2': '$9.99',
    'pr_3': '$5.00'
  };

  var template = '/* ... */'; // 这里可以放网页模块字符串

  template.replace(
    /(<span id=")(.*?)(">)(<\/span>)/g,
    function(match, $1, $2, $3, $4){
      return $1 + $2 + $3 + prices[$2] + $4;
    }
  );

  editorContent.replace(
    /<img .* (width=".*") (height=".*")\/>/g,
    function(match, $1, $2, $3, $4){
      return match.replace($1,'').replace($2,'')
    }
  );
  ```

* 懒惰模式正则(非贪婪模式)

  > 在* + 后面加个？表示懒惰模式，也就是匹配到一次就不匹配了，偷懒噻。正则默认是贪婪模式，也就是在满足匹配时，匹配尽可能长的字符串

  `('src="test.jpg"').match(/src="(.*?)"/)[1]`    // .表示除了\n之外的任意字符。

  - 常见的非贪婪匹配

  ```
  *? 重复任意次，但尽可能少重复
  +? 重复1次或更多次，但尽可能少重复
  ?? 重复0次或1次，但尽可能少重复
  {n,m}? 重复n到m次，但尽可能少重复
  {n,}? 重复n次以上，但尽可能少重复
  ```
