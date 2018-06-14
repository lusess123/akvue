
import  {Column } from "ak-lib-biz/src/contract/tablemeta";


export class dwh_task  {
    @Column({DisplayName:"编号",ControlType:"Hidden"})
    id:string ;
    @Column({DisplayName:"任务名称",Search:{}})
    name :string ;
    @Column({DisplayName:"修改日期"})
    update_time :number ;
    @Column({DisplayName:"任务类型",ControlType:"radio",Options:{RegName:"task_type"},Search:{}})
    type: number;
    @Column({DisplayName:"责任人",Search:{}})
    owner_cnname :string ;
    @Column({DisplayName:"状态",ControlType:"radio",Options:{RegName:"task_state"},Search:{}})
    state: number;
    @Column({DisplayName:"报警设置"})
    alarm_config:string ;
    @Column({DisplayName:"集群"})
    culster:string ;
    @Column({DisplayName:"我的任务",ControlType:"radio",Options:{RegName:"yesOrNo"},Search:{}})
    isown: number;
}