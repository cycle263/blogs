# SentryServer-部署文档

## Features

- 免费
- 分组织架构管理(账号权限管理)
- 基于容器，灵活部署，错误定位到行以及call-stack信息的错误，可以在测试阶段和生产环境发挥作用
- 可结合gitlab和ci工具，gitlab可以推断哪个commit报
- 多平台监控， js java node-express etc.
- 生成监控报表和事件统计
- 插件机制，可以编写钉钉机器人插件等工具

Sentry官方提供了收费的[云服务](https://sentry.io/welcome/)，为了保证数据以及源代码的安全最好部署到私有服务器，sentry提供了 [on-premise](https://github.com/getsentry/onpremise)用于私有服务器的部署 ，部署到自己的之后可以完全免费地使用sentry的所有功能，并且还有详细的说明文档 [Sentry官方文档](https://docs.sentry.io/)

## 安装

- 安装Docker

  Sentry 可以基于 Docker 和 Python 安装部署，由于Docker的方式更加灵活，推荐以Docker方式安装！

  ```sh
  yum install docker -y
  ```

  安装完Docker检查一下版本，Mac需要点击图标启动一下！！！不然会报 `command not found: docker`

  ```sh
  $ docker -v
  $ Docker version 19.03.2, build 6a30dfc
  ```

[更多平台安装方式 >>](https://yeasy.gitbooks.io/docker_practice/install/)

- 安装 Sentry 运行镜像与周边服务

  ```sh
  git clone https://github.com/getsentry/onpremise.git
  cd onpremise
  chmod +x install.sh
  sh ./install.sh
  ```

  安装过程看网络状况而定，大致需要30分钟左右，运行以上脚本后终端出现以下消息则安装成功！

  ```sh
  ----------------
  You're all done! Run the following command get Sentry running:
  ```
  
  安装过程中，cli会让创建一个admin账号，输入自己的账号密码即可


## 启动Sentry服务

  ```shell
  # 使用 docker-compose 拉起docker集群
  docker-compose up -d

  Creating network "onpremise_default" with the default driver
  Creating onpremise_smtp_1      ... done
  Creating onpremise_postgres_1  ... done
  Creating onpremise_redis_1     ... done
  Creating onpremise_memcached_1 ... done
  Creating onpremise_worker_1    ... done
  Creating onpremise_cron_1      ... done
  Creating onpremise_web_1       ... done
  ```

  至此，Sentry服务已成功运行，打开 localhost:9000 即可看到Login页面，用之前创建的账号即可登录

## 集成Sentry-Dingding插件

错误监控的意义在于发生错误时能及时察觉，Sentry有多种可选的通知方式，例如Jira，邮件，钉钉机器人等...，通过 [on-premise](https://github.com/getsentry/onpremise) 安装的docker集群中是没有包含钉钉插件，可以自己编写一个钉钉插件集成到Sentry中，当然社区中已经有人发布了一个简版的钉钉机器人插件 -- [**Sentry-dingding**](https://github.com/anshengme/sentry-dingding)，也自己修改插件[**Sentry-dingding**](https://github.com/anshengme/sentry-dingding)，然后上传到官方pip库即可，下面是一些这个插件配置的大致步骤：

### 配置 on-premise

在Sentry的on-premise中有个配置依赖的文件 `requirements.txt`，要集成官方没有的插件需要在这个文件中添加：

```shell
➜ onpremise git:(master) ✗ ll
total 112
-rw-r--r--  1 username  staff    46B  9 11 10:46 Dockerfile
-rw-r--r--  1 username  staff    11K  9 11 10:46 LICENSE
-rw-r--r--  1 username  staff   548B  9 11 10:46 Makefile
-rw-r--r--  1 username  staff   2.1K  9 11 10:46 README.md
-rw-r--r--  1 username  staff   2.2K  9 12 16:40 config.yml
-rw-r--r--  1 username  staff   1.3K  9 11 10:46 docker-compose.yml
-rwxr-xr-x  1 username  staff   2.9K  9 17 15:05 install.sh
-rw-r--r--  1 username  staff    50B  9 17 15:05 requirements.txt
-rw-r--r--  1 username  staff    11K  9 11 10:46 sentry.conf.py
-rwxr-xr-x  1 username  staff   1.0K  9 11 10:46 test.sh
➜ onpremise git:(master) ✗ cat requirements.txt
# Add plugins here

# 钉钉通知
sentry-dingding%        


```

Sentry的核心是采用python测django编写，在这个文件中配置的内容最终都会在`pip`库(类似nodejs的npm库)中拉取，所以部署环境要保证能访问公网，如果没有公网环境，必须要[搭建本地pip库](https://blog.csdn.net/anzhuangguai/article/details/62224841)

这个插件写入`requirements.txt`之后重新执行on-premise中的`install.sh`就可以了，不必担心之前的数据丢失，on-premise在重新安装的时候会将之前的数据迁移到新环境

### 在Sentry配置钉钉插件

重新部署 on-premise 之后，就可以在 `/settings/{组织}/projects/{项目名}/plugins/` 中看到钉钉插件：

![image-20190923141751217](https://conf.shishike.com/download/attachments/36013117/image-20190923141751217.png)

点击右侧开关即可激活钉钉插件，激活后需要手动刷新一下页面才能看到钉钉的配置页面(测试部署时间是2019-09-20)，可能是sentry的一个bug，不知道后期会不会修复

![image-20190923143224242](https://conf.shishike.com/download/attachments/36013117/image-20190923143224242.png)

点击图示链接进入Dingding配置写入钉钉机器人的token就可以了，Sentry一旦收到sentry-sdk上报的错误之后就会调用机器人接口发送到相应的钉钉群

[如何创建钉钉机器人 >>](https://ding-doc.dingtalk.com/doc#/serverapi2/krgddi)
































