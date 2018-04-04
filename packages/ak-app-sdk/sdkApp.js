var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BaseApp } from "ak-lib-web/app/BaseApp";
import { ioc } from "ak-lib-sys";
var dwhApp = /** @class */ (function (_super) {
    __extends(dwhApp, _super);
    function dwhApp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.MenuList = _menus;
        _this.Name = "sdk";
        //<Icon type="social-github"></Icon>
        _this.Title = "开发者中心";
        _this.Doc = "开发者中心";
        _this.Icon = "social-github";
        return _this;
    }
    dwhApp = __decorate([
        ioc.PlugIn({ RegName: "sdkApp", BaseType: "IApp", Doc: "开发者平台的应用" })
    ], dwhApp);
    return dwhApp;
}(BaseApp));
export { dwhApp };
var _menus = [
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
