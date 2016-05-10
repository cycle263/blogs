* 1、表格单词换行问题

  - word-wrap: normal | break-word
    内容将在边界内换行，如果指定为break-word，词内换行（word-break）也将发生。 
  
  - word-break: normal  | break-all  |  keep-all     
  
    normal: 依照亚洲语言和非亚洲语言的文本规则，允许在字内换行。   
    break-all: 该行为与亚洲语言的normal相同。也允许非亚洲语言文本行的任意字内断开。该值适合包含一些非亚洲文本的亚洲文本。   
    keep-all: 与所有非亚洲语言的normal相同。对于中文，韩文，日文，不允许字断开。适合包含少量亚洲文本的非亚洲文本 。
    
  - table-layout:  auto | fixed        
  
    auto: 默认的自动算法。布局将基于各单元格的内容。表格在每一单元格读取计算之后才会显示出来。速度很慢。   
    fixed:  固定布局的算法。在这算法中，水平布局是仅仅基于表格的宽度，表格边框的宽度，单元格间距，列的宽度，而和表格内容无关。
    
  - white-space: normal | pre | nowrap 
  
    normal: 默认值。默认处理方式。文本自动处理换行。假如抵达容器边界内容会转到下一行 
    pre: 换行和其他空白字符都将受到保护。这个值需要IE6+或者 !DOCTYPE 声明为 standards-compliant mode 支持。
      如果 !DOCTYPE 声明没有指定为 standards-compliant mode ，此属性可以使用，但是不会发生作用。结果等同normal。 
    nowrap: 强制在同一行内显示所有文本，直到文本结束或者遭遇 br 对象。参阅 noWrap 属性 


* 2、当一个元素的 position 值为 absolute 或 fixed 的时候，会发生三件事：
  - 1. 把该元素往 Z 轴方向移了一层，元素脱离了普通流，所以不再占据原来那层的空间，还会覆盖下层的元素。
  - 2. 该元素将变为块级元素，相当于给该元素设置了 display: block;（给一个内联元素，如 <span> ，设置 absolute
之后发现它可以设置宽高了）。
  - 3. 如果该元素是块级元素，元素的宽度由原来的 width: 100%（占据一行），变为了 auto。
