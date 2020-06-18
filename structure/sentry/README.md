# React 项目接入 Sentry

## 1. 注册 Sentry

1. 联系管理员获取邀请链接

2. 点击管理员发送的邀请链接并创建账号

3. 点击邀请链接进入加入页面，接受邀请后，注册激活账号

4. 账号激活后进入主页面，选择所在的 team 就可以看到 team 中的项目了！

## 2. 生成项目 DSN（Data Source Name）

DSN 是 sentry-sdk 在上传错误到 sentry 服务器 的唯一凭证，每个项目都会有一个唯一的 DSN

### 2.1 创建项目

打开此地址 `/organizations/sentry/projects/new/`进入项目创建页

### 2.2 获取 DSN

根据如上步骤配置后点击创建按钮即可看到配置教程，根据教程中的步骤配置到你的项目中，其中 DSN 尤为重要，不要复制错了！也可以在 这个地址中找到 `/settings/sentry/projects/{ 项目名称 }/keys`

## 3. React 项目初步集成

### 3.1 添加@sentry/browser（官方 JS Sentry-sdk）

```shell
yarn add @sentry/browser
```

### 3.2 配置 JS Sentry-sdk `@sentry/browser`

> 配置 sentry-sdk 时有三个重要字段需要配置

1. [DSN](#2.2 获取 DSN)：上传错误的识别码，包括 Sentry 服务器地址和一个凭证.（为避免协议的不同跨域问题，可将 ip 端口替换成域名）

2. release：当前项目版本

3. environment：当前软件部署的环境，一般是`灰度`或`生产环境`等

```js
// src/sentry.js
import * as Sentry from "@sentry/browser";
import { version } from "../package.json"; // 项目的版本
// 这里是sentry上报错误的唯一凭证（每个项目对应一个DSN）
const DSN = "The DSN for your project";
function configSentry() {
  return Sentry.init({
    dsn: DSN,
    release: version,
    environment: "production" // 线上
  });
}
export default configSentry();
```

将 sentry.js 引入项目入口文件

```js
// src/index.js
import "./sentry.js";
import React from "react";
```

你可以在项目中随意抛出一个异常作为测试，Sentry 服务器已经可以监听到项目中抛出的错误信息了，至此，Sentry 的初步集成已经完成了！

<br>

## 4. Sentry 命令行工具

Sentry 作为一个功能强大的`错误监听/分析`工具，她提供的网页可以完成大多数操作。Sentry-cli 可以通过在项目中创建的`Api-Key`作为交互凭证与 sentry 服务器做交互，用于一些高级操作！[Sentry-cli Doc >>](https://docs.sentry.io/cli/)

### 4.1 安装 Sentry-cli

Sentry 提供了多种安装方式，可选择一种方便的安装即可：

```
npm install @sentry/cli --global
```

```
brew install getsentry/tools/sentry-cli
```

### 4.2 配置 Sentry-cli

sentry-cli 在与服务器交互时需要一下凭证和交互说明，为了不每次都在命令中敲入这些凭证和说明，可以通过配置`.sentryclirc`来实现：

```shell
[defaults]
# sentry服务器地址
url=http://sentry-url/
# 当前项目所属组织
org=xxx
# 当前项目名称
project=xxx

[auth]
# api-key
token=api-key
```

## 5. Sentry 的高级配置

经过上面一系列的的配置 Sentry 只能监听到错误以及调用栈，为了在进行错误分析的时候更清楚看到错误发生的原因甚至 git 仓库的 commit 等，就需要进行进一步的配置

### 5.1 上传 sourceMap

项目上线后的代码一般都是经过压缩/混淆的，为了能看到错误在源码的哪一行发生，我们要对代码进行还原，因此需要 sourcemap 文件，以 webpack 工程为例，我们需要把项目的 sourcemap 文件上传至 sentry 服务器对应的`组织-项目`下，这样 sentry 在收到 sentry-sdk 上传的错误时就可以自动根据 sourcemap 分析出报错的代码行

Sentry 提供了两种方式上传 sourcemap：

#### 5.1.1 Sentry-cli 上传 sourceMap

通过命令行工具 sentry-cli 上传，不是很推荐这个方式，因为命令行与前端工程配合起来不是很方便

```shell
sentry-cli releases -o 组织 -p 项目 files 版本 upload-sourcemaps js文件所在目录 --url-prefix 线上资源URI
```

#### 5.1.2 通过[`@sentry/webpack-plugin`](https://github.com/getsentry/sentry-webpack-plugin) 上传 sourceMap （`推荐` ）

通过 Sentry 官方提供的插件更好地配合 webpack 工程，配置也相对友好，具体可配置项可参考官网文档

1. 安装@sentry/webpack-plugin

   ```shell
   yarn add @sentry/webpack-plugin --dev
   ```

2. 配置到 webpack

   将插件配置到 webpack 的插件流中

   ```js
   const SentryPlugin = require("@sentry/webpack-plugin");
   const version = require("./package.json").version;
   const config = {
     // 配置中要将这个选项打开，以便webpack生成sourceMap
     devtool: "source-map",
     chainWebpack(config) {
       config.plugin("SentryPlugin").use(
         new SentryPlugin({
           release: version,
           // 要上传sourceMap的文件
           include: "./dist",
           // js资源路径相对于域名的路径
           // 比如在network面板中js路径为 //www.cnd.com/path/to/js/main.js
           urlPrefix: "~/path/to/js/",
           ignore: ["node_modules"]
         })
       );
     }
   };
   ```

3. 由于官方的插件暂时没有提供在上传完以后删除 sourcemap 的选项，所以我们需要在上传完之后手动将 sourceMap 删除以防止 sourceMap 传到线上服务器后导致源码泄露！可以使用以下命令在构建指令之后执行

   ```shell
   find ./dist -name '*.map' | xargs rm -rf

   # 可以这样与构建指令一起执行
   yarn build && find ./dist -name '*.map' | xargs rm -rf
   ```

   上传完 sourcemap 后，就可以看见错误具体在哪一行了，这样可以更加精准地定位错误

   上传的 sourceMap 当然也可以通过 sentry 的页面或 sentry-cli 管理起来，可以查看和删除

   上传的 sourceMap 可以在项目中的 release 面板中的`Artifacts`中查看/管理，可以直接通过 sentry-cli 来管理

   ```shell
   # 删除sourceMap
   sentry-cli releases files SCM-1915 delete --all
   ```

   > Sentry 中有些词比较专业，符合外国人的交流，我们看起来可能比较陌生。Artifacts 直译为工件，顾名思义可知道这里是我们用于分析源码的原材料。

   可能你进入了 Release 面板中发现其中是没有内容的，这是因为这个功能还没有被完全配置，这里会与 github/gitlab 做关联，让你可以直观地看见当前版本修改的文件等

### 5.2 关联 gitlab/github

为了更好地完善工作流，我们需要把 Sentry 与我们的代码仓库 gitlab 关联起来，这样可以在分析错误时候知道具体是哪一次 commit 出的问题，也可以更方便地把错误分配给具体的研发伙伴。也可以通过 sentry 直接在 github 上创建 issue

- 跟踪提交和发布
- 从 Sentry 创建 GitLab-Issue
- 通过 GitLab 提交解决 Sentry 问题并通过`Fixes PROJ-ID`在消息中包含来合并请求

#### Sentry 集成 gitlab

首先需要在`/settings/sentry/integrations/`中添加 gitlab 集成，install 之后直接添加一个 gitlab 应用

点击【添加并安装】进入配置教程，跟随教程一步步往下即可完成 gitlab 集成..，也可参照[文档](https://docs.sentry.io/workflow/integrations/global-integrations/#github)，这里就不再赘述

### 5.3 关联 commit 和版本

Sentry 主要用于错误的监控，而我们在使用错误监控时候一般都是在发布了某个重要的版本之后，sentry 为了配合我们现有的工作流也有一个`发布-版本`的概念，即我们[初始化>>](#3.2 配置 JS Sentry-sdk `@sentry/browser`)时候填入的 `release` 字段，这个字段是 sentry 对错误分类最为重要的一个依据。

一般我们会使用 git 来做代码管理，每次 App 发布一个新版本，都会产生几十条甚至上百条的 commit-log。所以，我们需要用一个特殊的字段来标记版本，而不是通过 commit-log，这样即不直观，也不符合规范。

怎么让 sentry 知道哪些 commit-log 是一个版本呢？我们需要使用 sentry-cli 来创建一个`发布对象`并将它与 git 仓库中的 commit-log 做关联

1. 在 Sentry 中创建一个发布版本

```shell
sentry-cli releases new -p project1 1.0.0
```

2. 将发布版本和 commit-log 做关联

```shell
sentry-cli releases set-commits --auto 1.0.0
```

`sentry-cli releases set-commits` 会自动确定之前的版本号和本此版本之间产生了哪些 commit-log，如果是第一次提交关联，会采用最新的 10 个 commit-log

### 5.4 创建部署环境

我们的产品一般都会经过 `开发--测试--上线` 等流程，在这一流程中我们可能会将 app 部署到不同的环境，例如：

- 联调/演示环境
- 灰度
- 线上

我们可能在这些环境都设置了 Sentry 来监控错误，所以我们需要创建相应的部署环境让 sentry 可以做分类

例，我们将之前创建的 1.0.0 版本部署到了`灰度`和`线上`环境：

```shell
sentry-cli releases deploys 1.0.0 new -e gray
sentry-cli releases deploys 1.0.0 new -e production
```

通过以上命令来让 sentry 知道我们会将应用发布到 `gray` + `production` 环境，sentry 会提前为这两个环境做好分类，等待这些环境发布上来的错误

因此，在提交错误的时候也要有对应的环境说明，即在[初始化>>](#3.2 配置 JS Sentry-sdk `@sentry/browser`)传入的 `environment` 字段

到这里 Sentry 的高级配置已经基本完成了

## 6. 总结

整个 Sentry 的接入不算复杂，只是需要对她做一系列的配置，还有一些概念性的东西需要理解

这只是一个配置说明，具体还要结合前端的工程化以及 CI 工具来实现一些自动化操作，比如前端项目在开发和构建时怎么实现错误上报等

总结一下，监控不代表我们的代码不会出 bug，而是在出现 bug 之后更好地分析原因，提升用户体验和产品质量。另外，也可以促进我们平时编码质量。

### 参考资料

[sentry官网文档](https://docs.sentry.io/)
