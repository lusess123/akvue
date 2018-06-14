
import  {Column } from "ak-lib-biz/src/contract/tablemeta";

export class dwh_HostComputer   {
    @Column({DisplayName:"主键编号",ControlType:"hidden"})
    id:string ;
    @Column({DisplayName:"状态"})
    state:number ;
    @Column({DisplayName:"名称",Search:{}})
    cnname:string ;
    @Column({DisplayName:"角色"})
    role:number ;
    @Column({DisplayName:"上一检测信号",Width:"100"})
    lastcheck:string ;
    @Column({DisplayName:"平均负载"})
    avgload:string ;
    @Column({DisplayName:"磁盘使用情况"})
    diskuser:string ;
    @Column({DisplayName:"物理内存"})
    phymomery:string ;
    @Column({DisplayName:"交换空间"})
    exchangespace:string ;

}