## 代理调试汇总

* dora

    > dora 是一个开发服务器，通过插件的方式集合各种调试方案  

    - 安装dora和相关插件

        `npm i dora -g`, `npm i dora-plugin-proxy --save`

        ```
        {
          "name": "testloadsh",
          "version": "1.0.0",
          "description": "test",
          "main": "webpack.config.js",
          "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1",
            "build": "sudo webpack --display-error-details",
            "dev": "./node_modules/.bin/dora -p 8001 --plugins webpack,hmr,proxy,livereload?enableJs=false",
            "proxy": "./node_modules/.bin/dora -p 8001 --plugins proxy"
          },
          "author": "",
          "license": "ISC",
          "dependencies": {
            "atool-build": "^0.7.13",
            "babel-loader": "^6.2.4",
            "babel-polyfill": "^6.9.1",
            "babel-preset-es2015": "^6.9.0",
            "babel-preset-react": "^6.11.0",
            "babel-preset-stage-0": "^6.5.0",
            "dora": "0.3.x",
            "dora-plugin-atool-build": "^0.4.1",
            "dora-plugin-hmr": "0.5.x",
            "dora-plugin-livereload": "0.3.x",
            "dora-plugin-proxy": "0.6.x",
            "dora-plugin-webpack": "0.6.x",
            "lodash": "^4.13.1",
            "react": "^15.1.0",
            "react-dom": "^15.1.0",
            "webpack": "^1.13.1"
          }
        }
        ```

    - dora的API

        + Load proxy, atool-build and hmr plugins
        $ dora --plugins proxy,atool-build,hmr

        + Load local plugin
        $ dora --plugins ./local-plugin

        + Load plugin with arguments
        $ dora --plugins atool-build?publicPath=/foo/&verbose

        + Load plugin with JSON arguments
        $ dora --plugins atool-build?{"publicPath":"/foo/","verbose":true}

    - dora proxy原理

        拦截请求，指向proxy.config.js的target。在线代理，其实是先通过SwitchySharp代理到本地，再通过dora的代理插件拦截，代理指向想要的目标位置。
