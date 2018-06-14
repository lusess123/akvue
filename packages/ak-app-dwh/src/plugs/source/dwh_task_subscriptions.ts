import {BaseSource} from "ak-lib-biz/src/source/basesource";
import { ioc } from "ak-lib-sys/src";
import {dwhBaseSource} from "./../../base/dwhbasesource";

import  * as dt  from "./../../data/dwh_task_subscriptions";dt;
@ioc.PlugIn({BaseType:"ISource",RegName:"dwh_task_subscriptions",Author:"zhengyukun",Doc:"订阅任务管理的数据源"})
export class dwh_task_subscriptions_source   extends  dwhBaseSource {
    Title:string  = "数据表管理";
    ModelName:string = "dwh_task_subscriptions";
    Url: string = "/dwh/subscriptions";
}  

