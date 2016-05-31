## float详解

* 背景
  
  > 为了让文字环绕图片，出现了float属性，但目前float不仅仅干了浮动的活，还干了布局的活！

* 浮动的本质

  - 浮动的“包裹性”  
    
    float和inline-block都同样具有包裹性，但float拥有方向性，并且带有一定破坏性。

  - 浮动的“破坏性”  
  
    float只所以会环绕，是因为它破坏了正常的line boxes。
