import {BaseSource} from "ak-lib-biz/src/source/basesource";
import { ioc } from "ak-lib-sys/src";
import {dwhBaseSource} from "./../../base/dwhbasesource";

import  * as dt  from "./../../data/dwh_source";dt;
@ioc.PlugIn({BaseType:"ISource",RegName:"dwh_source",Author:"zhengyukun",Doc:"数据源管理的数据源插件"})
export class dwh_source_source   extends  dwhBaseSource {
    Title:string  = "数据源管理";
    ModelName:string = "dwh_source";
    Url: string = "/dwh/data/sources";
}  

