## 常见

* contentType

  默认值： "application/x-www-form-urlencoded"

  jQuery.ajax 中 contentType 设置为 false 是为了避免 JQuery 对其操作，从而失去分界符，而使服务器不能正常解析文件。



## 有趣知识点

* js动态添加script的src地址：

  - html含有script元素，但没有src属性，可以动态添加src地址，并且download对应的资源下来；

  - html含有script元素，并有src属性，动态添加src地址不能download对应的资源；

  - js动态创建script元素，则可以多次download动态资源

  - iframe和img元素则可以多次添加src地址，并多次download资源