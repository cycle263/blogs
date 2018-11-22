## package.json文件

- 常见package字段

  name, version, description, homepage, author, contributors, repository, keywords

- name - 模块名称（必填）

  小于等于214个字节，包括前缀名称在内（如 xxx/xxxmodule），不得以"_"或"."开头，不能含有大写字母，name会成为url的一部分，不能含有url非法字符

- bin - 内部命令软链接

  指定各个内部命令对应的可执行文件的位置。

  ```json
  {
    bin: {
      tool: "./menu/tool.js"
    }
  }
  ```

- config - 命令行的环境变量

  ```json
  {
    config: {
      port: "8004"
    } 
  }
  ```

- engines - 模块运行的平台

  `{ "engines" : { "node" : ">=0.10.3 <0.12" } }`

- version - 版本号（必填）

  版本号一般格式： `x.y.z`，分别代表 `大版本号.小功能版本号.小修改小修复`，也可以理解为 `major.minor.patch`，`主版本号.次版本号.修补版本号`

  x 表示大版本号，一般当软件整体重写，或出现不向后兼容的改变时，增加x，x为零时表示软件还在开发阶段。  

  y 表示功能更新，出现新功能时增加y  

  z 表示小修改，如修复bug，只要有修改就增加z  

* ^ 表示兼容某个版本，意味着最左边的非零数字不可以变动，其他数字往上任意；例如：

  ^1.1.2 ，表示>=1.1.2 <2.0.0，可以是1.1.2，1.1.3，.....，1.1.n，1.2.n，.....，1.n.n

  ^0.2.3 ，表示>=0.2.3 <0.3.0，可以是0.2.3，0.2.4，.....，0.2.n

  ^0.0，表示 >=0.0.0 <0.1.0，可以是0.0.0，0.0.1，.....，0.0.n

* ~ 大概某个版本，指定 MAJOR.MINOR 版本号下，所有更新的版本

  匹配 2.2.3, 2.2.9 ; 不匹配 2.3.0, 2.4.5

* 任意两条规则，用空格连接起来，表示“与”逻辑，即两条规则的交集；任意两条规则，通过 || 连接起来，表示“或”逻辑，即两条规则的并集。


资料参见

[package.json文件](http://javascript.ruanyifeng.com/nodejs/packagejson.html)

[package字段详解](http://www.cnblogs.com/tzyy/p/5193811.html)
