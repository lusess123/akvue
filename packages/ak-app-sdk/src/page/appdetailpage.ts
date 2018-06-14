

import { core, ioc, vue, util } from "ak-lib-sys/src";
import { BasePage } from "ak-lib-web/src/basepage";
import { IApp } from "ak-lib-web/src/app/iapp";
import { IMenu } from "ak-lib-web/src/app/imenu";
//import { IAPP } from "../../../../mock/management/app";
import event from "ak-lib-sys/src/event";
import vuerouter from "vue-router"
import Vue from "vue";
import {ITreeNode} from './../lib/tree'

@vue.com(`<Card>
<Row>
<Col span="8"> <Card><h3>应用菜单与权限</h3><Tree :data="vm.getMenuTreeObj()"></Tree></Card></Col>
<Col span="16">
<h3>应用信息：</h3>
<div style="text-align:center" >
<router-link  :to="{path:'/web/appdetailpagepage/'+vm.AppInfo.Name}" ><Icon :type="vm.AppInfo.Icon" size="100"></Icon></router-link >


<Form  :label-width="80" style="max-width:15rem">
        <FormItem label="名称:">
            {{vm.AppInfo.Name}}
        </FormItem>
        <FormItem label="中文名:">
        {{vm.AppInfo.Title}}
        </FormItem>
        <FormItem label="描述信息:">
        {{vm.AppInfo.Doc}}
        </FormItem>
</Form>
</div>

<Card>
<Button  @click.prevent="vm.enterApp"    icon="arrow-up-a" type="primary">进入应用</Button>
<Button icon="loop" >重新安装应用</Button>
<Button icon="trash-a" type="error">卸载应用</Button>

<router-link  :to="{path:'/nweb/'}" ><Button>返回应用列表</Button></router-link >
</Card>
<Card ><h2>其他详细信息</h2>
<Tabs value="name0">
<TabPane label="首页" name="name0">首页内容</TabPane>
        <TabPane label="权限与角色" name="name1">标签一的内容</TabPane>
        <TabPane label="消息聚合" name="name2">标签二的内容</TabPane>
        <TabPane label="工作流" name="name3">标签三的内容</TabPane>
        <TabPane label="报表" name="name6">标签三的内容</TabPane>
        <TabPane label="模块依赖" name="name4">标签三的内容</TabPane>
        <TabPane label="插件" name="name4">标签三的内容</TabPane>
        <TabPane label="更多..." name="name5">标签三的内容</TabPane>
    </Tabs>
</Card>
</Col>
</Row>
 
         </Card>`)
@ioc.PlugIn({ RegName: "AppDetailPagePage", BaseType: "IPage", CreateDate: "2018-01-30", Doc: "AppDetailPage页面插件" })
export class AppDetailPagePage extends BasePage {

    public AppName: string = "";
    public Title: string = "应用详细信息";


    constructor() {
        super();
        this.setRx("AppInfo");
    }

    public AppInfo: IApp;

    public reset(pagename, p1, p2, p3) {
        super.reset(pagename, p1, p2, p3);
        this.AppName = p1;

    }
    protected loadPage() {
        this.getInfo();
    }

    public getInfo(): IApp {
        const _app: IApp[] = this.getAppInfo();
        if (_app && _app.length > 0) {
            // this.setRx("AppInfo",_app[0]);
            this.AppInfo = _app[0];
            return _app[0];
        }
        return null;
    }

    public getAppInfo(): IApp[] {

        const _res = ioc.Ioc.Current().GetTypeList("IApp");

        const _apps = _res.map(info => {

            return ioc.Ioc.Current().FetchInstance<IApp>(info.RegName, "IApp");

        })

        const _app = _apps.filter(a => a.Name.toUpperCase() == this.AppName.toUpperCase());
        // _app[0].getMenus()
        return _app;

    }


    public enterApp() {
        const _menus = this.AppInfo.getMenus();

       

        event.GetAppEvent().emit("global-main-mounted", _menus, this.getFirstUrl(_menus));
        const _first = this.getFirstUrl(_menus);
        // vuerouter.

    }

    getFirstUrl(menus: IMenu[]) {
        if (menus && menus.length > 0) {
            const _a = menus[0];
            if (_a.children && _a.children.length > 0) {
                return this.getFirstUrl(_a.children);
            }
            else {
                return _a.name;
            }
        }
        return "";
    }


    public getMenuTreeObj() {
        const _app: IApp[] = this.getAppInfo();
        if (_app && _app.length > 0) {
            const _menus = _app[0].getMenus();
            const _nodes = _menus.map(a => {
                return this.mapTree(a);
            });

            //core.alert(_nodes);
            return _nodes;

        }
        return [];
    }

    public mapTree(menu: IMenu): ITreeNode {

        let _node: ITreeNode = {
            title: menu.text,
            expand: true,
            children: menu.children ? menu.children.map(
                a => {
                    return this.mapTree(a);
                }
            ) : undefined
        };



        return _node;
    }



}

