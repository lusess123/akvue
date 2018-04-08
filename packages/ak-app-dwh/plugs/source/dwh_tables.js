var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ioc } from "ak-lib-sys";
import { dwhBaseSource } from "./../../base/dwhBaseSource";
import * as dt from "./../../data/dwh_tables";
dt;
let dwh_tabless_source = class dwh_tabless_source extends dwhBaseSource {
    constructor() {
        super(...arguments);
        this.Title = "数据表管理";
        this.ModelName = "dwh_tables";
        this.Url = "/dwh/data/tables";
    }
    setFormConfig() {
        super.setFormConfig();
        this.PageView.RegName = "dwh_tabless_source";
        this.PageView.PageButtons = {
            Insert: { Text: "新建表", Name: "Insert" }
        };
        this.PageView.DataButtons = {
            "Update": {
                Text: "管理"
            },
            "Delete": {
                Text: "删除"
            }
        };
        this.PageView.Forms[this.ListFormName].ColumnGroups = [
            {
                DisplayName: "基础信息",
                Name: "baseInfo",
                Columns: ["cluster_id", "name", "cnname", "lifetime", "description"]
            },
            {
                DisplayName: "字段和分区信息",
                Name: "fieldsinfo",
                Columns: ["schema", "part"],
            }
        ];
    }
    setPostData(postData) {
        const _tab = postData.tab;
        delete postData.tab;
        let _res = super.setPostData(postData);
        _res["tab"] = _tab;
        return _res;
    }
};
dwh_tabless_source = __decorate([
    ioc.PlugIn({ BaseType: "ISource", RegName: "dwh_tabless_source", Author: "zhengyukun", Doc: "管理数据表的数据源插件" })
], dwh_tabless_source);
export { dwh_tabless_source };
