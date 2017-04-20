## formdata

* FormData对象会自动将form中的表单值也包含进去，包括文件内容也会被编码之后包含进去。将文件内容自动序列化成字符串（相当于readAsBinaryString的手动拼接字符串）

* 如果要处理文件的二进制流，则需要调用ArrayBuffer来处理二进制，完了再倒腾成Blob，再倒腾成FormData。

* 通过xhr发送数据

  ```
  var xhr = new XMLHttpRequest();
  xhr.open("post","login");
  xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");   // 设置request header为表单提交方式
  xhr.send(formData);

  ```

## FormData 操作方法

* get

  > 通过get(key)/getAll(key)来获取对应的value

  `formData.get("name"); // 获取key为name的第一个值`
  `formData.getAll("name"); // 返回一个数组，获取key为name的所有值`

* append

  > 通过append(key, value)来添加数据，如果指定的key不存在则会新增一条数据，如果key存在，则添加到数据的末尾

  ```
  formData.append("k1", "v1");
  formData.append("k1", "v2");
  formData.append("k1", "v1");

  formData.get("k1"); // "v1"
  formData.getAll("k1"); // ["v1","v2","v1"]
  ```

* set

  > 通过set(key, value)来设置修改数据，如果指定的key不存在则会新增一条，如果存在，则会修改对应的value值。

  ```
  formData.append("k1", "v1");
  formData.set("k1", "1");
  formData.getAll("k1"); // ["1"]
  ```

* has

  > 通过has(key)来判断是否对应的key值

* delete

  > 通过delete(key)，来删除数据，key也会被删除，has方法判断为false

* entries / values

  > 通过entries()来获取一个迭代器，然后遍历所有的数据.

  ```
  formData.append("k1", "v1");
  formData.append("k1", "v2");
  formData.append("k2", "v1");

  var i = formData.entries();

  i.next(); // {done:false, value:["k1", "v1"]}
  i.next(); // {done:fase, value:["k1", "v2"]}
  i.next(); // {done:fase, value:["k2", "v1"]}
  i.next(); // {done:true, value:undefined}

  var j = formData.values();

  j.next(); // {done:false, value:["k1", "v1"]}
  j.next(); // {done:fase, value:["k1", "v2"]}
  j.next(); // {done:fase, value:["k2", "v1"]}
  j.next(); // {done:true, value:undefined}
  ```
