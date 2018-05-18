## 常见的错误收集

* git push origin someBranch，报错误如下：

  ```shell
  error: src refspec someBranch does not match any.
  error: failed to push some refs to 'someBranch'.
  ```

  分析原因：本地分支名称和远端分支名称不相同，git 1.x版本的push.default配置默认值为matching。

  解决办法：最好更新下，git pull --rebase origin master, 合并远端master，指定HEAD为远端分支`git push origin HEAD:someBranch`
    
