 
 //1: 我最近操作的表，2: 个人账号的表，3: 生产账号的表，4: 我管理的表，默认0
 const _TableTabNavi = {
       "0":"所有的表",
       "1":"我最近操作的表",
       "2":"个人账号的表",
       "3":"生产账号的表",
       "4":"我管理的表"
       
 } 

 ///dwh/subscriptions
 //1: 待我审批，2: 权限回收，3: 我的申请。默认1
 const _subscriptionsTabNavi = {
        "1":"待我审批",
        "2":"权限回收",
        "3":"为的申请"
 }
 
 const _Type = {

    
        "1" : "个人账号表",
        "2" : "生产账号表",
    
}

const permission = {
    "1":"实时订阅",
    "2":"离线订阅",
    "3":"实时&离线"
}

const part ={
    "0":"非分区",
    "1":"分区"
}

const subscriptionsState = {
    "-1":"拒绝",
    "0":"未处理",
    "1":"通过",
    "2":"冻结"
}

const permission_level = {
    "1":" 数据源",
    "2":" 表"

}
//数据级别(0-S0,1-S1,2-S2)
const table_level = {
    "0":"S0",
    "1":"S1",
    "2":"S2"
}

const permission_state = {
    "-1":"拒绝",
    "0":"未处理",
    "1":"通过",
    "2":"冻结"
}
//数据源类型，0-未知，1-KAFKA，2-mysql，3-HDFS，4-FTP，5-Oracle
const source_type = {
    "0":"未知",
    "1":"KAFKA",
    "2":"mysql",
    "3":"HDFS",
    "4":"FTP",
    "5":"Oracle"
}
//状态(0-正常,1-冻结)
const task_state = {
   "0":"正常",
   "1":"冻结"
}
//任务类型(1-实时任务,2-周期性任务,3-一次性)
const task_type = {
    "1":"实时任务",
    "2":"周期性任务",
    "3":"一次性"
}

const yesOrNo = {
    "0":"否",
    "1":"是"
}

const table_lifetime = {
    "0":"永久",
    "1":"1周",
    "2":"32天"
}

export  { 
    _Type  ,_TableTabNavi,_subscriptionsTabNavi,
    permission ,
    part,
    subscriptionsState,
    permission_level,
    permission_state,source_type,task_state,yesOrNo,task_type,table_level,table_lifetime
} ;