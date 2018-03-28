var common = {
  /* 类式继承 */
  extend: function(sup, sub){
    var F = Function(){};
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
    var F = Function(){};
    F.prototype = o;
    return new F();
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
