## 文件分析和定位

node的require类似，[具体参见node源码](https://github.com/nodejs/node-v0.x-archive/blob/master/lib/module.js)

* 以 "./","../","/" 标识符开头的路径文件模块

  该类文件会通过path.join 转化为真实的路径而定位

* 文件模块

  - 在当前目录的node_modules下，查找文件，未找到则一路向上追寻，最终查找到或者抛出异常

  - 未带扩展名的，跟配置的extensions补充，未配置则以默认的.js、.jsx为后缀依次补充

  - 当发现该路径为文件夹时则，则依次查找：package.json(main字段)、index+(扩展名)