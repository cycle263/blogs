var agent = navigator.userAgent.toLowerCase();
var opera = window.opera,
var browser = {
  ie: /(msie\s|trident.*rv:)([\w.]+)/.test(agent), // 检测当前浏览器是否为IE

  isEdge: userAgent.indexOf("Edge") > -1, // 检测当前浏览器是否为edge

  opera: (!!opera && opera.version), // 检测当前浏览器是否为Opera

  webkit: (agent.indexOf(' applewebkit/') > -1),  // 检测当前浏览器是否是webkit内核的浏览器

  mac: (agent.indexOf('macintosh') > -1),  // 检测当前浏览器是否是运行在mac平台下

  quirks: (document.compatMode == 'BackCompat'),  // 检测当前浏览器是否处于“怪异模式”下

  trident: agent.indexOf('Trident') > -1, // IE内核   

  presto: agent.indexOf('Presto') > -1, // opera内核  

  webKit: agent.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核   

  gecko: agent.indexOf('Gecko') > -1 && agent.indexOf('KHTML') == -1, // 火狐内核  

  mobile: !!agent.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端   

  ios: !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端   

  android: agent.indexOf('Android') > -1 || agent.indexOf('Linux') > -1, // android终端或者uc浏览器   
  iPhone: agent.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器   

  iPad: agent.indexOf('iPad') > -1, // 是否iPad     

  webApp: agent.indexOf('Safari') == -1 // 是否web应该程序，没有头部与底部  

};
var isPc = function () {
  return browser.mobile || browser.ios || browser.android ||
    browser.iPhone || browser.iPad;
};

var isPC2 = function () {
  var userAgentInfo = navigator.userAgent;
  var Agents = ["Android", "iPhone",
    "SymbianOS", "Windows Phone",
    "iPad", "iPod"];
  var flag = true;
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}