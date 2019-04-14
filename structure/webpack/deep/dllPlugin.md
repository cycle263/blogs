## DllPlugin

* dll

  在windows系统中，常见dll文件，也叫做动态链接库文件，用来包含其他模块调用的函数和数据。

* 背景

  在前端项目开发中，引用了大量的 npm 包，而这些包在正常的开发过程中并不会进行修改，但是在每一次构建过程中却需要反复的将其分析，使用dllplugin可以避免这样的消耗。

* 基本原理

  将依赖的基础包抽离出来，打包成一个个动态链接库；当引入某个模块存在于动态链接库时，模块就不能再次被打包，而是去动态链接库去获取。需要注意的是，所有的动态链接库必须都加载到页面，因此不适合生存环境使用。

* DllPlugin 和 DllReferencePlugin

  简单来说 DllPlugin 的作用是预先编译一些模块，也就是用某种方法实现了拆分 bundles，同时还大大提升了构建的速度。打包dll的时候，Webpack会将所有包含的库做一个索引，写在一个manifest文件中，而引用dll的代码（dll user）在打包的时候，只需要读取这个manifest文件，就可以了。

  DllReferencePlugin 则是把这些预先编译好的模块引用起来。这边需要注意的是 DllPlugin 必须要在 DllReferencePlugin 执行前，执行过一次。


  **特别注意** 

  dllPlugin 和 commonChunkPlugin 是二选一的，并且在启用 dll 后和 external、common 一样需要在页面中引用对应的脚本，在 dll 中就是需要手动引用 vendor.dll.js。

* 优势

  Dll打包以后是独立存在的，只要其包含的库没有增减、升级，hash也不会变化，只要包含的库没有增减、升级，就不需要重新编译打包。这样也大大提高了每次编译的速度。

* 缺点

  所有的动态链接库必须都加载到页面，而且很多重复的内容被多次打包进了bundle文件，因此不适合生产环境使用。

* webpack的dll配置

  webpack.DllPlugin的选项中，path是manifest文件的输出路径；name是dll暴露的对象名，要跟output里保持一致；context是解析包路径的上下文。output.library的选项相结合可以暴露出 (也叫做放入全局域) dll 函数。

  ```js
  /* webpack.dll.config.js */
  output: {
    path: path.resolve(__dirname, './static'),
    filename: '[name].dll.js',
    library: '[name]_lib'   // 全局变量名称
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, 'dist', '[name]-manifest.json'),
      name: '[name]_lib'    //和output.library中一致，也就是输出的manifest.json中的 name值
    }),
  ],
  ```

  DllReferencePlugin的选项中，context需要跟之前保持一致，这个用来指导Webpack匹配manifest中库的路径；manifest用来引入刚才输出的manifest文件。

  ```js
  new webpack.DllReferencePlugin({
    context: __dirname,
    manifest: require('./dist/vendor-manifest.json'),
  }),
  ```