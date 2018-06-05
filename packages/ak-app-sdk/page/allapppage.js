var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ioc, vue } from "ak-lib-sys";
import { BasePage } from "ak-lib-web/basepage";
import event from "ak-lib-sys/event";
let AllAppPage = class AllAppPage extends BasePage {
    constructor() {
        super(...arguments);
        this.Title = "所有的应用";
    }
    loadPage() { }
    goMenu(name) {
        const _app = this.fAppList.find(a => a.Name == name);
        if (_app) {
            const _menus = _app.getMenus();
            const _url = this.getFirstUrl(_menus);
            if (_url) {
                event.GetAppEvent().emit("global-main-mounted", _menus, _url);
            }
        }
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
    appList() {
        if (!this.fAppList) {
            debugger;
            const _res = ioc
                .Ioc
                .Current()
                .GetTypeList("IApp");
            const _apps = _res.map(info => {
                return ioc
                    .Ioc
                    .Current()
                    .FetchInstance(info.RegName, "IApp");
            });
            // core.alert(_apps);
            this.fAppList = _apps;
        }
        return this.fAppList;
    }
};
AllAppPage = __decorate([
    vue.com(`<div>


<Row  :gutter="16">
<Col span="4"  v-for=" (app,n) in vm.appList()" :key="app.Name" style="padding:1rem">

         <Card style="text-align:center" >
             <a @click="vm.goMenu(app.Name)"><Icon :type="app.Icon" size="100"></Icon></a >
             <p>{{app.Title}}</p>
         </Card>
     </Col>
</Row>



</div>`),
    ioc.PlugIn({ RegName: "AllAppPage", BaseType: "IPage", CreateDate: "2018-06-05", Doc: "AllApp页面插件" })
], AllAppPage);
export { AllAppPage };
