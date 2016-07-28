## git tag

* git tag -l[--list]    列出所有的tag  `git tag -l 1.1*`

* git tag -a [tag_name] -m "tag message"    创建一个有注释的tag

* git tag -d[--delete] [tag_name]     删除一个tag

* git tag -v[--verify]  [tag_name]      验证一个tag

* git push [origin] --tags    推送所有的标签到远端

* git push origin [tagname]     推送一个标签到远端

* 删除tag

    `git push origin --delete tag <tagname>`  
    `git push origin :<tagname>`  

    ```
    git tag -d <tagname>
    git push origin :refs/tags/<tagname>
    ```
