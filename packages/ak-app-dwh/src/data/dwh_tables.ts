
import  {Column } from "ak-lib-biz/contract/tablemeta";
export class dwh_tables   {
    @Column({DisplayName:"编号",ControlType:"Hidden"})
    id:string ;
    @Column({DisplayName:"表名",Search:{},IsRequire:true})
    name :string ;
    @Column({DisplayName:"中文名",Search:{},IsRequire:true})
    cnname :string ;
    @Column({DisplayName:"",Search:{IsNavi:true},Options:{RegName:"_TableTabNavi"},ControlType:"Tab",ShowPage:"None"})
    tab :number ;
    //@Column({DisplayName:"表查询",Search:{},IsRequire:true})
    //tab: number ;
    @Column({DisplayName:"集群",IsRequire:true,ShowPage:"OnlyEdit"})
    cluster_id:string ;
    @Column({DisplayName:"所属集群",ShowPage:"OnlyRead"})
    cluster_name:string ;
    @Column({DisplayName:"创建时间",ShowPage:"OnlyRead"})
    create_time:number;
    @Column({DisplayName:"物理存储",ShowPage:"OnlyRead",})
    storage:number ;
    @Column({DisplayName:"描述",ShowPage:"OnlyEdit",ControlType:"textarea"})
    description:string ;
    @Column({DisplayName:"生命周期",ShowPage:"OnlyEdit",IsRequire:true,Options:{RegName:"table_lifetime"},ControlType:"radio"})
    lifetime:number;
    @Column({DisplayName:"实时订阅数",ShowPage:"OnlyRead"})
    realtime_sub_count:number;
    @Column({DisplayName:"离线订阅数",ShowPage:"OnlyRead"})
    offline_sub_count:number;


    @Column({DisplayName:"数据源名称",ShowPage:"None"})
    source_name:string ;
    @Column({DisplayName:"级别",ShowPage:"None"})
    level:number ;
    @Column({DisplayName:"订阅类型",Search:{},Options:{RegName:"permission"},ControlType:"radio",ShowPage:"None"})
    permission:number;
    @Column({DisplayName:"字段信息",ShowPage:"OnlyEdit",ControlType:"TableData"})
    schema:string;   
    @Column({DisplayName:"是否分区",Search:{},Options:{RegName:"part"},ControlType:"radio",ShowPage:"OnlyEdit"})
    part :number;
    @Column({DisplayName:"标签",ShowPage:"None"})
    tags:number;

}