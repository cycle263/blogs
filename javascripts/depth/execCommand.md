## execCommand 执行命令

当将HTML文档切换成设计模式时, `document.designMode = 'on'`，就会暴露出 execcommand 方法，该方法允许运行命令来操纵可编辑区域的内容。当使用contentEditable时，调用 execCommand() 将影响当前活动的可编辑元素。常见的命令，例如复制，剪切，修改选中文字粗体、斜体、背景色、颜色，缩进，插入图片等。

* 基本用法

  `document.execCommand(aCommandName, aShowDefaultUI, aValueArgument)  // Boolean`

  - aCommandName 命令的名称，例如：backColor、copy、cut、createLink、delete、justifyCenter等

  - aShowDefaultUI 是否展示用户界面，一般为 false。

  - aValueArgument 一些命令（例如insertImage）需要额外的参数。

* 案例

  ```js
  document.designMode = 'on';

  // 然后就可以使用execCommand 这个命令了；
  // 执行复制命令，复制选中区域
  doc.execCommand('copy')
  // 剪切选中区域
  doc.execCommand('cut')
  // 全选
  doc.execCommand('selectAll')
  // 将选中文字变成粗体，同时接下来输入的文字也会成为粗体，
  doc.execCommand('bold')
  // 将选中文字变成斜体，同时接下来输入的文字也会成为斜体，
  doc.execCommand('italic')
  // 设置背景颜色，，比如设置背景色为红色，就传入 'red'即可
  doc.execCommand('backColor',true,'red')
  ```
