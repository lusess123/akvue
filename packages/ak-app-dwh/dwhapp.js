var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BaseApp } from "ak-lib-web/app/baseapp";
import { ioc } from "ak-lib-sys";
let dwhApp = class dwhApp extends BaseApp {
    constructor() {
        super(...arguments);
        this.MenuList = _menus;
        this.Name = "dwh";
        this.Title = "数仓管理";
        this.Doc = "数据仓库管理系统";
        this.Icon = "cube";
    }
};
dwhApp = __decorate([
    ioc.PlugIn({ RegName: "dwhApp", BaseType: "IApp", Doc: "数据仓库管理系统应用插件" })
], dwhApp);
export { dwhApp };
const _menus = [
    {
        text: '数据管理',
        name: 'ttt',
        icon: 'fa-database',
        children: [
            // { name: 'dwh.table.search', text: '查找数据',icon:'search' },
            ///dwh/table/search
            { name: '/web/listpage/dwh_search_tables_source', text: '查找数据', icon: 'table' },
            { name: '/web/listpage/dwh_tabless_source', text: '数据表管理', icon: 'table' },
            { name: '/web/listpage/dwh_permissionsource', text: '订阅权限管理' },
            { name: '/web/listpage/dwh_task_subscriptions', text: '订阅任务管理' },
        ]
    },
    {
        text: '数据集成',
        name: 'dwh.data.integration',
        icon: 'fa-plug',
        children: [
            { name: '/web/listpage/dwh_source', text: '数据源管理' },
            // { name: '/dwh/task/edit', text: '编辑任务' },
            { name: '/web/listpage/dwh_task', text: '调度任务' },
        ]
    },
    {
        text: '运维中心',
        name: 'dwh.operation',
        icon: 'fa-cog',
        children: [
            { name: '/web/listpage/dwh_HostComputer', text: '主机管理' },
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
];
