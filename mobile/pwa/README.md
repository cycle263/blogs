## PWA - 渐进式Web应用

渐进式Web应用是一种全新的Web技术，让Web应用和原生APP的体验相近或一致。

PWA 能做到原生应用的体验不是靠特指某一项技术，而是经过应用一系列新技术进行改进（类似于ajax），在安全、性能和体验三个方面都有很大提升，PWA 本质上是 Web App，借助一些新技术也具备了 Native App 的一些特性，兼具 Web App 和 Native App 的优点。

* 技术依赖

  - Service Worker / App Manifest
  - Web storage
  - Fetch
  - Promise
  - Https
  - Push
  - Web Notifications

* PWA特点

  - 只需要关心W3C的Web标准，不用关心各种Native APP的代码
  - 用户可以在安装应用之前先试用
  - 在渐进式Web应用中，不需要使用各种应用商店来分发应用，也不用关心应用发布时奇怪的审核标准以及应用内购的平台抽成。另外，应用程序更新是自动进行的，无需用户交互，所以整体的使用体验对于用户来讲更为的平滑
  - 渐进式Web应用的“安装”过程很快，只需要在主屏幕上添加一个图标即可
  - 渐进式Web应用启动时可以显示一个好看的启动画面
  - 可以在渐进式Web应用中提供具有全屏体验的应用
  - 通过系统通知等形式提高用户的粘性
  - 渐进式Web应用将会在本地缓存必要的文件，所以渐进式Web应用会比普通的Web应用的性能更好
  - 轻量级安装——只需要缓存几百KB的数据即可
  - 所有的数据传输必须使用安全的HTTPS连接
  - 渐进式Web应用可以离线缓存数据，并且会在重新连接互联网时重新同步数据

* service worker缓存

  service worker缓存让开发者可以缓存所有需要的资源，例如：拦截http请求和响应，并根据需要调整它们。

* Mainfest文件

  `<link rel="manifest" href="/manifest.json">`, manifest.json文件遵循[web app manifest规范](www.w3.org/TR/appmanifest/)。

  - 用途

    安装web应用到主屏幕，控制不同元素的感官。


### 其他

* [免费https证书授权](https://letsencrypt.org)

* [sw-toolbox一个service worker缓存请求库](https://github.com/GoogleChromeLabs/sw-toolbox)

* [workbox](https://github.com/GoogleChrome/workbox)

* [lavas解决方案](https://lavas.baidu.com/)

