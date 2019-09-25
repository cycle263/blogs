## dva

基于redux，react-router，redux-saga进行了上层封装，简化redux的写法，提升开发效率。

* 背景

redux的痛点，对异步action 有心无力，redux-saga 优雅地解决了次问题。但是redux-saga 写法也很麻烦，watch后还需要fork，添加一个async action 需要改动很多文件，而 dva 就是要解决这个麻烦。

- 使用dva vs 不使用dva
```js
// 未用dva的redux-saga
├── actions/
    ├── login.js                  
    ├── user.js                  
└── reducers/                                             |── reducers/ 
    ├── login.js                  == dva ==>                  ├── login.js
    ├── user.js                                               ├── user.js
└── sagas/         
    ├── login.js                  
    ├── user.js                      
```

- redux-thunk vs redux-saga
```js
// redux-thunk
├── actions/
    ├── login.js
    ├── user.js
└── reducers/
    ├── login.js                  
    ├── user.js
└── sagas/
    ├── login.js
    ├── user.js
```

  + async action是function，灵活但是形式各异，难以维护

  + async action流程无法取消

  + 数据业务逻辑掺杂在action里

- 现状

```js
// 老写法
├── actions/
    ├── login.js
    ├── user.js                                         └── components/
└── api/                                                    |── login
    ├── login.js                                            |── user
    ├── user.js                                         └── consts/
└── components/                                             |── login
    ├── login.js                   == 新写法 ==>             |── user
    ├── user.js                                         └── containers/
└── reducers/                                               |── login
    ├── login.js                                            |── user
    ├── user.js                                         |── ducks.js
└── consts/
    ├── login.js
    ├── user.js
```

* dva + umi 优势

  - 数据流简洁清晰易读，省去部分 Redux 代码，也不用来回切换目录

  - action 依然符合 FSA 标准的（即：a plain javascript object）

  - 文档相对齐全，大部分坑点都有对应的解决方案

  - 上手成本相对较低，有利于新人入手