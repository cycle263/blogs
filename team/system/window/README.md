## window

* vscode使用终端快捷配置

  用户设置里配置：` "terminal.integrated.shell.windows": "C:\\Program Files (x86)\\Git\\bin\\bash.exe" `

  或者配置： `"terminal.integrated.shell.windows": "C:\\Program Files (x86)\\Git\\git-cmd.exe"`

* npm scripts命令脚本写法区别

  - 单引号无法使用，建议使用双引号。`"start": "dora --plugins 'proxy,webpack,webpack-hmr'",`
    -->  `"start": "dora --plugins \"proxy,webpack,webpack-hmr\"",`

  - 在 windows 上并不能通过 ${npm_package_name} 和 ${npm_package_version} 来指向package.json中的name和version。

  - 设置NODE_ENV参数在cmd中报错(bash中是否报错？)，`NODE_ENV=development` -> `set NODE_ENV=development` 或者使用cross-env库 `cross-env NODE_ENV=production`


* 清理host和DNS缓存

  `chrome://net-internals/#dns`

* 查看端口号是否被占用

  `netstat -aon|findstr 1099`
  `taskkill -f -pid 5608`