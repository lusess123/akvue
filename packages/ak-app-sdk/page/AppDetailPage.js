var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { core, ioc, vue } from "ak-lib-sys";
import { BasePage } from "ak-lib-web/basepage";
//import { IAPP } from "../../../../mock/management/app";
import event from "ak-lib-sys/event";
let AppDetailPagePage = class AppDetailPagePage extends BasePage {
    constructor() {
        super();
        this.AppName = "";
        this.Title = "应用详细信息";
        this.setRx("AppInfo");
    }
    reset(pagename, p1, p2, p3) {
        super.reset(pagename, p1, p2, p3);
        this.AppName = p1;
    }
    loadPage() {
        this.getInfo();
    }
    getInfo() {
        const _app = this.getAppInfo();
        if (_app && _app.length > 0) {
            // this.setRx("AppInfo",_app[0]);
            this.AppInfo = _app[0];
            return _app[0];
        }
        return null;
    }
    getAppInfo() {
        const _mo = ioc.Ioc.Current().IocModel();
        let _res = [];
        for (const n in _mo) {
            _res.push(_mo[n]);
        }
        const _apps = _res.filter(f => { return f.BaseType == "IApp"; }).map(info => {
            return ioc.Ioc.Current().FetchInstance(info.RegName, "IApp");
        });
        const _app = _apps.filter(a => a.Name.toUpperCase() == this.AppName.toUpperCase());
        // _app[0].getMenus()
        return _app;
    }
    enterApp() {
        const _menus = this.AppInfo.getMenus();
        const ss = window.sessionStorage;
        if (ss) {
            const _json = core.json(_menus);
            sessionStorage.setItem('menus_session_key', _json);
        }
        event.GetAppEvent().emit("global-main-mounted", _menus, this.getFirstUrl(_menus));
        const _first = this.getFirstUrl(_menus);
        // vuerouter.
    }
    getFirstUrl(menus) {
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
    getMenuTreeObj() {
        const _app = this.getAppInfo();
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
    mapTree(menu) {
        let _node = {
            title: menu.text,
            expand: true,
            children: menu.children ? menu.children.map(a => {
                return this.mapTree(a);
            }) : undefined
        };
        return _node;
    }
};
AppDetailPagePage = __decorate([
    vue.com(`<Card>
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
 
         </Card>`),
    ioc.PlugIn({ RegName: "AppDetailPagePage", BaseType: "IPage", CreateDate: "2018-01-30", Doc: "AppDetailPage页面插件" }),
    __metadata("design:paramtypes", [])
], AppDetailPagePage);
export { AppDetailPagePage };
