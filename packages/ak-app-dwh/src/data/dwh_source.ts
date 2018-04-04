
import  {Column } from "ak-lib-biz/contract/TableMeta";

export class dwh_source   {
    @Column({DisplayName:"单号"})
    id:string ;
    @Column({DisplayName:"数据源名称",Search:{}})
    source_name:string ;
    @Column({DisplayName:"数据源类型",Search:{},ControlType:"radio",Options:{RegName:"source_type"}})
    type: number;
    @Column({DisplayName:"连接信息"})
    config:string;
    @Column({DisplayName:"数据源描述"})
    description:string;
    @Column({DisplayName:"创建人"})
    creator_cnname:string;
    @Column({DisplayName:"时间"})
    update_time:number;
}