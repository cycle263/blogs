## 常见的错误收集

* git push origin someBranch，报错误如下：

    ```
    error: src refspec someBranch does not match any.
    error: failed to push some refs to 'someBranch'.
    ```
    解决办法：最好更新README.md文件下来，没有则添加一个，git pull --rebase origin master, 合并远端master;
    或者指定HEAD为远端分支`git push origin HEAD:someBranch`
    
* 