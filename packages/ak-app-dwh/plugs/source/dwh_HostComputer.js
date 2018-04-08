var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ioc } from "ak-lib-sys";
import { dwhBaseSource } from "./../../base/dwhBaseSource";
import * as dt from "./../../data/dwh_HostComputer";
dt;
let dwh_HostComputersource = class dwh_HostComputersource extends dwhBaseSource {
    constructor() {
        super(...arguments);
        this.Title = "主机管理";
        this.ModelName = "dwh_HostComputer";
        this.Url = "/dwh/data/tables";
    }
};
dwh_HostComputersource = __decorate([
    ioc.PlugIn({ BaseType: "ISource", RegName: "dwh_HostComputersource", Author: "zhengyukun", Doc: "主机管理的数据源插件" })
], dwh_HostComputersource);
export { dwh_HostComputersource };
