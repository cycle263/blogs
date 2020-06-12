## 部署密钥

部署密钥是一个存放在你的服务器上并且可以授权访问一个 GitHub 存储库的 SSH 密钥。这个密钥是直接附在存储库上的，而不是个人用户账户，当然一般情况附属个人账号更方便常见。

- 优点

任何具有访问存储库权限的人都可以部署工程。
用户不需要改变他们本地的 SSH 设定。

- 缺点

一个部署密钥只能授权一个存储库。而更复杂的工程可能会在同一个服务器上对许多存储库发出 pull 操作。
部署密钥总是提供对一个存储库的完整读写访问权限。
部署密钥通常没有经过密码保护，如果服务器被攻陷这些密钥将会很容易被获取。


### 常见问题

* 配置多个ssh key无效

  出现问题：GitHub和gitlab分别使用不同的ssh key，并且使用`~/.ssh/config`进行配置区分，但两个密钥都没有生效。

  解决方案：删除两个密钥，并且在对应GitHub和gitlab上删除用户的公钥，然后重新生成一份id_rsa的两份key，重新到两个远端配置公钥。

  ```bash
  # gitlab
  Host gitlab.com
  HostName gitlab.com
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/gitlab_id_rsa

  # github
  Host github.com
  HostName github.com
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/github_id_rsa
  ```

  分析原因：猜测config配置上有问题，待排查确定

* 配置正确，依然拒绝连接

  尝试`~/.ssh/known_hosts`文件的公钥匹配记录，避免缓存干扰


### 参考资料

[ssh key部署](https://www.cnblogs.com/akidongzi/p/8366535.html)

[test ssh key](https://help.github.com/en/articles/testing-your-ssh-connection)

[ssh test permission denied](https://help.github.com/en/articles/error-permission-denied-publickey)