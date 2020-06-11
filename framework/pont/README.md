## Pont

Pont 用于桥接前后端数据层，对接的后端 API 使用 Java Swagger，Swagger 能提供所有 API 的元信息，包括请求和响应的类型格式。Pont 解析 API 元信息生成 TS 的取数函数，这些取数函数类型完美，并挂载到 API 模块下。

#### Pont 用途

* 根据方法名匹配URL和method，映射对应的response，并进行自动提示

* 后端API 或者 params 发生变更，前端对应的接口层代码会发生报错

* 前后端接口层的定义保持实时更新，也就不需要约定式的接口文档


#### 如何接入

* 1、安装pont的vscode插件

* 2、安装pont-engine依赖包

* 3、配置pont-config，执行状态栏的generate命令生成元数据，对应pontAPI目录。

  ```js
  // 接口模板
  import fetchRequest from "@/utils/request";
  import * as defs from '../../baseClass';

  export ${paramsCode}

  const pathReg = /({[a-zA-Z]*})/img;

  export const init = ${inter.response.getInitialValue()};

  const transPathParams = (str: string, params: any) => {
    return str.replace(pathReg, (result: any) => {
      const temp = result.replace(/[{}]/g, '');
      return params[temp] || result;
    });
  };

  const method = "${method.toLowerCase()}";
  export const request = (params: any = {}, option: any = {}) => {
    return fetchRequest[method](transPathParams("${path}", params), params, { ...option, mock: true, isPontAPI: true });
  }
  ```

#### 使用步骤

  ```js
  // services

  export async function queryLineList(params: any) {
    return API.DataLine.query.request(params, {});
  };
  ```

#### 使用技巧

* cmd + ctrl + p 进行接口查找

* 右键 pont 接口代码，可以跳转(jump to mock position)去编辑接口的 mocks 数据

* 右键 pont 接口代码，可以访问(visit mocks interface) GET 类型的 mocks 接口

### 参考资料

[pont官网地址](https://github.com/alibaba/pont)