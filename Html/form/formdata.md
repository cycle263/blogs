## formdata

* FormData对象会自动将form中的表单值也包含进去，包括文件内容也会被编码之后包含进去。将文件内容自动序列化成字符串（相当于readAsBinaryString的手动拼接字符串）

* 如果要处理文件的二进制流，则需要调用ArrayBuffer来处理二进制，完了再倒腾成Blob，再倒腾成FormData。
