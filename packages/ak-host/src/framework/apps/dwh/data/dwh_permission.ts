import  {Column } from "ak-lib-biz/contract/TableMeta";
export class dwh_permission   {
    @Column({DisplayName:"单号"})
    id:string ;
    @Column({DisplayName:"",Search:{IsNavi:true},Options:{RegName:"_subscriptionsTabNavi"},ControlType:"Tab",ShowPage:"None"})
    tab :number ;
    @Column({DisplayName:"数据源"})
    source_name:string ;
    @Column({DisplayName:"表名"})
    table_name:string;
    @Column({DisplayName:"集群名"})
    cluster_name:string;
    @Column({DisplayName:"订阅类型",ControlType:"radio",Options:{RegName:"permission"}})
    type: number;
    @Column({DisplayName:"申请时间",Search:{ControlType:"DateTime"}})
    apply_time:number;
    @Column({DisplayName:"订阅名",Search:{}})
    name :string ;
    @Column({DisplayName:"授权账号"})
    auth_user_name:string ;

    @Column({DisplayName:"权限级别",Options:{RegName:"permission_level"},Search:{},ControlType:"radio"})
    level:string ;

    @Column({DisplayName:"处理结果",Options:{RegName:"permission_state"},Search:{},ControlType:"radio"})
    state:number ;
}