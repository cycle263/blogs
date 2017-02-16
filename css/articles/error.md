## css易错总结

* display: inline-block  同行两个inline-block出现上下错位不对齐。

  原因：元素的默认vertical-align是baseline，因为推断一个元素的baseline的位置，需要根据它使用的字体信息来推断，一个没有内容的inline-block也就没有了baseline。

  解决办法：设置span的vertical-align为bottom；或为span添加内容为空格；
