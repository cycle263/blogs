## service worker

Service Worker，是一个浏览器和network之间的代理，解决的是如何缓存页面的资产和如果在脱机状态下仍然正常工作的问题。注册成功后，sw在 ServiceWorkerGlobalScope 环境中运行，独立于当前网页进程，有自己独立的 worker context，没有对于DOM的访问权限，与传统的API不同，它是非阻塞的，并基于promise方法在就绪时返回结果。

Service Worker设计为完全异步，同步API（如XHR和localStorage）不能在service worker中使用。它不但只是离线能力，还有消息通知、添加桌面图标等功能。

Service Worker 还允许你检测网络请求的状况，并让你作出相应的响应，但Service Worker 要求必须是Https的网络环境，为了便于本地开发，localhost 也被浏览器认为是安全源。

* SW的lifecycle

```js
┌--------------┐    ┌--------------┐    ┌------------┐
| Registration | -> | Installation | -> | Activation |
└--------------┘    └--------------┘    └------------┘
```

  - service worker URL 通过 serviceWorkerContainer.register() 来获取和注册。

  - 如果注册成功，service worker 就在 ServiceWorkerGlobalScope 环境中运行； 这是一个特殊类型的 woker 上下文运行环境，与主运行线程（执行脚本）相独立，同时也没有访问 DOM 的能力。

  - service worker 现在可以处理事件了。

  - 受 service worker 控制的页面打开后会尝试去安装 service worker。最先发送给 service worker 的事件是安装事件(在这个事件里可以开始进行填充 IndexDB和缓存站点资源)。这个流程同原生 APP 或者 Firefox OS APP 是一样的 — 让所有资源可离线访问。

  - 当 oninstall 事件的处理程序执行完毕后，可以认为 service worker 安装完成了。

  - 下一步是激活。当 service worker 安装完成后，会接收到一个激活事件(activate event)。 onactivate 主要用途是清理先前版本的service worker 脚本中使用的资源。

  - Service Worker 现在可以控制页面了，但仅是在 register()  成功后的打开的页面。也就是说，页面起始于有没有 service worker ，且在页面的接下来生命周期内维持这个状态。所以，页面不得不重新加载以让 service worker 获得完全的控制。

* 初始化注册

chrome浏览器已经很好的支持了Service Worker的debug功能，可在浏览器输入`chrome://inspect/#service-workers`查看是否注册成功，也可以在控制台的application里查看。如果注册成功，service worker就会被下载到客户端并尝试安装或激活，这将作用于整个域内用户可访问的URL，或者其特定子集。

```js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js', {
    scope: '/app/'  // 指定可以访问的作用域或者目录
  }).then(function(registration) {
  // Registration was successful
  console.log('ServiceWorker registration successful with scope: ', registration.scope);
}).catch(function(err) {
    console.log('ServiceWorker registration failed: ', err);
   });
}
```

* 安装和检测网络连接性

```js
// service-worker.js，在 ServiceWorkerGlobalScope 环境中运行，独立于脚本的主线程
var cacheVersion = 1;
var currentCache = {
  offline: 'offline-cache' + cacheVersion
};
const offlineUrl = 'offline-page.html';

this.addEventListener('install', event => {
  event.waitUntil(
    caches.open(currentCache.offline).then(function(cache) {
      return cache.addAll([
        '/img/offline.svg',
        '/css/main.css',
        '/js/bootstrap.min.js',
        offlineUrl
      ]);
    });
  );
});

// fetch
this.addEventListener('fetch', event => {
  // request.mode = navigate isn't supported in all browsers
  // request.mode = naivgate 并没有得到所有浏览器的支持
  // so include a check for Accept: text/html header.
  // 因此对 header 的 Accept：text/html 进行核实
  const { request } = event;
  if(request.mode === 'navigate' || (request.method === 'GET' && request.headers.get('accept').includes('text/html')) {
    event.respondWith(
      fetch(event.request.url).catch(error => {
        // Return the offline page
        return caches.match(offlineUrl);
      })
    );
  } else {
    // Respond with everything else if we can
    event.respondWith(caches.match(event.request).then(function (response) {
        return response || fetch(event.request);
      })
    );
  }
});
```

* 激活

如果现有service worker已启用，新版本会在后台安装，但不会被激活，这个时序称为worker in waiting。直到所有已加载的页面不再使用旧的service worker才会激活新的service worker。只要页面不再依赖旧的service worker，新的service worker会被激活（成为active worker）。

* service worker 所有支持的事件

  install、activate、message、fetch、sync、push

* 常见问题

- 使用不正常，记得开启一些浏览器的功能配置，例如：Chrome Canary: 访问 `chrome://flags` 并开启 experimental-web-platform-features; 重启浏览器 (注意：有些特性在Chrome中没有默认开放支持)；

- 结合webpack，可以使用webpack插件 serviceworker-webpack-plugin

### 参考资料

[如何使用Service_Workers](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API/Using_Service_Workers)