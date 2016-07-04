## npm scripts -- CLI Commands

* scripts参数

    - npm_package_name, npm_package_version

* main  包的入口文件

* config 添加一些设置，可以供scripts读取用，同时这里的值也会被添加到系统的环境变量中。

    ```
    "config": {
        "port": "8080"
    }
    ```

* engines  

    指定包运行的环境
    ```
    "engines": {
        "node": ">=0.10.3 < 0.12",
        "npm": "~1.0.20"
    }
    ```
