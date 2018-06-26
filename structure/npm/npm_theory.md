## npm 模块安装机制

  安装之前，npm install会先检查，node_modules目录之中是否已经存在指定模块。如果存在，就不再重新安装了，即使远程仓库已经有了一个新版本，也是如此。如果你希望，一个模块不管是否安装过，npm 都要强制重新安装，可以使用-f或--force参数。

  -- registry 指定安装依赖包镜像地址


## 模块的安装过程

  * 发出npm install命令

  * npm 向 registry 查询模块压缩包的网址

  * 下载压缩包，存放在~/.npm目录

  * 解压压缩包到当前项目的node_modules目录


## [npm scripts](http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html)

  > scripts字段是一个对象，它的每一个属性，对应一段脚本。这些定义在package.json里面的脚本，就称为npm脚本。

  * 脚本原理

    每当执行npm run，就会自动新建一个Shell，在这个 Shell 里面执行指定的脚本命令。因此，只要是Shell（一般是 Bash）可以运行的命令，就可以写在npm 脚本里面。
    
    比较特别的是，npm run新建的这个Shell，会将当前目录的node_modules/.bin子目录加入PATH变量，执行结束后，再将PATH变量恢复原样。

    由于npm脚本的唯一要求就是可以在 hell 执行，因此它不一定是Node 脚本，任何可执行文件都可以写在里面。

  * 通配符和传参

    由于 npm 脚本就是 Shell 脚本，因为可以使用 Shell 通配符。*表示任意文件名，**表示任意一层子目录。

    向 npm 脚本传入参数，要使用--标明。

    npm 脚本里面需要执行多个任务，那么需要明确它们的执行顺序。如果是并行执行（即同时的平行执行），可以使用&符号。如果是继发执行（即只有前一个任务成功，才执行下一个任务），可以使用&&符号。

  * 脚本钩子

    npm 脚本有pre和post两个钩子。举例来说，build脚本命令的钩子就是prebuild和postbuild。用户执行npm run build的时候，会自动按照下面的顺序执行。
    
    `npm run prebuild && npm run build && npm run postbuild`

    npm 默认提供下面这些钩子:

      prepublish，postpublish

      preinstall，postinstall

      preuninstall，postuninstall

      preversion，postversion

      pretest，posttest

      prestop，poststop

      prestart，poststart
      
      prerestart，postrestart

  * 脚本简写

    npm start是npm run start

    npm stop是npm run stop的简写

    npm test是npm run test的简写

    npm restart是npm run stop && npm run restart && npm run start的简写

  * 脚本变量

    > npm 脚本有一个非常强大的功能，就是可以使用 npm 的内部变量。
    
    **如果是 Bash 脚本**，可以用$npm_package_name和$npm_package_version拿到package.json里面的字段。还可以通过npm_config_前缀，拿到 npm 的配置变量，即npm config get xxx命令返回的值。

  * 常见示例

    ```script
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