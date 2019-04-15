```js
/**
 * vue构造函数
 * @param {*} options 
 */
function Vue(options = {}) {  // 防止没传，设一个默认值
  this.$options = options; // 配置挂载
  this.$el = document.querySelector(options.el); // 获取dom
  this._data = options.data; // 数据挂载
  this._watcherTpl = {}; // watcher池
  this._observer(this._data); // 传入数据，执行函数，重写数据的get set
  this._compile(this.$el); // 传入dom，执行函数，编译模板 发布订阅
};

/**
 * 模板编译
 * @param {*} el 
 */
Vue.prototype._compile = function (el) {
  var _this = this, nodes = el.children; // 获取app的dom
  for (var i = 0, len = nodes.length; i < len; i++) { // 遍历dom节点
    var node = nodes[i];
    if (node.children.length) {
      _this._compile(node);  // 递归深度遍历 dom树
    }
    // 如果有v-model属性，并且元素是INPUT或者TEXTAREA，我们监听它的input事件    
    if (node.hasAttribute('v-model') && (node.tagName = 'INPUT' || node.tagName == 'TEXTAREA')) {
      node.addEventListener('input', (function (key) {
        var attVal = node.getAttribute('v-model'); // 获取v-model绑定的值
        _this._watcherTpl[attVal]._directives.push(new Watcher( // 将dom替换成属性的数据并发布订阅 在set的时候更新数据
          node,
          _this,
          attVal,
          'value'
        ));
        return function () {
          _this._data[attVal] = nodes[key].value;  // input值改变的时候 将新值赋给数据 触发set=>set触发watch 更新视图
        }
      })(i));
    }
    if (node.hasAttribute('v-bind')) { // v-bind指令 
      var attrVal = node.getAttribute('v-bind'); // 绑定的data
      _this._watcherTpl[attrVal]._directives.push(new Watcher( // 将dom替换成属性的数据并发布订阅 在set的时候更新数据
        node,
        _this,
        attrVal,
        'innerHTML'
      ))
    }
    var reg = /\{\{\s*([^}]+\S)\s*\}\}/g, txt = node.textContent;   // 正则匹配{{}}
    if (reg.test(txt)) {
      node.textContent = txt.replace(reg, (matched, placeholder) => {
        // matched匹配的文本节点包括{{}}, placeholder 是{{}}中间的属性名
        var getName = _this._watcherTpl; // 所有绑定watch的数据
        getName = getName[placeholder];  // 获取对应watch 数据的值
        if (!getName._directives) { // 没有事件池 创建事件池
          getName._directives = [];
        }
        getName._directives.push(new Watcher( // 将dom替换成属性的数据并发布订阅 在set的时候更新数据
          node,
          _this,
          placeholder,
          'innerHTML'
        ));
        return placeholder.split('.').reduce((val, key) => {
          return _this._data[key]; // 获取数据的值 触发get 返回当前值 
        }, _this.$el);
      });
    }
  }
}

/**
 * 数据监听器_observer()需要用到Watcher函数，起到了连接Observer和Compile的作用
 * 
 */
// new Watcher() 为this._compile()发布订阅+ 在this._observer()中set(赋值)的时候更新视图
function Watcher(el, vm, val, attr) {
  this.el = el; // 指令对应的DOM元素
  this.vm = vm; // myVue实例
  this.val = val; // 指令对应的值 
  this.attr = attr; // dom获取值，如value获取input的值 / innerHTML获取dom的值
  this.update(); // 更新视图
}
Watcher.prototype.update = function () {
  this.el[this.attr] = this.vm._data[this.val]; // 获取data的最新值 赋值给dom 更新视图
}
```