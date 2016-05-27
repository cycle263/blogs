## webpack 语法

* 启用source-map  

  > 代码合并压缩后，不利于调试和排错，开启source-map后，出现错误会直接映射到出错的代码位置
  
* 配置webpack-dev-server代理

  > 假定在本机他是类似http://localhost:5000/api/*这类的请求，现在添加配置让ajax请求可以直接proxy过去。
  
  ```
  devServer: {
    hot: true,
    inline: true,
    //其实很简单的，只要配置这个参数就可以了
    proxy: {
      '/api/*': {
          target: 'http://localhost:5000',
          secure: false
      }
    }
  },
  ```
