## npm scripts -- CLI Commands

Npm script是npm的内置功能，npm脚本都存放在package.json文件里的scripts字段里，也可以直接运行nodejs脚本。scripts字段是一个对象，它的每一个属性，对应一段shell脚本，其底层实现原理是通过调用shell去运行脚本命令。这些定义在package.json里面的脚本，就称为npm脚本。

* **脚本原理**

  每当执行`npm run`，就会自动新建一个Shell，在这个 Shell 里面执行指定的脚本命令。因此，只要是Shell（一般是 Bash）可以运行的命令，就可以写在npm 脚本里面。
  
  比较特别的是，`npm run`新建的这个Shell，会将当前目录的`node_modules/.bin`子目录加入PATH变量，执行结束后，再将PATH变量恢复原样。由于npm脚本的唯一要求就是可以在 shell 中执行，因此它不一定是Node 脚本，任何可执行文件都可以写在里面。

  例如：`npm run build` 其实就是一个软链接，指向`node_modules/.bin/webpack.js`脚本。

* 通配符和传参

  由于 npm 脚本就是 Shell 脚本，因为可以使用 Shell 通配符。*表示任意文件名，**表示任意一层子目录。向 npm 脚本传入参数，要使用 -- 标明。

  npm 脚本里面需要执行多个任务，那么需要明确它们的执行顺序。如果是并行执行（即同时的平行执行），可以使用&符号。如果是继发执行（即只有前一个任务成功，才执行下一个任务），可以使用&&符号。

* 脚本钩子

  npm 脚本有pre和post两个钩子。举例来说，build脚本命令的钩子就是prebuild和postbuild。用户执行`npm run build`的时候，会自动按照下面的顺序执行。
  
  `npm run prebuild && npm run build && npm run postbuild`

  npm 默认提供下面这些钩子:

  - prepublish，postpublish
  - preinstall，postinstall
  - preuninstall，postuninstall
  - preversion，postversion
  - pretest，posttest
  - prestop，poststop
  - prestart，poststart
  - prerestart，postrestart

* 脚本简写

  `npm start` 是 `npm run start`

  `npm stop` 是 `npm run stop`的简写

  `npm test` 是 `npm run test`的简写

  `npm restart` 是 `npm run stop && npm run restart && npm run start`的简写

* 多个script命令执行

  ```js
  npm run script1.js & npm run script2.js     // 并行执行（同时执行）

  npm run script1.js && npm run script2.js    // 继发执行 （执行完前一个才执行下一个）
  ```

* 脚本变量

  npm 脚本有一个非常强大的功能，就是可以使用 npm 的内部变量。
  
  **如果是 Bash 脚本**，可以用`$npm_package_name`和`$npm_package_version`拿到package.json里面的字段。还可以通过npm_config_前缀，拿到 npm 的配置变量，即`npm config get xxx`命令返回的值。

  - 参数：`npm_package_name, npm_package_version` (环境变量中以"npm_config_"开头的都被解释为配置选项)

  - config 添加一些设置，可以供scripts读取用，同时这里的值也会被添加到系统的环境变量中。

    ```json
    config: {
      port: "8080"
    }
    ```

    优先级：`命令行 > 环境变量 > 用户配置文件 > 全局配置 > 内置配置文件 > 默认配置`

  - engines  

    指定包运行的环境

    ```json
    engines: {
      node: ">=0.10.3 < 0.12",
      npm: "~1.0.20"
    }
    ```

* 常见示例

  ```json
  // 删除目录
  "clean": "rimraf dist/*",
  // 本地搭建一个 HTTP 服务
  "serve": "http-server -p 9090 dist/",
  // 打开浏览器
  "open:dev": "opener http://localhost:9090",
  // 实时刷新
  "livereload": "live-reload --port 9091 dist/",
  // 构建 HTML 文件
  "build:html": "jade index.jade > dist/index.html",
  // 只要 CSS 文件有变动，就重新执行构建
  "watch:css": "watch 'npm run build:css' assets/styles/",
  // 只要 HTML 文件有变动，就重新执行构建
  "watch:html": "watch 'npm run build:html' assets/html",
  // 部署到 Amazon S3
  "deploy:prod": "s3-cli sync ./dist/ s3://example-com/prod-site/",
  // 构建 favicon
  "build:favicon": "node scripts/favicon.js",
  ```

* 常见错误

  - window环境不支持`${npm_package_family}/${npm_package_name}`变量方式来指定路径，估计原因：window环境不是bash脚本，不支持${}写法，可以将脚本移到单独的node js文件里执行。可以安装cross-env包解决。

  - 设置NODE_ENV参数在cmd中报错(bash中是否报错？)，`NODE_ENV=development` -> `set NODE_ENV=development` 或者使用cross-env库 `cross-env NODE_ENV=production`

  - 单引号无法使用，建议使用双引号。`"start": "dora --plugins 'proxy,webpack,webpack-hmr'",`
  -->  `"start": "dora --plugins \"proxy,webpack,webpack-hmr\"",`

[npm scripts详解参见](http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html)