// 入口文件

var g = window;
g.define = require('./define');
g.mcmd = {
  use: require('./use'),
  require: require('./require'),

  // 模块缓存
  modules: {},

  // 默认配置
  config: {
    root: '/'
  },

  // 修改配置
  setConfig: function (obj) {
    for (var key in obj) {
      this.config[key] = obj[key];
    }
  },

  // 模块状态常量
  MODULE_STATUS: {
    PENDDING: 0,
    LOADING: 1,
    COMPLETED: 2,
    ERROR: 3
  }
};
