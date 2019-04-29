## 布局

* 表格布局 - table-cell

  最早的网页布局

* 浮动布局 - float

  float起初并不是用来网页布局的，而是用来解决图文信息中图片与文本冲突的问题。float带来的最大问题是，高度塌陷。

* 弹性布局 - flex

  目前h5页面最常见的布局方式，也是比较适合一维布局的。

* 格栅布局 - grid

  在两个维度上创建一个完整的布局，同时使用行和列，那么你应该使用Grid。Grid比较适合二维布局。

* 定位布局 - position

  position定位布局，相对定位，绝对定位和固定定位。不过position需要计算每一个元素的位置，而且这个位置是定死的，略显繁琐和笨重。

* 流体布局  

* 双飞翼和圣杯布局

* 响应式布局

  常用响应式CSS长度单位：

  - 百分比

  - px

  - rem

  - vw、vh (viewport width | viewport height)

  媒体查询

    ```css
    @media screen and (max-width: 980px) {
      #head { … }
      #content { … }
      #footer { … }
    }
    ```

* ruby

* box alignment

### 参考资料

[格栅化和响应式](https://www.uisdc.com/grid-systems-do-responsive-design)

[响应式概念](https://baike.baidu.com/item/%E5%93%8D%E5%BA%94%E5%BC%8F%E7%BD%91%E9%A1%B5%E8%AE%BE%E8%AE%A1/2519669?fr=aladdin)