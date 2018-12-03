## 继承方式

* 1、类式继承

* 2、原型继承

* 3、掺元类继承

* 4、观察者模式

  ```js
 ╭─────────────╮  Fire Event  ╭──────────────╮
 │             │─────────────>│              │
 │   Subject   │              │   Observer   │
 │             │<─────────────│              │
 ╰─────────────╯  Subscribe   ╰──────────────╯
  ```

  发布订阅模式是最为常见的观察者模式的实现。

## 原型继承案例

```js
var common = {
  /* 类式继承 */
  extend: function(sup, sub){
    var F = function(){};
    F.prototype = sup.prototype;
    sub.prototype = new f();
    sub.prototype.construtor = sub;
    sub.sup = sup.prototype;
    if(sup.protoytpe.construtor === Object.prototype.constructor){
      sup.prototype.construtor = sup;
    }
  },
  /*  原型继承 */
  clone: function(o){
    var F = function(){};
    F.prototype = o;
    return new F();
  },
  /*  原型继承优化  */
  optimalClone: function(sup, sub) {
    var F = function(){};
    F.prototype = sup.prototype;
    sub.prototype = new F();
    sub.prototype.construtor = sub;
    /* Avoid an extra prototype jump for these methods. 避免原型链拉长导致方法查找的性能开销 */
    Object.assign(sub.prototype, sup.prototype);
  },
  /*  掺元类继承  */
  augment: function(rec, giv){    //rec: receiving class, giv: giving class
    if(arguments[2]){   //指定复制的方法
      for(var i = 2, l = arguments.length; i < l; i++){
        rec.prototype[arguments[i]] = giv.prototype[arguments[i]];
      }
    }else{
      for(var method in giv.prototype){
        if(!rec.prototype[method]){
          rec.prototype[arguments[method]] = giv.prototype[arguments[method]];
        }
      }
    }
  }
};
```