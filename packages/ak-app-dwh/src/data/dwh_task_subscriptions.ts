
import  {Column } from "ak-lib-biz/contract/TableMeta";
export class dwh_task_subscriptions  {
    @Column({DisplayName:"编号",ControlType:"Hidden"})
    id:string ;
    @Column({DisplayName:"订阅名",Search:{}})
    name :string ;
    @Column({DisplayName:"订阅者",Search:{}})
    owner_cnname:string;
    //优先级？
    @Column({DisplayName:"优先级"})
    priority:number;
    @Column({DisplayName:"订阅类型",Search:{},ControlType:"radio",Options:{RegName:"permission"}})
    type: number;
    @Column({DisplayName:"订阅状态",Search:{},ControlType:"radio",Options:{RegName:"subscriptionsState"}})
    state: number;
    @Column({DisplayName:"订阅事件"})
    sub_time:number;
    @Column({DisplayName:"表名",Search:{}})
    table_name:string;
    @Column({DisplayName:"数据源"})
    source_name:string ;
    @Column({DisplayName:"描述"})
    description:string ;
    config:string ;
    @Column({DisplayName:"延迟"})
    delay:string ;
   

}