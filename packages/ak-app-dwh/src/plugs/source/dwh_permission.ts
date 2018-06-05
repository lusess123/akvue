import {BaseSource} from "ak-lib-biz/source/basesource";
import { ioc } from "ak-lib-sys";
import {dwhBaseSource} from "./../../base/dwhbasesource";

import  * as dt  from "./../../data/dwh_permission";dt;

@ioc.PlugIn({BaseType:"ISource",RegName:"dwh_permissionSource",Author:"zhengyukun",Doc:"订阅权限管理的数据源插件"})
export class dwh_permissionSource   extends  dwhBaseSource {
    Title:string  = "订阅权限";
    ModelName:string = "dwh_permission";
    Url: string = "/dwh/subscriptions/";
}  

