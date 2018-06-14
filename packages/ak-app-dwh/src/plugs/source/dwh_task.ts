import {BaseSource} from "ak-lib-biz/src/source/basesource";
import { ioc } from "ak-lib-sys/src";
import {dwhBaseSource} from "./../../base/dwhbasesource";

import  * as dt  from "./../../data/dwh_task";dt;
@ioc.PlugIn({BaseType:"ISource",RegName:"dwh_task",Author:"zhengyukun",Doc:"调度任务的数据源插件"})
export class dwh_tasksource   extends  dwhBaseSource {
    Title:string  = "调度任务";
    ModelName:string = "dwh_task";
    Url: string = "/dwh/data/tables";
}  

