## 常见的错误收集

* git push origin someBranch，报错误如下：

  ```js
  error: src refspec someBranch does not match any.
  error: failed to push some refs to 'someBranch'.
  ```

  分析原因：本地分支名称和远端分支名称不相同，git 1.x版本的push.default配置默认值为matching。

  解决办法：最好更新下，git pull --rebase origin master, 合并远端master，指定HEAD为远端分支`git push origin HEAD:someBranch`

* git clone 发生RPC网络错误

  ```js
  RPC failed; result=56, HTTP code = 2008.82 MiB | 4.72 MiB/s
  ```

  分析原因：git的http缓存值设置的太小

  解决办法：修改post缓存值，`git config --global http.postBuffer  524288000`
    
* git clone 速度超慢解决办法

  ```js
  #增加git缓存区大小：
  git config --global http.postBuffer  524288000
  #压缩配置
  git config --global core.compression -1 
  #修改配置文件
  export GIT_TRACE_PACKET=1
  export GIT_TRACE=1
  export GIT_CURL_VERBOSE=1
  ```
