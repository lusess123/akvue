import { BaseApp } from "ak-lib-web/app/BaseApp";
import { IMenu } from "ak-lib-web/app/IMenu";

import { ioc } from "ak-lib-sys"

@ioc.PlugIn({RegName:"dwhApp",BaseType:"IApp",Doc:"数据仓库管理系统应用插件"})
export class dwhApp extends BaseApp
{
     protected  MenuList = _menus;
     public  Name: string  = "dwh";
     public  Title: string  = "数仓管理";
     public Doc:string = "数据仓库管理系统";
     public Icon:string = "cube";

}




const _menus:IMenu[] = 

[
    {
        text: '数据管理',
        name: 'ttt',
        icon: 'fa-database',
        children: [
           // { name: 'dwh.table.search', text: '查找数据',icon:'search' },
           ///dwh/table/search
            { name: '/web/listpage/dwh_search_tables_source',text: '查找数据' ,icon:'table'},
            { name: '/web/listpage/dwh_tabless_source',text: '数据表管理' ,icon:'table'},
            { name: '/web/listpage/dwh_permissionsource', text: '订阅权限管理' },
            { name: '/web/listpage/dwh_task_subscriptions', text: '订阅任务管理' },
            { name: '/dwh/table/manage', text: '数据表管理_old' ,icon:'table'},
            { name: '/dwh/sub/permission/manage', text: '订阅权限管理_old' },
            { name: '/dwh/sub/task/manage', text: '订阅任务管理_old' },
           
        ]
    },
    {
        text: '数据集成',
        name: 'dwh.data.integration',
        icon: 'fa-plug',
        children: [
            { name: '/web/listpage/dwh_source',text: '数据源管理'},
            { name: '/dwh/task/edit', text: '编辑任务' },
            { name: '/web/listpage/dwh_task', text: '调度任务' },
            { name: '/dwh/source/manage', text: '数据源管理_old' },
            { name: '/dwh/task/schedule', text: '调度任务_old' }
        ]
    },
    {
        text: '运维中心',
        name: 'dwh.operation',
        icon: 'fa-cog',
        children: [
            { name: '/web/listpage/dwh_HostComputer', text: '主机管理' },
            { name: '/dwh/clusters', text: '集群管理' }
        ]
    },
    {
        text: '数据开发',
        name: 'dwh.data.dev',
        icon: 'fa-server',
        children: [
            { name: '#', text: 'TODO' }
        ]
    }
]
