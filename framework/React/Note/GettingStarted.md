## React日常使用配置

* 1、安装node, npm, react, webpack, http-server(本地服务器);

* 2、npm init搭建目录和package.json, 其中scripts中的本地服务器命令：
        > "start":"http-server -a localhost -p 8001"；

* 3、手动添加配置webpack.config.js, 案例如下：
    ```js
    var path = require('path');

    module.exports = {
        entry: './src/entry.js',
        output: {
            path: path.join(__dirname, '/dist'),
            filename: 'bundle.js'
        },
        resolve: {
            extensions: ['', '.js', '.jsx']
        },
        module: {
            loaders: [{
                test: /\.js|jsx$/,
                loaders: ['babel?presets[]=es2015&presets[]=react'],
                exclude: /node_modules/
            }]
        }
    };
    ```
    
* 4、安装必要webpack相关组件和插件；
    ```
    "devDependencies": {
        "babel-preset-es2015": "^6.6.0",
        "babel-preset-react": "^6.5.0",
        "http-server": "^0.9.0",
        "react-router": "^2.2.1"
     }
     ```
* 5、配置entry文件，如下案例：
    ```
    import ReactDOM from 'react-dom';
    import React from 'react';
    import App from './component/App';
    import {Router, Route, Link, hashHistory, IndexRoute, browserHistory} from 'react-router';
    import About from './component/about';
    import Inbox from './component/inbox';
    import Message from './component/message';
    import Index from './component/index';
    
    ReactDOM.render((
        <Router history={browserHistory}>   //hashHistory，browserHistory需要后端配合改造，否则刷新和直接输入自路由地址无法访问
            <Route path="/" component={App}>
                <IndexRoute component={Index} />
                <Route path="about" component={About}></Route>
                <Route path="inbox" component={Inbox}>
                    <Route path="messages/:id" component={Message}></Route>
                </Route>
            </Route>
        </Router>
    ), document.getElementById('react-content'));
    ```
* 6、webpack 运行，或者webpack -d --watch自动运行