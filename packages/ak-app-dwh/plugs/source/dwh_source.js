var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ioc } from "ak-lib-sys";
import { dwhBaseSource } from "./../../base/dwhbasesource";
import * as dt from "./../../data/dwh_source";
dt;
let dwh_source_source = class dwh_source_source extends dwhBaseSource {
    constructor() {
        super(...arguments);
        this.Title = "数据源管理";
        this.ModelName = "dwh_source";
        this.Url = "/dwh/data/sources";
    }
};
dwh_source_source = __decorate([
    ioc.PlugIn({ BaseType: "ISource", RegName: "dwh_source_source", Author: "zhengyukun", Doc: "数据源管理的数据源插件" })
], dwh_source_source);
export { dwh_source_source };
