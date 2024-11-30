var tool = {
  inherit: function (target, origin) {
    //target 继承 origin 的原型链，如果直接让 target.prototype = origin.prototype
    //对target原型的修改会导致origin原型的修改
    var temp = function () {};
    temp.prototype = origin.prototype;
    target.prototype = new temp();
    target.prototype.constructor = target;
  },
  extends: function (origin) {
    //返回一个新的构造函数，继承origin
    function result() {
      origin.apply(this, arguments); //继承父类的属性
    }
    this.inherit(result, origin); //继承原型链
    return result;
  },
  single: function (origin) {
    //单例模式，并且继承某个构造函数
    const singleResult = (function () {
      var instance;
      return function () {
        if (typeof instance === "object") {
          return instance;
        }
        instance = this;
        origin && origin.apply(this, arguments);
        return instance;
      };
    })();
    origin && this.inherit(singleResult, origin);
    return singleResult;
  },
};
