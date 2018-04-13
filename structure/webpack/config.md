## webpack 配置

    ```js
    module.exports = {
      // configuration
    };
    ```

* entry配置

    - entry: 入口 [String | Array | Object]    //支持三种类型  

    ```js
    entry: './src/index.js',  
    entry: ['./src/index.js'],  //多个打包到一个
    entry: {
        index: './src/index.js',    //多个打包多个如可文件
    },
    ```

* output配置

    - filename 输出的文件名称，多个入口时，可使用[name]替换，也可以加入[hash]

    - chunkFilename 按需加载模块时输出的文件名称，'[name].[hash:base64:5].js'

    - path 绝对路径，所有输出文件的目标路径

    - publicPath 输出解析文件的目录，url 相对于 HTML 页面。publicPath 并不会对生成文件的路径造成影响，主要是对你的页面里面引入的资源的路径做对应的补全，常见的就是css文件里面引入的图片。因为输出目录和开发目录的结构的变化，如果不设置publicPath,就会造成图片路径找不到

 * module.loaders

    - test: 必须满足的条件

    - exclude: 排除的条件，过滤的条件

    - include: 必须包含的条件

    - loader: 用 "!" 隔开多个loader

    - loaders: []

* devtool

    生成 sourcemap 的功能。

    - source-map 此选项具有最完备的source map，但会减慢打包的速度；

    - cheap-module-source-map 生成一个不带列映射的map

    - eval-source-map 使用eval打包源文件模块，生成一个完整的source map。

    - cheap-module-eval-source-map 这是最快生成source map的方法，生成后的Source Map 会和打包后的 JavaScript 文件同行显示，但没有列映射，所以慎用

* resolve

    - extensions: [".js", ".html", ".css", ".txt","less","ejs","json"], 自动扩展文件后缀名，import时可以不加的后缀名

    - alias: { Temp: path.resolve(__dirname, "src/templates/") }， 模块别名定义，直接 require('AppStore') 即可,方便后续直接引用别名

* devServer

    - contentBase: "./dist", 本地服务器所加载的页面所在的目录
    
    - historyApiFallback: true, 再找不到文件的时候默认指向index.html
    
    - inline: true, 当源文件改变时会自动刷新页面
    
    - hot: true, 热加载开启
    
    - port:8080, 设置默认监听端口