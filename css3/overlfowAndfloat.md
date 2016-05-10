* 1、父元素宽度固定，子元素img宽度超过父元素,可使用max-width避免图片溢出；通用可以使用word-break:break避免超长单词溢出；

* 2、闭合浮动，撑高父容器的几种方法：

    - ①. 添加额外标签--样式clear: both，或者增加伪元素：:after清除;
        ```css
        .clearfix{
           *zoom:1;           //触发IE hasLayout 
        }
        .clearfix:after{
           content:".";       //生成内容作为最后一个元素
           display:block;     //使生成的元素以块级元素显示,占满剩余空间
           height:0;          //避免生成内容破坏原有布局的高度
           visibility:hidden; //使生成的内容不可见，并允许可能被生成内容盖住的内容可以进行点击和交互
           clear:both;
        }
        
        
        .clearfix{
           *zoom:1;
        }
        .clearfix:after{
           content:"";
           display:table;
           clear:both;
        }
        ```
    
    - ②. 使用 br标签和其自身的 html属性<br clear="all">
    
    - ③. 父元素设置 overflow：hidden 或者 display:table；
    
    背后的原理：触发BFC，解决父容器塌陷问题。
    
    使用BFC清除浮动的局限性:使用float的时候会使父容器长度缩短，而且还有个重要缺陷，父容器float解决了其塌陷问题，那么父容器的父容器怎么办，
    
    难道要全部使用float吗,overflow内容增多时候容易造成不会自动换行导致内容被隐藏掉，无法显示需要溢出的元素，position会改变元素的定位方式，
    
    这是我们不希望的，display改变盒模型属性，BFC的几种方式都有各自的问题，但应掌握原理，活学活用。
    
* 3、那么如何触发BFC(块级格式化上下文)呢？

    - 1. float 除了none以外的值 
 
    - 2. overflow 除了visible 以外的值（hidden，auto，scroll ） 
 
    - 3. display (table-cell，table-caption，inline-block) 
 
    - 4. position（absolute，fixed） 
 
    - 5. fieldset元素

* 4、BFC有哪些特性？

    - 1. 阻止外边距叠加
    
        当两个相邻的块框在同一个块级格式化上下文中时，它们之间垂直方向的外边距会发生叠加。
        换句话说，如果这两个相邻的块框不属于同一个块级格式化上下文，那么它们的外边距就不会叠加。
        
    - 2. 不会重叠浮动元素
    
        因此，给一个挨着浮动的块级格式化上下文添加负的外边距时将会不起作用。
        
    - 3. 通常可以包含浮动
