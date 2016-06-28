## webpack 配置

    ```
    module.exports = {
      // configuration
    };
    ```

* entry配置

    entry: [String | Array | Object]    //支持三种类型  

    `entry: './src/index.js',`  

    `entry: ['./src/index.js'],`  //多个打包到一个

    ```
    entry: {
        index: './src/index.js',    //多个打包多个如可文件
    },
    ```

* output配置

    - filename 输出的文件名称，多个入口时，可使用[name]替换，也可以加入[hash]

* resolve.extensions

    > 扩展名，import时可以不加的后缀名
