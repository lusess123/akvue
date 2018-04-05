var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BaseApp } from "ak-lib-web/app/BaseApp";
import { ioc } from "ak-lib-sys";
let dwhApp = class dwhApp extends BaseApp {
    constructor() {
        super(...arguments);
        this.MenuList = _menus;
        this.Name = "sdk";
        //<Icon type="social-github"></Icon>
        this.Title = "开发者中心";
        this.Doc = "开发者中心";
        this.Icon = "social-github";
    }
};
dwhApp = __decorate([
    ioc.PlugIn({ RegName: "sdkApp", BaseType: "IApp", Doc: "开发者平台的应用" })
], dwhApp);
export { dwhApp };
const _menus = [
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
];
