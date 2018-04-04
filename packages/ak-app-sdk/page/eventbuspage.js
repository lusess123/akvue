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
import eventBus from "ak-lib-sys/event";
import * as table from "ak-lib-comp/iview/table";
var EventBusPage = /** @class */ (function (_super) {
    __extends(EventBusPage, _super);
    function EventBusPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Title = "EventBusPage";
        _this.EventInfo = [];
        _this.TableObj = null;
        return _this;
    }
    EventBusPage.prototype.loadPage = function () {
        this.TableObj = eventShowComFactory(eventBus.GetAppEvent().showAllEvent(), this.UniId, "<p >全局消息总线{{vm.UniId}}</p>");
        window["rrr"] = eventBus.GetAppEvent();
    };
    EventBusPage = __decorate([
        vue.com("\n <Card>\n   " + vue.vm("TableObj") + "\n  </Card>\n"),
        ioc.PlugIn({ RegName: "EventBusPage", BaseType: "IPage", CreateDate: "2018-03-02", Doc: "EventBusPage页面插件" })
    ], EventBusPage);
    return EventBusPage;
}(BasePage));
export { EventBusPage };
export var eventShowComFactory = function (data, uniid, title) {
    return new table.TableCom({
        UniId: uniid,
        DataTable: data,
        Columns: [
            {
                key: "FunCodeList",
                title: "代码",
                type: table.ColumnType.expand,
                render: function (h, params) {
                    return vue.tpl(h)("<div>\n                            <Card v-for=\" (code,index) in vm.codes\">\n                            <h2 slot=\"title\">{{index}}</h2>\n                                <pre>\n                                <code>{{code}}</code>\n                                </pre>\n                            </Card>\n                            </div>", { codes: params.row.FunCodeList.split("|") });
                }
            },
            { key: "EventName", title: "消息主题" },
            { key: "FunLength", title: "订阅数" }
            // {key:"select",title:"选择",type:table.ColumnType.selection},
        ],
        Footer: title ? {
            Tpl: title,
            VmFun: function (a) {
                return __assign({}, a);
            }
        } : null
    });
};
