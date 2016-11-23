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
