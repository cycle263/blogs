module.exports = {
  // Forward 到另一个服务器
  'GET https://assets.daily/*': 'https://assets.online/',
  'GET http://localhost:8000/5': './index.html',
  'GET /api/users': { data: [1, 2] },

  // Forward 到另一个服务器，并指定路径
  'GET https://assets.daily/*': 'https://assets.online/v2/',

  // Forward 到另一个服务器，不指定来源服务器
  'GET /assets/*': 'https://assets.online/',

  // Forward 到另一个服务器，并指定子路径
  // 请求 /someDir/0.0.50/index.css 会被代理到 https://g.alicdn.com/tb-page/taobao-home, 实际返回 https://g.alicdn.com/tb-page/taobao-home/0.0.50/index.css
  'GET /someDir/(.*)': 'https://g.alicdn.com/tb-page/taobao-home',

  // 本地文件替换
  'GET /local': './local.js',

  // Mock 数据返回
  'GET /users': [{name:'sorrycc'}, {name:'pigcan'}],
  'GET /users/1': {name:'jaredleechn'},

  // Mock 数据，基于 mockjs
  'GET /users': require('mockjs').mock({
    success: true,
    data: [{name:'@Name'}],
  }),

  //本地使用路径http://localhost:8989/package.json，
  //会直接跳转到http://gitlab.alipay.net/smart-plat/ibench/blob/dev_20160630/package.json
  // `/${npm_package_name}/${npm_package_version}`: `--public-path /${npm_package_name}/${npm_package_version}`,
  '/package.json': 'http://gitlab.alipay.net/smart-plat/ibench/blob/dev_20160630/',

  //http://gitlab.alipay.net/smart-plat/ibench/blob/dev_20160630/index.html
    '*/index.html':  function(req, res) {
        res.json({
            success: true,
            data: [{name: req.query}, {other: req.query}],
        });
    },

    'GET */config.html':  '/index.html',

    'GET */dist/index.js':  '/dist/index.js',

    'GET */dist/common.js':  '/dist/common.js',

    'GET */ibench/*/common.js': '/ibench/common.js',

    'GET */ibench/*/index.css': '/ibench/index.css',

    'GET */ibench/*/common.css': '/ibench/common.css',

  // 通过自定义函数替换请求
  '/custom-func/:action': function(req, res) {
    // req 和 res 的设计类 express，http://expressjs.com/en/api.html
    //
    // req 能取到：
    //   1. params
    //   2. query
    //   3. body
    //
    // res 有以下方法：
    //   1. set(object|key, value)
    //   2. type(json|html|text|png|...)
    //   3. status(200|404|304)
    //   4. json(jsonData)
    //   5. jsonp(jsonData[, callbackQueryName])
    //   6. end(string|object)
    //
    // 举例：
    res.json({
      action: req.params.action,
      query: req.query,
    });
  },
};
