## babel

  > Babel是一个广泛使用的转码器，可以将ES6代码转为ES5代码，从而在现有环境执行。

### babel配置文件.babelrc

  * presets：字段设定转码规则，官方提供一定的规则集，你可以根据需要安装。ES7不同阶段语法提案的转码规则（共有4个阶段。

    - es2015 预先加载es6编译的相关模块

    - react 需要编译jsx，需要预先加载"react"模块

    - stage-0 对ES7一些提案的支持，Babel通过插件的方式引入，让Babel可以编译ES7代码

      `transform-do-expressions、transform-function-bind`

    - stage-1

    - stage-2

    - stage-3

    ```
    {
      "presets": [
        "es2015",
        "react",
        "stage-2"
      ],
      "plugins": []
    }
    ```

  * plugins：配置额外的插件工具

### babel-polyfill

  > Babel默认只转换新的JavaScript句法（syntax），而不转换新的API，比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如Object.assign、Array.from）都不会转码。

  如果想让这个方法运行，必须使用babel-polyfill，为当前环境提供一个腻子。Babel默认不转码的API非常多，详细清单可以查看babel-plugin-transform-runtime模块的[definitions.js](https://github.com/babel/babel/blob/master/packages/babel-plugin-transform-runtime/src/definitions.js)文件。

备注：Babel也可以用于浏览器环境。但是，从Babel 6.0开始，不再直接提供浏览器版本，而是要用构建工具构建出来。