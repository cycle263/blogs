## npm scripts -- CLI Commands

* scripts

    - 参数：npm_package_name, npm_package_version(环境变量中以"npm_config_"开头的都被解释为配置选项)

* main  包的入口文件

* config 添加一些设置，可以供scripts读取用，同时这里的值也会被添加到系统的环境变量中。

    ```
    "config": {
        "port": "8080"
    }
    ```

    优先级：命令行 > 环境变量 > 用户配置文件 > 全局配置 > 内置配置文件 > 默认配置  

* engines  

    指定包运行的环境
    ```
    "engines": {
        "node": ">=0.10.3 < 0.12",
        "npm": "~1.0.20"
    }
    ```
