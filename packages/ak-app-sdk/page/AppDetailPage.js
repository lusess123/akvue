var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ioc, vue } from "ak-lib-sys";
import { BasePage } from "ak-lib-web/basepage";
//import { IAPP } from "../../../../mock/management/app";
import event from "ak-lib-sys/event";
var AppDetailPagePage = /** @class */ (function (_super) {
    __extends(AppDetailPagePage, _super);
    function AppDetailPagePage() {
        var _this = _super.call(this) || this;
        _this.AppName = "";
        _this.Title = "应用详细信息";
        _this.setRx("AppInfo");
        return _this;
    }
    AppDetailPagePage.prototype.reset = function (pagename, p1, p2, p3) {
        _super.prototype.reset.call(this, pagename, p1, p2, p3);
        this.AppName = p1;
    };
    AppDetailPagePage.prototype.loadPage = function () {
        this.getInfo();
    };
    AppDetailPagePage.prototype.getInfo = function () {
        var _app = this.getAppInfo();
        if (_app && _app.length > 0) {
            // this.setRx("AppInfo",_app[0]);
            this.AppInfo = _app[0];
            return _app[0];
        }
        return null;
    };
    AppDetailPagePage.prototype.getAppInfo = function () {
        var _this = this;
        var _mo = ioc.Ioc.Current().IocModel();
        var _res = [];
        for (var n in _mo) {
            _res.push(_mo[n]);
        }
        var _apps = _res.filter(function (f) { return f.BaseType == "IApp"; }).map(function (info) {
            return ioc.Ioc.Current().FetchInstance(info.RegName, "IApp");
        });
        var _app = _apps.filter(function (a) { return a.Name.toUpperCase() == _this.AppName.toUpperCase(); });
        // _app[0].getMenus()
        return _app;
    };
    AppDetailPagePage.prototype.enterApp = function () {
        var _menus = this.AppInfo.getMenus();
        event.GetAppEvent().emit("global-main-mounted", _menus, this.getFirstUrl(_menus));
        var _first = this.getFirstUrl(_menus);
        // vuerouter.
    };
    AppDetailPagePage.prototype.getFirstUrl = function (menus) {
        if (menus && menus.length > 0) {
            var _a = menus[0];
            if (_a.children && _a.children.length > 0) {
                return this.getFirstUrl(_a.children);
            }
            else {
                return _a.name;
            }
        }
        return "";
    };
    AppDetailPagePage.prototype.getMenuTreeObj = function () {
        var _this = this;
        var _app = this.getAppInfo();
        if (_app && _app.length > 0) {
            var _menus = _app[0].getMenus();
            var _nodes = _menus.map(function (a) {
                return _this.mapTree(a);
            });
            //core.alert(_nodes);
            return _nodes;
        }
        return [];
    };
    AppDetailPagePage.prototype.mapTree = function (menu) {
        var _this = this;
        var _node = {
            title: menu.text,
            expand: true,
            children: menu.children ? menu.children.map(function (a) {
                return _this.mapTree(a);
            }) : undefined
        };
        return _node;
    };
    AppDetailPagePage = __decorate([
        vue.com("<Card>\n<Row>\n<Col span=\"8\"> <Card><h3>\u5E94\u7528\u83DC\u5355\u4E0E\u6743\u9650</h3><Tree :data=\"vm.getMenuTreeObj()\"></Tree></Card></Col>\n<Col span=\"16\">\n<h3>\u5E94\u7528\u4FE1\u606F\uFF1A</h3>\n<div style=\"text-align:center\" >\n<router-link  :to=\"{path:'/web/appdetailpagepage/'+vm.AppInfo.Name}\" ><Icon :type=\"vm.AppInfo.Icon\" size=\"100\"></Icon></router-link >\n\n\n<Form  :label-width=\"80\" style=\"max-width:15rem\">\n        <FormItem label=\"\u540D\u79F0:\">\n            {{vm.AppInfo.Name}}\n        </FormItem>\n        <FormItem label=\"\u4E2D\u6587\u540D:\">\n        {{vm.AppInfo.Title}}\n        </FormItem>\n        <FormItem label=\"\u63CF\u8FF0\u4FE1\u606F:\">\n        {{vm.AppInfo.Doc}}\n        </FormItem>\n</Form>\n</div>\n\n<Card>\n<Button  @click.prevent=\"vm.enterApp\"    icon=\"arrow-up-a\" type=\"primary\">\u8FDB\u5165\u5E94\u7528</Button>\n<Button icon=\"loop\" >\u91CD\u65B0\u5B89\u88C5\u5E94\u7528</Button>\n<Button icon=\"trash-a\" type=\"error\">\u5378\u8F7D\u5E94\u7528</Button>\n\n<router-link  :to=\"{path:'/nweb/'}\" ><Button>\u8FD4\u56DE\u5E94\u7528\u5217\u8868</Button></router-link >\n</Card>\n<Card ><h2>\u5176\u4ED6\u8BE6\u7EC6\u4FE1\u606F</h2>\n<Tabs value=\"name0\">\n<TabPane label=\"\u9996\u9875\" name=\"name0\">\u9996\u9875\u5185\u5BB9</TabPane>\n        <TabPane label=\"\u6743\u9650\u4E0E\u89D2\u8272\" name=\"name1\">\u6807\u7B7E\u4E00\u7684\u5185\u5BB9</TabPane>\n        <TabPane label=\"\u6D88\u606F\u805A\u5408\" name=\"name2\">\u6807\u7B7E\u4E8C\u7684\u5185\u5BB9</TabPane>\n        <TabPane label=\"\u5DE5\u4F5C\u6D41\" name=\"name3\">\u6807\u7B7E\u4E09\u7684\u5185\u5BB9</TabPane>\n        <TabPane label=\"\u62A5\u8868\" name=\"name6\">\u6807\u7B7E\u4E09\u7684\u5185\u5BB9</TabPane>\n        <TabPane label=\"\u6A21\u5757\u4F9D\u8D56\" name=\"name4\">\u6807\u7B7E\u4E09\u7684\u5185\u5BB9</TabPane>\n        <TabPane label=\"\u63D2\u4EF6\" name=\"name4\">\u6807\u7B7E\u4E09\u7684\u5185\u5BB9</TabPane>\n        <TabPane label=\"\u66F4\u591A...\" name=\"name5\">\u6807\u7B7E\u4E09\u7684\u5185\u5BB9</TabPane>\n    </Tabs>\n</Card>\n</Col>\n</Row>\n \n         </Card>"),
        ioc.PlugIn({ RegName: "AppDetailPagePage", BaseType: "IPage", CreateDate: "2018-01-30", Doc: "AppDetailPage页面插件" }),
        __metadata("design:paramtypes", [])
    ], AppDetailPagePage);
    return AppDetailPagePage;
}(BasePage));
export { AppDetailPagePage };
