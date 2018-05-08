## webpack概念

> 本质上，webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。

webpack简单点来说就就是一个配置文件，所有的魔力都是在这一个文件中发生的。这个配置文件主要分为三大块:  

* **1、entry入口文件** [string / Object string / Array string]

    让webpack用哪个文件作为项目的入口, 指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。添加多个彼此不互相依赖的文件，可以使用数组格式.
    ```js
    module.exports = {
        entry: './path/to/my/entry/file.js'
    };
    or
    module.exports = {
        entry: {
            main: './path/to/my/entry/file.js',
            app: './path/to/my/entry/app.js',
        }
    };
    ```

* **2、output 出口**    

    让webpack把处理完成的文件放在哪里, 以及如何命名这些文件。通过 output.filename 和 output.path 属性，来告诉 webpack bundle 的名称，以及我们想要生成(emit)到哪里。

    ```js
    output: {
        filename: '[name].[chunkhash:6].js',
        chunkFilename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist')
    },
    ```

* **3、loader 模块**     

    loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块，然后你就可以利用 webpack 的打包能力，对它们进行处理。在 webpack 配置中定义 loader 时，要定义在 module.rules 中，而不是 rules。

    每一个 loader 都是一个对象，使用 ! 号拼接的写法。Loader 的工作方式 是从右向左执行，链式地按照顺序进行编译。loader 链中的第一个返回值给下一个 loader，在最后一个 loader，返回所预期的结果。

    loader 可以是同步或异步函数，也可使用 options 对象去接受配置参数。

    在 webpack 的配置中 loader 有两个目标：

    - 识别出应该被对应的 loader 进行转换的那些文件。(使用 test 属性)

    - 转换这些文件，从而使其能够被添加到依赖图中，并且最终添加到 bundle 中。(使用 use 属性)

    ```js
    module: {
      rules: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['env', 'react', 'es2017']
        }
      }, {
        test: /\.(less|css)$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'less-loader'],
          fallback: 'style-loader'
        })
      }, {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: 'images/[name].[hash:8].[ext]'
          }
        }]
      }]
    },
    ```

* **4、plugins 插件**     

    loader 被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。插件接口功能极其强大，可以用来处理各种各样的任务。
    想要使用一个插件，你只需要 require() 它，然后把它添加到 plugins 数组中。多数插件可以通过选项(option)自定义。你也可以在一个配置文件中因为不同目的而多次使用同一个插件，这时需要通过使用 new 操作符来创建它的一个实例。

## webpack命令

* `webpack --progress --colors`   编译进度和颜色

* `webpack --progress --colors --watch`   监控编译，代码变动后自动编译

* `webpack -p`  对打包文件进行压缩，提供production, --optimize-minimize --optimize-occurence-order的简写

* `webpack -d`  提供source map，方便调试，--debug --devtool sourcemap --output-pathinfo的简写

* `webpack -w`  watch文件，实时进行打包更新


[webpack 配置案例1](./example/webpack.config)

[webpack 配置案例2](./example/standard-config)

[webpack4 配置案例](./example/webpack4.config)

[webpack 参照引用](https://doc.webpack-china.org/concepts/)