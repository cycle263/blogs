## service worker

Service Workers 的美妙特质之一是允许你检测网络请求的状况，并让你作出相应的响应。

* 初始化

```js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
  // Registration was successful
  console.log('ServiceWorker registration successful with scope: ', registration.scope);
}).catch(function(err) {
    console.log('ServiceWorker registration failed: ', err);
   });
}
```

* 检测网络连接性

```js
// service-worker.js
var cacheVersion = 1;
var currentCache = {
  offline: 'offline-cache' + cacheVersion
};
const offlineUrl = 'offline-page.html';

this.addEventListener('install', event => {
  event.waitUntil(
    caches.open(currentCache.offline).then(function(cache) {
      return cache.addAll([ '.0/img/offline.svg', offlineUrl ]);
    });
  );
});

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