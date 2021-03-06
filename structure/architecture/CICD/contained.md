## Docker容器化

容器化，也就是对进程进行封装隔离，属于操作系统层面的虚拟化技术。由于隔离的进程独立于宿主和其它隔离的进程，因此称其为容器。

Docker 在容器的基础上，进行了进一步的封装，从文件系统、网络互联到进程隔离等等，极大的简化了容器的创建和维护。使得 Docker 技术比虚拟机技术更为轻便、快捷。

* 概念

  - 镜像

    可以简单理解为一层层文件系统的集合。对于前端代码，最下面那层目录可能是 Nginx 运行所需要的二进制，然后在上面再加一层目录是我们的代码，比如说 index.html。这个镜像分层所有的分层生成以后，都是只读的，每一层文件不可修改。

  - 容器

    容器其实可以理解为在镜像目录上再加一层目录，但容器层是可读可写的，另外，每个容器都共享宿主机的内核和系统调用。因此一个容器内包含的仅仅是一个程序运行所需要的最少文件，启动容器就是启动进程，对资源的开销更小，维护起来更简单。

    容器的编排，调度，可以考虑使用Kubernetes等容器管理平台。

  - Docker




### 参考资料

[k8s天然微服务](https://github.com/sunface/blog/blob/master/2018/Q3/%E4%B8%BA%E4%BD%95k8s%E5%A4%A9%E7%84%B6%E9%80%82%E5%90%88%E5%BE%AE%E6%9C%8D%E5%8A%A1.md)

[使用Docker构建前端应用](https://zhuanlan.zhihu.com/p/39241059)