## Nginx

* 承载HMTL入口，CDN降级策略

DevOps

* 跨域配置

```json
server {
    # #设置跨域配置 Start
    set $cors_origin "";
    if ($http_origin ~* "^http://api.xx.com$"){
        set $cors_origin $http_origin;
    }

    # 设置为*星号将不在支持发送Cookie
    add_header Access-Control-Allow-Origin $cors_origin always; 
    add_header Access-Control-Allow-Methods GET,POST,PUT,DELETE,OPTIONS always;
    add_header Access-Control-Allow-Credentials true always;
    add_header Access-Control-Allow-Headers DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization,x-auth-token always;
    # 缓存时长
    add_header Access-Control-Max-Age 1728000 always;
    # always 指定了 always则无论什么请求都添加header

    # 预检请求处理，鉴权配置时需要注意处理
    if ($request_method = OPTIONS) {
        return 204;
    }
    # #设置跨域配置 End
}
```