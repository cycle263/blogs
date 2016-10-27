## float详解

* 背景

  > 为了让文字环绕图片，出现了float属性，但目前float不仅仅干了浮动的活，还干了布局的活！

* 浮动的本质

  > 浮动就是具有破坏性和方向性的inline-block属性。会脱离文档流但是还会在文档流中占据位置, 后面的正常流元素会占据浮动元素本应占据的位置。[浮动案例](../../examples/float.html)

  - 浮动的“包裹性”  

    float和inline-block都同样具有包裹性，但float拥有方向性，并且带有一定破坏性。

  - 浮动的“破坏性”  

    float只所以会环绕，是因为它破坏了正常的inline boxes，高度也同时会塌陷。不过，浮动元素依然在正常的文档流当中。  


* 高度塌陷

  - 为什么会高度塌陷？

    含有浮动属性的元素破坏了inline-box, 进而破坏了line-box的高度，没有了高度自然塌陷

  - 什么情况下回塌陷？

    当标签没有实际高度时会塌陷

  - 如何解决高度塌陷？

    + 清除浮动

      清除浮动实际上就是清除浮动的破坏性，补偿浮动后的影响，也就是解决高度塌陷的问题。元素设置为float:left或者float:right之后，会脱离文档流，简单来讲，就是该元素的位置不属于该元素了。所以会造成浮动元素之后的元素替代占有该元素的位置。同样，也会造成父级元素高度不能自适应为子元素的高度。  

      常用的几种方法：  

        - 最后一个子元素后增加`<div style="clear:both;"></div>`  

        - overflow + zoom `.clearfix{overflow:hidden; zoom:1;}`  

        - after + zoom  
          ```
          .clearfix{zoom:1;}
          .clearfix:after{display:block; content:'clear both'; clear:both; height:0; visibility:hidden;}
          ```
