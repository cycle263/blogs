## position

* relative

* absolute

* fixed

* static

* sticky(粘性布局)

表现为吸附，常见用于吸顶、吸底（例如手机APP的底部切换栏，顶部的title栏）。基本上，可以看出是position:relative和position:fixed的结合体——当元素在屏幕内，表现为relative，就要滚出显示器屏幕的时候，表现为fixed。

* 兼容性

移动端大部分浏览器支持良好，完全兼容可以考虑使用polyfill - [stickyfill](https://github.com/wilddeer/stickyfill)

```js
if (CSS.supports('position', 'sticky') || CSS.supports("position", "-webkit-sticky")) {

}
```

* 样式特性

- sticky 不会触发 BFC

- 样式表 z－index 无效，但在行内 style 有效

- 父级元素不能有任何overflow:visible以外的overflow设置，否则没有粘滞效果

- 同一个父容器中的sticky元素，如果定位值相等，则会重叠；如果属于不同父元素，则会鸠占鹊巢，挤开原来的元素，形成依次占位的效果。

### 参考资料

[说说position:sticky](https://www.zhangxinxu.com/wordpress/2018/12/css-position-sticky/)