webpack简单点来说就就是一个配置文件，所有的魔力都是在这一个文件中发生的。这个配置文件主要分为三大块:  

- 1、 entry 入口文件   让webpack用哪个文件作为项目的入口  

- 2、 output 出口    让webpack把处理完成的文件放在哪里  

- 3、 module 模块      要用什么不同的模块来处理各种类型的文件

## webpack命令

* `webpack --progress --colors`   编译进度和颜色
* `webpack --progress --colors --watch`   监控编译，代码变动后自动编译