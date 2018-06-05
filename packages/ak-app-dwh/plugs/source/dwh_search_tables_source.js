var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ioc } from "ak-lib-sys";
import { dwhBaseSource } from "./../../base/dwhbasesource";
import { dwh_search_tables } from "./../../data/dwh_search_tables";
dwh_search_tables;
let dwh_search_tables_source = class dwh_search_tables_source extends dwhBaseSource {
    constructor() {
        super(...arguments);
        this.Title = "数据表";
        this.ModelName = "dwh_search_tables";
        this.Url = "/dwh/data/tables";
    }
    setFormConfig() {
        super.setFormConfig();
        //this.SourceObj
        this.PageView.DataButtons = {
            "apply": {
                Text: "申请订阅授权",
                Name: "apply"
            }
        };
        // DataButtons:
    }
};
dwh_search_tables_source = __decorate([
    ioc.PlugIn({ BaseType: "ISource", RegName: "dwh_search_tables_source", Author: "zhengyukun", Doc: "搜索数据表的数据源插件" })
], dwh_search_tables_source);
export { dwh_search_tables_source };
