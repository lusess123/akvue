import  {Column } from "ak-lib-biz/contract/TableMeta";

export class dwh_search_tables   {
    @Column({DisplayName:"编号",ControlType:"Hidden"})
    id:string ;
    @Column({DisplayName:"英文名",Search:{}})
    name :string ;
    @Column({DisplayName:"中文名"})
    cnname :string ;
   //  @Column({DisplayName:"表类型",Options:{RegName:"_Type"},ControlType:"radio"})
   //  type :number ;
    @Column({DisplayName:"集群名称"})
    cluster_name:string ;
    @Column({DisplayName:"负责人"})
    owner_name:string;

    @Column({DisplayName:"更新时间",ControlType:"DateTime"})
   update_time:number;

   @Column({DisplayName:"描述"})
   description:string;

    @Column({DisplayName:"数据源名称", Width:"110", Search:{}})
    source_name:string ;
    @Column({DisplayName:"级别",ControlType:"radio",Options:{RegName:"table_level"}})
    level:number ;
    @Column({DisplayName:"订阅数"})
    total_sub_count:number;
}