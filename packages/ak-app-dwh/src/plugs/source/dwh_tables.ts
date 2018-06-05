import {BaseSource} from "ak-lib-biz/source/basesource";
import { ioc } from "ak-lib-sys";
import {dwhBaseSource} from "./../../base/dwhbasesource";

import * as dt from "./../../data/dwh_tables"; dt;
import * as contractFile from "ak-lib-biz/contract/net";

@ioc.PlugIn({ BaseType: "ISource", RegName: "dwh_tabless_source", Author: "zhengyukun", Doc: "管理数据表的数据源插件" })
export class dwh_tabless_source extends dwhBaseSource {
    Title: string = "数据表管理";
    ModelName: string = "dwh_tables";
    Url: string = "/dwh/data/tables";

    protected setFormConfig() {
        super.setFormConfig();

        this.PageView.RegName = "dwh_tabless_source";

        this.PageView.PageButtons = {
            Insert: { Text: "新建表",Name:"Insert" }
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
                Columns:["cluster_id","name","cnname","lifetime","description"]
               

            },
            {
                DisplayName: "字段和分区信息",
                Name: "fieldsinfo",
                Columns: ["schema", "part"],

            }
        ];


    }

    protected setPostData(postData): contractFile.IGetReq {
        const _tab = postData.tab;
        delete postData.tab;
        let _res = super.setPostData(postData);
        _res["tab"] = _tab;
        return _res;
    }


}

