# akvue

## Table of Contents

- [Introduction](#introduction)
- [Status:beta](#Status:beta)
- [feature](#feature)
  - [平台内核与插件](#平台内核与插件)
  - [typescript开发](#typescript开发)
  - [使用继承BaseClass/interface来作为插件定义方式](#使用继承BaseClass/interface来作为插件定义方式)
  - [集成react](#集成react)
  - [页面插件可自动注册路由](#页面插件可自动注册路由)
  - [统一集成IOC,EventBus等常用基础设施](#统一集成IOC,EventBus等常用基础设施)
  - [ES6模块化方案](#ES6模块化方案)
  - [自动加载项目模块插件](#自动加载项目模块插件)
  - [使用@vue/cli-service构建站点](#使用@vue/cli-service构建站点)
  - [lerna管理多模块)](#lerna管理多模块)
  - [提供针对业务对象(表)高可配置化的CURD组件](#提供针对业务对象(表)高可配置化的CURD组件)


- [Quickstart](#Quickstart)
- [screenshot](#screenshot)
  - [项目列表](#项目列表)
  - [项目详细信息](#项目详细信息)
  - [项目插件信息注册](#项目插件信息注册)

## Introduction

- 一个插件式,模块化，一站式的平台 
- 可用于快速开发 大型2b后台管理系统  
- 基于vue+typescript

## Status:beta

Most of the planned features are in place but there may still be bugs. API may still change until we reach RC phase. Do not use in production yet unless you are adventurous.


## feature

### 平台内核与插件

   “封装”的进化史 ： 

   1.function 

   2.class/file   

   3.library/package(比如：Prototype.js，jquery) 

   4.framework(比如，react < vue < angular，三大框架一个比一个重量级)

   5.platform  , 比如（vscode，Android ， OpenERP,各种Paas平台）

   akvue是一个简单的platform，提供SDK和可扩展的内核接口，可用来快速开发大型2b后台管理系统，每个项目是平台的一个插件，运行在这个平台之上。

   

###  typescript开发

   提高工程稳定性，静态类型系统对IDE友好，能提供更好的类型推导和注释，rename，代码分析
###  使用继承BaseClass/interface来作为插件定义方式

   相对于FP 和 FRP ，OOP虽然笨重，但是门槛低，符合大多数人的理解和思维方式，并且可以复用几十年积累的各种设计模式和经验。对于界面交互大多数场景，OOP是比较好的方式。

 那为什么不使用官方的vue-class-component的呢？

   1.由于是模拟的class特性，有些功能不支持，比如super

   2.比起extends 非class 的 mixin 方式很灵活，可以在核心库里面使用

  以UI框架无关的状态OOP对象(类似angular的service)为中心来构建组件

   解藕
   
   1. 以UI框架无关的状态管理更接近实际业务场景，适合 交互逻辑 有一定复杂度和 数据模型 足够厚的场景 

   2. 更容易可在vue/react/anguar三大框架之间复用数据和逻辑

###  集成react

    对于2B后台管理系统，“尽量缩小需要下载的js包大小” 和 “兼并react的生态” 的权衡,选择了后者

    封装支持：
    
    vue组件中集成react组件
    react组件集成vue组件

### 页面插件可自动注册路由

   组件即页面的思想

### 统一集成IOC,EventBus等常用基础设施

   统一基础设施，可以更好的做 监控 和 测试

### ES6模块化方案

   tree shaking 

### 自动加载项目模块插件

   可插拔模块

###  使用@vue/cli-service构建站点

   黑盒化webpack

###  lerna管理多模块

   对于大型框架和平台型的方案 来说，适合使用 monorepo 来管理代码

###  提供针对业务对象(表)高可配置化的CURD组件

   对业务对象(表)CURD是后台管理系统大部分的业务场景，如果能结合后端进行丰富的元数据配置和强大扩展，能解决很大部分的需求

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