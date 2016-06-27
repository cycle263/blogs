## webpack 配置

* entry配置

    entry: [String | Array | Object]    //支持三种类型  

    `entry: './src/index.js',`  

    `entry: ['./src/index.js'],`  //多个打包到一个

    ```
    entry: {
        index: './src/index.js',    //多个打包多个如可文件
    },
    ```
