var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ioc } from "ak-lib-sys";
import { BaseReactPage, BaseDomReact } from "ak-lib-react-web/basereactpage";
import React from "react";
export class ReactDemo2PageReact extends BaseDomReact {
    render() {
        return React.createElement("div", null,
            "ReactDemoPage2React",
            new Date().toString(),
            this.Vm.Pro1);
    }
}
let ReactDemo2Page = class ReactDemo2Page extends BaseReactPage {
    constructor() {
        super(...arguments);
        this.Title = "ReactDemoPage2";
        this.$ReactType = ReactDemo2PageReact;
        this.Pro1 = "rrfff1233222";
    }
    loadPage() {
    }
};
ReactDemo2Page = __decorate([
    ioc.PlugIn({ RegName: "ReactDemo2Page", BaseType: "IPage", CreateDate: "2018-04-07", Doc: "ReactDemoPage2页面插件" })
], ReactDemo2Page);
export { ReactDemo2Page };
