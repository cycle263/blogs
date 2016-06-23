## 代理调试汇总

* dora

    - 安装dora和相关插件
    
        `npm i dora -g`, `npm i dora-plugin-proxy --save`

    - dora的API
    
        + Load proxy, atool-build and hmr plugins
        $ dora --plugins proxy,atool-build,hmr

        + Load local plugin
        $ dora --plugins ./local-plugin

        + Load plugin with arguments
        $ dora --plugins atool-build?publicPath=/foo/&verbose

        + Load plugin with JSON arguments
        $ dora --plugins atool-build?{"publicPath":"/foo/","verbose":true}

