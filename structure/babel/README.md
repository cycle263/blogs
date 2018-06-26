## babel

  > Babel是一个广泛使用的转码器，可以将ES6代码转为ES5代码，从而在现有环境执行。

### babel配置文件.babelrc

  * presets：字段设定转码规则，官方提供一定的规则集，你可以根据需要安装。ES7不同阶段语法提案的转码规则（共有4个阶段。

    - es2015 预先加载es6编译的相关模块

    - react 需要编译jsx，需要预先加载"react"模块

    - stage-0 - Strawman（展示阶段） 对ES7一些提案的支持，Babel通过插件的方式引入，让Babel可以编译ES7代码

      `transform-do-expressions、transform-function-bind`

    - stage-1 - Proposal（征求意见阶段）

    - stage-2 - Draft（草案阶段）

    - stage-3 - Candidate（候选人阶段）

    - Stage 4 - Finished（定案阶段）

    ```js
    {
      "presets": [
        "es2015",
        "react",
        "stage-2"
      ],
      "plugins": []
    }
    ```

  * presets-env: babel-preset-env，babel会根据指定的浏览器兼容列表自动引入所有所需的polyfill。

    ```js
    {
      "presets": [
        ["env", {
          modules: false,
          targets: {
            browsers: ["ie>=9"] // 浏览器环境或node环境需要兼容范围
          },
          useBuiltIns: true,
          debug: true
        }]
      ]
    }
    ```

  * plugins：配置额外的插件工具，`babel-plugin-transform-xxx、babel-plugin-antd 等`

    插件引入方式，作用域是模块，并且是按需引入，避免代码臃肿。

  * runtime: 安装babel-runtime 与 babel-plugin-tranform-runtime两个依赖包。相比插件引入方式, runtime方式抽离了公共模块, 避免了重复引入, 从一个叫core.js的库中引入所需polyfill。

    ```js
    // 这样配置便可以放心大胆使用es6新语法和API
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        presets: ['env', 'react', 'es2017'],
        plugins: ["transform-runtime"]
      }
    }
    ```

    缺点：无法使用es6的实例化对象方法，如：`[].include`

### babel-polyfill

  > **Babel默认只转换新的JavaScript句法（syntax, 例如：class、箭头函数），而不转换新的API，**比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如Object.assign、Array.from）都不会转码。

  如果想让这个方法运行，必须使用babel-polyfill，为当前环境提供一个腻子。Babel默认不转码的API非常多，详细清单可以查看babel-plugin-transform-runtime模块的[definitions.js](https://github.com/babel/babel/blob/master/packages/babel-plugin-transform-runtime/src/definitions.js)文件。

  - 全局引入polyfill

    + 页面中引入babel-polyfill.js的CDN地址

    + 在webpack配置文件增加入口: ["babel-polyfill",'./src/app.js']

    + 入口文件使用import/require引入, 如`import 'babel-polyfill'`


备注：Babel也可以用于浏览器环境。但是，从Babel 6.0开始，不再直接提供浏览器版本，而是要用构建工具构建出来。