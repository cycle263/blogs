## 声明文件

安装 TypeScript 时，会顺带安装一个 lib.d.ts 声明文件。这个文件包含 JavaScript 运行时以及 DOM 中存在各种常见的环境声明。

lib.d.ts 的内容主要是一些变量声明（如：window、document、math）和一些类似的接口声明（如：Window、Document、Math）。需要在全局模块中做这些修改，以使这些接口与 lib.d.ts 相关联，推荐你创建一个称为 global.d.ts 的特殊文件。可以通过 –noLib 来关闭这一功能。

* 环境声明就好像你与编译器之间的一个约定，如果在编译时它们不存在，但是你却使用了它们，程序将会在没有警告的情况下中断。

* 环境声明就好像是一个文档。如果源文件更新了，你应该同步更新。所以，当你在运行时有新的行为时，如果没有去更新环境声明，编译器将会报错。

* 函数声明

```js
// 声明方式1
type LongHand = {
  (a: number): number;
};

// 声明方式2
type ShortHand = (a: number) => number;
```