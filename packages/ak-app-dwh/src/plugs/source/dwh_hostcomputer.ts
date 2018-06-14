import {BaseSource} from "ak-lib-biz/src/source/basesource";
import { ioc } from "ak-lib-sys/src/";
import {dwhBaseSource} from "./../../base/dwhbasesource";

import  * as dt  from "../../data/dwh_hostcomputer";dt;
@ioc.PlugIn({BaseType:"ISource",RegName:"dwh_HostComputer",Author:"zhengyukun",Doc:"主机管理的数据源插件"})
export class dwh_HostComputersource   extends  dwhBaseSource {
    Title:string  = "主机管理";
    ModelName:string = "dwh_HostComputer";
    Url: string = "/dwh/data/tables";
}  

