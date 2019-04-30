## css未来显示模块

* 内部显示类型 inner display type

  定义元素内部元素的布局方式

* 外部显示类型 outer display type

  定义元素外部元素的布局方式


## css常见知识

* text-decoration(设置文本排版)

* white-space: pre-wrap

  ![pre-wrap](./images/wrap.png)

* 多行溢出省略号

  ```css
  // 兼容性一般，需要兼容性好的，只能用js处理了
  overflow: hidden;
  word-break: break-all;
  word-wrap: break-word;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  ```

* 白屏和无内容样式闪烁

  - 原因分析

  白屏和无样式内容闪烁的产生主要与浏览器的渲染机制有关，有的浏览器(chrome, 是等待html和css全部加载完成后再进行渲染（白屏问题），有的浏览器(Firefox)是先显示已加载的html内容，等到css加载完成后重新对内容添加样式（FOUC问题）

* 渐进增强，利用@supports检测

  ```css
  .selector {
    /* Styles that are supported in old browsers */
  }

  @supports (property:value) {
    .selector {
      /* Styles for browsers that support the specified property */
    }
  }
  ```

### css3新特性

* scroll-snap （元素平滑定位增强）  [scroll-snap](https://www.zhangxinxu.com/wordpress/2018/11/know-css-scroll-snap/)
* scrollbar-width, scrollbar-color  (自定义滚动条)

* font-feature-settings, font-display（字体中的高级印刷功能、加载字体过程中后备字体）

* clip-path （区域内的部分显示，区域外的隐藏）
* stroke-width （指定svg对象的轮廓的宽度）
* object-fit(适用于img标签，类似于背景图的background-size)
* filter(滤镜)

  `filter: hue-rotate(0deg)   // 色相变化， 给图像应用色相旋转`
  - blur 高斯模糊
  - brightness 线性乘法，使其看起来更亮或更暗
  - contrast 对比度
  - drop-shadow  给图像设置一个阴影效果
  - grayscale 转为灰色图像
  - invert  反转输入图像
  - opacity  透明度
  - saturate  图像饱和度
  - sepia  将图像转换为深褐色

* border-image （允许在元素的边框上绘制图像）

* box-shadom
* shape-outside   非矩形的形状

  polygon（多边形）、circle、ellipse（椭圆）、path

* perspective （透视，景深）

* gradient (渐变)
* mask-composite(遮罩)
* mix-blend-mode(混合模式) / background-blend-mode

  当层重叠时计算像素最终颜色值，以此来修改图片颜色。

  normal | multiply | screen | overlay | darken | lighten | color-dodge | color-burn | hard-light | soft-light | difference | exclusion | hue | saturation | color | luminosity

* css-variables(--css)

  ```css
  :root{ 
    --color: red;
    a {
      color: var(--color);
    }
  }

  /* scss */
  $color: red;
  color: $color;

  /* less */
  @color: red;
  color: @color;
  ```

* Houdini - js in css(css parsing api, css layout api, CSS Properties and Values API, Worklets)


### 參考资料

[参考引用](https://www.jianshu.com/p/db82a546267a)

[css滚动进度条效果](https://juejin.im/post/5c35953ce51d45523f04b6d2)