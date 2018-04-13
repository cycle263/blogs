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

* resolve.extensions

    > 扩展名，import时可以不加的后缀名
