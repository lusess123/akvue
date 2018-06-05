var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ioc } from "ak-lib-sys";
import { dwhBaseSource } from "./../../base/dwhbasesource";
import * as dt from "./../../data/dwh_task_subscriptions";
dt;
let dwh_task_subscriptions_source = class dwh_task_subscriptions_source extends dwhBaseSource {
    constructor() {
        super(...arguments);
        this.Title = "数据表管理";
        this.ModelName = "dwh_task_subscriptions";
        this.Url = "/dwh/subscriptions";
    }
};
dwh_task_subscriptions_source = __decorate([
    ioc.PlugIn({ BaseType: "ISource", RegName: "dwh_task_subscriptions", Author: "zhengyukun", Doc: "订阅任务管理的数据源" })
], dwh_task_subscriptions_source);
export { dwh_task_subscriptions_source };
