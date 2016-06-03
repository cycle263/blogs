## The front-end information summary

#### 1. [Javascript](./javascripts)

* [jQuery](./jQuery)

  > jQuery API,  Principle of jQuery
  
    ```js
    jQuery.extend()
    ```

  > Do not need jQuery

    ```js
    // jQuery
    $('selector');
    
    // Native
    document.querySelectorAll('selector');
    ```

* Mobile dev

  > Debug, Hybrid App

* Angularjs

  > Angular 1.3, Angular 2 ...
  
  - Angular 2
    
    `index.html --> boot --> app`

* [Reactjs](./React)

  > React rounter, React diff

* Modularity

  > AMD, Commonjs

* Nodejs

* [ECMAScript6](javascripts/ECMAScript)
  > ES6

* [Debug](front-end/debug/)
  > Fiddler

#### 2. Css

* css library
  > Bootstrap, Antd ...

* Css3
  > Animation

#### 3. Html5

* [canvas](canvas)

* svg

* long-polling

* pipeline

* web worker

* Server-Sent Event

* localStorage vs sessionStorage

#### 4.web

  * web标准化组织
  
    - [W3C](http://www.w3.org)  制定web的标准，包括HTML，CSS
    
    - [EMCA](http://www.ecma-international.org) 制定JavaScript的标准
    
    - [IETF](https://www.ietf.org)  制定忘了协议标准，包括HTTP，JSON等 

#### 5.Others

* [git](team/git)
  
  ```cmd
  $ git clone someobject.git
  $ git add .
  $ git commit -m "message"
  $ git push
  ```

* grunt

* velocity

* [gulp](structure/gulp/)

* [webpack](structure/)
  
  ```
  var path = require('path');
  var HtmlwebpackPlugin = require('html-webpack-plugin');
  //定义了一些文件夹的路径
  var ROOT_PATH = path.resolve(__dirname);
  var APP_PATH = path.resolve(ROOT_PATH, 'src');
  var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
  var TEM_PATH = path.resolve(ROOT_PATH, 'templates');
  
  module.exports = {
      entry: {
          app: "./src/entry.js",
          mobile: path.resolve(APP_PATH, 'entry.js')
      },
      output: {
          path: BUILD_PATH,
          filename: "[name].[hash].js"
      },
      module: {
          loaders: [{
              test: /\.js|jsx$/,
              loaders: ['babel?presets[]=es2015&presets[]=react'],
              exclude: /node_modules/
          }]
      },
      resolve: {
          extensions: ['', '.js', '.jsx']
      },
      plugins: [
          new HtmlwebpackPlugin({
              title: 'PC app',
              template: path.resolve(TEM_PATH, 'index.html'),
              filename: 'index.html',
              chunks: ['app'],
              inject: 'body'
          }),
          new HtmlwebpackPlugin({
              title: 'Mobile app',
              template: path.resolve(TEM_PATH, 'mobile.html'),
              filename: 'mobile.html',
              chunks: ['mobile'],
              inject: 'body'
          })
      ]
  };

  ```

