## width新属性值 fit-content/min-content

在css3中，width属性又多出几个属性值，如：fill-available、max-content、min-content、fit-content。

* fill-available

fill-available的作用就是自动填充剩余的空间，不仅仅可以使用在block元素，也可以使用在inline-block元素中。

* max-content / min-content

max-content 顾名思义就是content展示的最大空间尺寸，也就是取子元素最大宽度值中最大的那个;

min-content 则为最小的展示尺寸，也就是取子元素最小宽度值中最大的那个。

```html
<!-- 最终宽度为200px -->
<p style="width: min-cotnent;">
  <img width="200" height="100" src="" />
  <span>设置min-content，这是一段很长的文字，肯定超过了200px的长度</span>
</p>
```

* fit-content

表示宽度缩小到内容的宽度。

### 参考资料

[fit-content/min-content](https://www.zhangxinxu.com/wordpress/2016/05/css3-width-max-contnet-min-content-fit-content/)

[腾讯云fit-content](https://cloud.tencent.com/developer/section/1072091)