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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ioc, vue } from "ak-lib-sys";
import { BasePage } from "ak-lib-web/basepage";
import { eventShowComFactory } from "./eventbuspage";
var TestVmBasePage = /** @class */ (function (_super) {
    __extends(TestVmBasePage, _super);
    function TestVmBasePage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TestVmBasePage.prototype.pageMethod1 = function (d) {
        alert("父类  TestVmBasePage.pageMethod1" + d.toString());
    };
    return TestVmBasePage;
}(BasePage));
export { TestVmBasePage };
var testvmPage = /** @class */ (function (_super) {
    __extends(testvmPage, _super);
    function testvmPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Title = "testvm";
        _this.TableObj = null;
        return _this;
    }
    testvmPage.prototype.setTableObj = function () {
        this.TableObj = eventShowComFactory(this.getEvent().showAllEvent(), this.UniId, "<p>消息总线</p>");
    };
    testvmPage.prototype.loadPage = function () {
        this.setTableObj();
    };
    testvmPage.prototype.pageMethod1 = function (d) {
        //  alert(d);
        _super.prototype.pageMethod1.call(this, d);
        alert("子类   testvmPage.pageMethod1" + d.toString());
        this.callUpdate();
    };
    testvmPage.prototype.callUpdate = function () {
        var _this = this;
        // window["xxx"] =eventBus.GetAppEvent();
        // alert("更新组件");
        //  this.forceUpdate();
        // const _ff =  this.getEvent().showAllEvent();
        // core.alert(_ff);
        // core.alert(this.renderString());
    };
    testvmPage.prototype.getThisStr = function () {
        var _vm = this;
        var _obj = __assign({}, _vm, { $store: null }, { fLoacalEventBus: null });
        return "";
        // return util2.inspect(_obj);
        //return getPropertyNames(_obj);
    };
    testvmPage = __decorate([
        vue.com("<div>\n\n<h1>{{vm.Title}}</h1>\n<h2>{{new Date()}}</h2>\n<Button @click='vm.pageMethod1(new Date())'>com\u8C03\u7528vm\u7684\u51FD\u6570</Button>\n" + vue.vm("TableObj") + "\n<pre>\n<code>{{vm.getThisStr()}}</code>\n</pre>\n</div>", {
            mounted: function () {
                this.vm.setTableObj();
            }
        }),
        ioc.PlugIn({ RegName: "testvmPage", BaseType: "IPage", CreateDate: "2018-03-02", Doc: "testvm页面插件" })
    ], testvmPage);
    return testvmPage;
}(TestVmBasePage));
export { testvmPage };
