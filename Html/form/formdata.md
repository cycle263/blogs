## formdata

* FormData对象会自动将form中的表单值也包含进去，包括文件内容也会被编码之后包含进去。将文件内容自动序列化成字符串（相当于readAsBinaryString的手动拼接字符串）

* 如果要处理文件的二进制流，则需要调用ArrayBuffer来处理二进制，完了再倒腾成Blob，再倒腾成FormData。

## FormData 操作方法

* get

  `formData.get("name"); // 获取key为name的第一个值`
  `formData.getAll("name"); // 返回一个数组，获取key为name的所有值`

* append

  ```
  formData.append("k1", "v1");
  formData.append("k1", "v2");
  formData.append("k1", "v1");

  formData.get("k1"); // "v1"
  formData.getAll("k1"); // ["v1","v2","v1"]
  ```

* set
