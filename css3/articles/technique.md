## css使用技巧

* 1、对空链接使用属性选择器

  当 <a> 中没有文本而 href 不为空的时候，显示其链接：
  ```
  a[href^="http"]:empty::before {
    content: attr(href);
  }
  ```

* 2、继承 box-sizing

  让 box-sizing 继承自 html ：
  ```
  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  ```

* 3、使用负的 nth-child 选取元素

  使用负的 nth-child 在 1 到 n 之间选择元素：
  ```
  li {
    display: none;
  }
  
  /* 选择第1到3个元素并显示它们 */
  li:nth-child(-n+3) {
    display: block;
  }
  ```
  当然，如果你了解 :not() 的话，还可以这么做：
  ```
  li:not(:nth-child(-n+3)) {
    display: none;
  }
  ```

* 4、CSS Filters  修改图片的颜色

  ```
  /* simple filter */
  .myElement {
    -webkit-filter: blur(2px);
  }
  /* advanced filter */
  .myElement {
    -webkit-filter: blur(2px) grayscale (.5) opacity(0.8) hue-rotate(120deg);
  }
  ```

* 5、CSS Counters

  ```
  这个特性可以把一个 counter 加到元素中，通过 :before 或 :after ：
  /* initialize the counter */
  ol.slides {
    counter-reset: slideNum;
  }
  /* increment the counter */
  ol.slides > li {
    counter-increment: slideNum;
  }
  /* display the counter value */
  ol.slides li:after {
    content: "[" counter(slideNum) "]";
  }
  ```

* 6、文本溢出省略的处理方法

  - 1)单行文本溢出
  ```
  .inline{
    overflow:hidden;
    white-space:nowrap;
    text-overflow:ellipsis; 
  }
  ```
  
  - 2)多行文本溢出
  ```
  .foo{
    display:-webkit-box!important;
    overflow:hidden;
    text-overflow:ellipsis;
    work-break:break-all;
    -webkit-box-orient:vertical; /*方向*/
    -webkit-line-clamp:4; /*显示多少行文本*/
  }
  ```

* 7、CSS实现垂直水平居中

  - 方法1:
  ```
  .parent {
    width:800px;
    height:500px;
    border:2px solid #000;
    position:relative;
  }
  .child {
    width:200px;
    height:200px;
    margin: auto;  
    position: absolute;  
    top: 0; left: 0; bottom: 0; right: 0;   //占位100%
    background-color: red;
  }
  ```
  - 方法2：
  ```
  .parent {
    width:800px;
    height:500px;
    border:2px solid #000;
    display:table-cell;
    vertical-align:middle;
    text-align: center;
  }
  .child {
    width:200px;
    height:200px;
    display:inline-block;
    background-color: red;
  }
  ```
  - 方法3：
  ```
  .parent {
    width:800px;
    height:500px;
    border:2px solid #000;
    display:flex;
    justify-content:center;
    align-items:center;
  }
  .child {
    width:200px;
    height:200px;
    background-color: red;
  }
  ```
  - 方法4：
  ```
  .parent {
    width:800px;
    height:500px;
    border:2px solid #000;
    position:relative;
  }
  .child {
    width:300px;
    height:200px;
    margin:auto;
    position:absolute;
    /*设定水平和垂直偏移父元素的50%，
    再根据实际长度将子元素上左挪回一半大小*/
    left:50%;
    top:50%;
    margin-left: -150px;
    margin-top:-100px;
    background-color: red;
  }   
  ```
