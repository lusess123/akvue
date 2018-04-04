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
import { BasePage } from "./basepage";
import { core, ioc, vue, util } from "ak-lib-sys";
//import { IAPP } from "../../mock/management/app";
//import { fail } from "assert";
debugger;
var DefultPage = /** @class */ (function (_super) {
    __extends(DefultPage, _super);
    function DefultPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //_VueObj : any  = _vue;
        _this.Title = "系统默认页面";
        _this.IsNoAppList = false;
        _this.Columns = [
            {
                title: "接口/契约", key: "BaseType"
            },
            { title: "插件注册名称", key: "RegName" },
            { title: "作者", key: "Author" },
            { title: "创建时间", key: "CreatDate" },
            { title: "注释", key: "Message" },
            {
                title: "操作", key: "opt",
                render: function (h, params) {
                    var _regName = params.row["RegName"].toLowerCase();
                    var _base = params.row["BaseType"];
                    var _vm = _this.getPagePath(_base, _regName);
                    return vue.tpl(h)("\n              <div>\n               <router-link :to=\"{path:vm.Path}\"  ><Button  v-if='vm.Path != \"\" '>{{vm.Text}}</Button></router-link>\n              </div>\n         ", {
                        Val: _base,
                        RegName: _regName,
                        Path: _vm.Path,
                        Text: _vm.Text
                        // IsPage:  params.row[params.column.key] == "IPage"
                    });
                }
            },
        ];
        return _this;
    }
    DefultPage.prototype.pagesInfo = function () {
        var _mo = ioc.Ioc.Current().IocModel();
        return core.json(_mo);
    };
    DefultPage.prototype.pageList = function () {
        if (!this.fPlugList) {
            var _mo = ioc.Ioc.Current().IocModel();
            // core.log(_mo,{info:"插件信息 ： ",sign:"app"});
            var _res = [];
            for (var n in _mo) {
                _res.push(_mo[n]);
            }
            _res = _res.sort(util.sortBy("BaseType", 1));
            this.fPlugList = _res;
        }
        return this.fPlugList;
    };
    DefultPage.prototype.appList = function () {
        if (!this.fPlugList) {
            this.pageList();
        }
        var _res = this.fPlugList.filter(function (a) { return a.BaseType == "IApp"; });
        var _apps = _res.map(function (info) {
            return ioc.Ioc.Current().FetchInstance(info.RegName, "IApp");
        });
        // core.alert(_apps);
        return _apps;
    };
    DefultPage.prototype.getPageName = function () {
        // alert(this.PageName);
        return this.PageName ? this.PageName.toLowerCase() : "defaultpage";
    };
    DefultPage.prototype.getPagePath = function (name, regName) {
        switch (name) {
            case "IPage":
                return { Path: "/web/" + regName, Text: "页面跳转" };
            case "ISource":
                return { Path: "/web/listpage/" + regName, Text: "业务模块搜索" };
            case "vue":
                return { Path: "/web/vue/" + regName, Text: "vue无参数组件" };
            default:
                break;
        }
        return { Path: "", Text: "" };
    };
    DefultPage = __decorate([
        ioc.PlugIn({ BaseType: "IPage", RegName: "defaultpage" }),
        vue.com("\n<div>\n   <Card>\n   <h1 v-if=\"vm.getPageName() != 'defaultpage'\"><Icon type=\"sad-outline\"></Icon> \u627E\u4E0D\u5230\u540D\u79F0\u4E3A\uFF1A  <b>{{vm.PageName}}</b>  \u7684\u9875\u9762</h1>\n   \n   <Card v-if=\"!vm.IsNoAppList\">\n   <p  slot=\u201Ctitle\u201D><h2>\u5E94\u7528\u5546\u5E97\u5217\u8868\uFF1A</h2></p>\n   <Row  :gutter=\"16\">\n   <Col span=\"6\" v-for=\" app in vm.appList()\" :key=\"app.Name\">\n            <Card style=\"text-align:center\" >\n                <router-link  :to=\"{path:'/nweb/appdetailpagepage/'+app.Name}\" ><Icon :type=\"app.Icon\" size=\"100\"></Icon></router-link >\n                <p>{{app.Title}}</p>\n               \n            </Card>\n        </Col>\n   </Row>\n\n   </Card>\n   <Card>\n   <h1 slot=\"title\">\u4EE5\u4E0B\u662F\u6240\u6709\u7684\u63D2\u4EF6\uFF1A</h1>\n   <Table   size=\"large\" stripe  :columns=\"vm.Columns\" :data=\"vm.pageList()\"></Table>\n  </Card>\n  </Card>\n</div>\n")
    ], DefultPage);
    return DefultPage;
}(BasePage));
export { DefultPage };
