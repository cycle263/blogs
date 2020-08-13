## 理解router工作机制

React-Router的结构是一个典型的monorepo，monorepo这两年开始流行了，是一种比较新的多项目管理方式，与之相对的是传统的multi-repo。一般用于多个关联性极强的项目，例如：react-router、react-router-config、react-router-dom、react-routerr-native。

### react-router

* 大致思路

  `监听URL -> 改变router的current变量 -> 监听current变量 -> 获取对应component -> render对应component`

  而实现监听Url的库独立出来就是history，current变量在react中是用context api实现。 
