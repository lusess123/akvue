import {BaseSource} from "ak-lib-biz/source/BaseSource";
import { ioc,net } from "ak-lib-sys";
import {dwhBaseSource} from "./../../base/dwhBaseSource";

import {dwh_search_tables} from "./../../data/dwh_search_tables";dwh_search_tables;
@ioc.PlugIn({BaseType:"ISource",RegName:"dwh_search_tables_source",Author:"zhengyukun",Doc:"搜索数据表的数据源插件"})
export class dwh_search_tables_source   extends  dwhBaseSource {
    Title:string  = "数据表";
    ModelName:string = "dwh_search_tables";
    Url: string = "/dwh/data/tables";
   
   protected  setFormConfig(){
         super.setFormConfig();
         //this.SourceObj
         this.PageView.DataButtons = {
            
            "apply":{
                Text:"申请订阅授权",
                Name:"apply"
            }
        } ;

        // DataButtons:
    }
}  

