// 惰性加载图片，随滚动加载
(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(function() {
      return factory(global);
    });
  } else if (typeof exports === 'object') {
    module.exports = factory;
  } else {
    global.asyncimg = factory(global);
  }
})(this, function (global) {
  'use strict';

  var asyncimg = {};
  var callback = function () {};
  var offset, poll, delay, useDebounce, unload;
  var isHidden = function (element) {
    return (element.offsetParent === null);
  };
  var inView = function (element, view) {
    if (isHidden(element)) {
      return false;
    }
    var box = element.getBoundingClientRect();
    return (box.right >= view.l && box.bottom >= view.t && box.left <= view.r && box.top <= view.b);
  };
  var debounceOrThrottle = function () {
    if(!useDebounce && !!poll) {
      return;
    }
    clearTimeout(poll);
    poll = setTimeout(function(){
      asyncimg.render();
      poll = null;
    }, delay);
  };

  asyncimg.init = function (opts) {
    opts = opts || {};
    var offsetAll = opts.offset || 0;
    var offsetVertical = opts.offsetVertical || offsetAll;
    var offsetHorizontal = opts.offsetHorizontal || offsetAll;
    var optionToInt = function (opt, fallback) {
      return parseInt(opt || fallback, 10);
    };
    offset = {
      t: optionToInt(opts.offsetTop, offsetVertical),
      b: optionToInt(opts.offsetBottom, offsetVertical),
      l: optionToInt(opts.offsetLeft, offsetHorizontal),
      r: optionToInt(opts.offsetRight, offsetHorizontal)
    };
    delay = optionToInt(opts.throttle, 250);
    useDebounce = opts.debounce !== false;
    unload = !!opts.unload;
    callback = opts.callback || callback;
    asyncimg.render();
    if (document.addEventListener) {
      global.addEventListener('scroll', debounceOrThrottle, false);
      global.addEventListener('load', debounceOrThrottle, false);
    } else {
      global.attachEvent('onscroll', debounceOrThrottle);
      global.attachEvent('onload', debounceOrThrottle);
    }
  };

  asyncimg.render = function (context) {
    var nodes = (context || document).querySelectorAll('[data-asyncimg], [data-asyncimg-background]');
    var length = nodes.length;
    var src, elem;
    var view = {
      l: 0 - offset.l,
      t: 0 - offset.t,
      b: (global.innerHeight || document.documentElement.clientHeight) + offset.b,
      r: (global.innerWidth || document.documentElement.clientWidth) + offset.r
    };
    for (var i = 0; i < length; i++) {
      elem = nodes[i];
      if (inView(elem, view)) {

        if (unload) {
          elem.setAttribute('data-asyncimg-placeholder', elem.src);
        }
        if (elem.getAttribute('data-asyncimg-background') !== null) {
          elem.style.backgroundImage = 'url(' + elem.getAttribute('data-asyncimg-background') + ')';
        } else if (elem.src !== (src = elem.getAttribute('data-asyncimg'))) {
          elem.src = src;
        }
        if (!unload) {
          elem.removeAttribute('data-asyncimg');
          elem.removeAttribute('data-asyncimg-background');
        }

        callback(elem, 'load');
      } else if (unload && !!(src = elem.getAttribute('data-asyncimg-placeholder'))) {
        if (elem.getAttribute('data-asyncimg-background') !== null) {
          elem.style.backgroundImage = 'url(' + src + ')';
        } else {
          elem.src = src;
        }

        elem.removeAttribute('data-asyncimg-placeholder');
        callback(elem, 'unload');
      }
    }
    if (!length) {
      asyncimg.detach();
    }
  };

  asyncimg.detach = function () {
    if (document.removeEventListener) {
      global.removeEventListener('scroll', debounceOrThrottle);
    } else {
      global.detachEvent('onscroll', debounceOrThrottle);
    }
    clearTimeout(poll);
  };

  return asyncimg;
});

/*

window.onload = function() {
  asyncimg.init({
    offset: 100,    //距离可视区的距离开始加载
    throttle: 250,  //250ms触发一次onscroll，防止多次触发onscroll
    unload: false,  //图片离开可视区是否移除已经加载的图片
    callback: function(element, op) {
        console.log(element.src, 'has been', op + 'ed')
    }
  });
}

*/
