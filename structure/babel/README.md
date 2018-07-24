## babel

  > Babel是一个广泛使用的转码器，可以将ES6代码转为ES5代码，jsx转换成js，从而在现有环境执行。

#### 使用babel

* babel-cli, Babel 的 CLI 是一种在命令行下使用 Babel 编译文件的简单方法。

  ```js
  $ babel example.js --out-file compiled.js
  // 或
  $ babel example.js -o compiled.js
  ```

* babel-core，以编程的方式来使用 Babel，可以使用babel-core这个包。

  babel-core 的作用是把js代码分析成ast，方便各个插件分析语法进行相应的处理，其本身并不会编译任何代码。语言层面的不兼容（rest参数，箭头函数等）只能通过将代码转为ast，分析其语法后再转为低版本js。

  ```js
  var babel = require("babel-core");
  babel.transform("code();", options);  // 转换字符串代码
  babel.transformFileSync("filename.js", options);  // 同步转换js文件
  babel.transformFile("filename.js", options, function(err, result) {
    result; // => { code, map, ast }
  });
  ```

* babel-node，支持Node的REPL环境的所有功能，而且可以直接运行ES6代码。它不用单独安装，而是随babel-cli一起安装。然后，执行babel-node就进入PEPL环境。

  ```js
  babel-node es6.js

  babel-node
  > const test = () => { console.log(arguments); };
  ```

* babel-register，改写require命令，为它加上一个钩子。此后，每当使用require加载.js、.jsx、.es和.es6后缀名的文件，就会先用Babel进行转码，但它不会对当前文件转码。另外，由于它是实时转码，所以只适合在开发环境使用。



#### babel配置文件.babelrc

* presets：字段设定转码规则，官方提供一定的规则集，你可以根据需要安装。ES7不同阶段语法提案的转码规则（共有4个阶段。

  - es2015 预先加载es6编译的相关模块

  - react 需要编译jsx，需要预先加载"react"模块

  - stage-0 - Strawman（展示阶段） 对ES7一些提案的支持，Babel通过插件的方式引入，让Babel可以编译ES7代码 `transform-do-expressions、transform-function-bind`

  - stage-1 - Proposal（征求意见阶段）

  - stage-2 - Draft（草案阶段）

  - stage-3 - Candidate（候选人阶段）

  - Stage 4 - Finished（定案阶段）

  - latest，latest是一个特殊的presets，包括了es2015，es2016，es2017的插件（目前为止，以后有es2018也会包括进去）。即总是包含最新的编译插件。

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

* presets-env: 初始化配置时已经安装。它的前身是 babel-preset-es2015/es2016/es2017 以后要用新特性这个包就可以搞定一切。使用babel-preset-env, 我们可以声明环境, 然后该preset就会只编译包含我们所声明环境缺少的特性的代码，因此也是比较推荐的方式。babel-preset-env，babel会根据指定的浏览器兼容列表自动引入所有所需的polyfill。

  ```js
  {
    "presets": [
      ["env", {
        modules: false,
        targets: {
          browsers: ["ie>=9"] // 浏览器环境或node环境需要兼容范围，> 5% 支持市场份额超过5%的浏览器
          chrome: "> 56"  // 支持版本号高于chrome56的
        },
        useBuiltIns: true,
        debug: true
      }]
    ]
  }
  ```

* plugins：配置额外的插件工具，`babel-plugin-transform-xxx、babel-plugin-antd 等`

  插件引入方式，作用域是模块，并且是按需引入，避免代码臃肿。plugins优先于presets进行编译。

* runtime: 安装babel-runtime 与 babel-plugin-tranform-runtime两个依赖包。相比插件引入方式, runtime方式抽离了公共模块, 避免了重复引入, 从一个叫core.js的库中引入所需polyfill。

  babel-runtime更像是独立的polyfill模块，我们可以在自己的模块里单独引入，比如 `require('babel-runtime/core-js/promise')` ，它们不会在全局环境添加未实现的方法，只是，这样手动引用每个 polyfill 会非常低效。我们借助 Runtime transform插件来自动化处理这一切。

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

> **Babel默认只转换新的JavaScript句法（syntax, 例如：class、箭头函数、rest 参数、函数默认值、解构赋值等），而不转换新的API，**比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如Object.assign、Array.from）都不会转码。

如果想让这个方法运行，必须使用babel-polyfill，为当前环境提供一个腻子。Babel默认不转码的API非常多，详细清单可以查看babel-plugin-transform-runtime模块的[definitions.js](https://github.com/babel/babel/blob/master/packages/babel-plugin-transform-runtime/src/definitions.js)文件。

- 全局引入polyfill

  + 页面中引入babel-polyfill.js的CDN地址，如：[polyfill.io](https://cdn.polyfill.io/v2/polyfill.min.js?features=Map,Set)

  + 在webpack配置文件增加入口: ["babel-polyfill",'./src/app.js']

  + 入口文件使用import/require引入, 如`import 'babel-polyfill'`

- runtime局部引入

  + babel-runtime 的做法是自己手动引入 helper 函数

  + babel-plugin-transform-runtime：弥补babel-runtime的不足，在代码中中直接引入 helper 函数，意味着不能共享，造成最终打包出来的文件里有很多重复的 helper 代码。这个模块会将我们的代码重写，如将 Promise 重写成 _Promise（只是打比方），然后引入_Promise helper 函数。这样就避免了重复打包代码和手动引入模块的痛苦。

备注：Babel也可以用于浏览器环境。但是，从Babel 6.0开始，不再直接提供浏览器版本，而是要用构建工具构建出来。