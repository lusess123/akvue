# akvue
## 简单介绍
- 一个插件式,模块化的平台 
- 可用于快速开发2b大型的后台管理系统  
- 基于vue+typescript + react

## Status: beta

Most of the planned features are in place but there may still be bugs. API may still change until we reach RC phase. Do not use in production yet unless you are adventurous.


## feature

-  平台内核+插件，项目作为平台的插件
-  所有模块typescript开发，完善的类型推导和注释
-  使用 继承BaseClass/interface 来作为插件定义方式
-  以UI框架无关的状态对象(类似angular的controller)为中心来构建组件
-  集成react
-  页面插件可自动注册路由
-  统一集成IOC，EventBus 等常用基础设施
-  ES6 的模块化方案
-  自动加载项目模块插件
-  使用@vue/cli-service构建站点
-  使用lerna 管理多模块
-  提供针对业务对象(表)高可配置化的CURD组件


## Quickstart

  
  learn bootstrap

  
  npm run serve-host

## screenshot

### 项目列表


![img](https://lusess123.github.io/akvue/img/applist.jpg)




 ### 项目详细信息

![img](https://lusess123.github.io/akvue/img/sdkapp.jpg)


  ## 项目插件信息注册

```
import { BaseApp } from "ak-lib-web/app/BaseApp";
import { IMenu } from "ak-lib-web/app/IMenu";

import { ioc } from "ak-lib-sys"

@ioc.PlugIn({ RegName: "sdkApp", BaseType: "IApp", Doc: "开发者平台的应用" })
export class dwhApp extends BaseApp {
    protected MenuList = _menus;
    public Name: string = "sdk";
    //<Icon type="social-github"></Icon>
    public Title: string = "开发者中心";
    public Doc: string = "开发者中心";
    public Icon: string = "social-github";

}

const _menus: IMenu[] =

    [
        {
            icon: "chrome", name: "aa1", text: "开发工具", children: [
                { icon: "", name: "/web/codepage", text: "代码生成" }
            ]
        },
        {
            icon: "firefox", name: "aa2", text: "demo案例", children: [
                //eventbuspage
                { icon: "chrome", name: "/web/eventbuspage", text: "全局消息总线" },
                { icon: "chrome", name: "/web/testvmpage", text: "com与vm交互" },
                { icon: "plug", name: "/web/testrxPage", text: "测试绑定数据" },
                { icon: "bicycle", name: "/web/formPage", text: "动态表单" },
                { icon: "", name: "/web/vueclasspage", text: "vue Class" },
                { icon: "", name: "/web/dipage", text: "依赖注入" },
                { icon: "", name: "/web/vue/VuePage", text: "vue组件" },
                { icon: "", name: "/web/DymicPage", text: "动态模版页面" }
            ]
        },
        {
            icon: "fa-plug", name: "aa3", text: "监控工具", children: [
                { icon: "", name: "/web", text: "应用和插件列表" }
            ]
        },



    ]

  ```