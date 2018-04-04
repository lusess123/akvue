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
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
import Vue from "vue";
var DymicPage = /** @class */ (function (_super) {
    __extends(DymicPage, _super);
    function DymicPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Title = "Dymic";
        _this.Tpl1 = vue.cvue({ a: 123456 })("<a >{{vm.a}}</a>");
        _this.Tpl2 = Tpl_1({ Name: "dd", fun: function () { alert(123); core.alert(_this.Title); } });
        _this.Tpl3 = vue.cvue({ a: 123456, b: _this })("<a >{{vm.a}}{{vm.b.Title}}</a>");
        _this.cc = undefined;
        return _this;
    }
    DymicPage.prototype.loadPage = function () {
        this.cc = new View("1", "2");
        var fff = this.ggg(templateObject_1 || (templateObject_1 = __makeTemplateObject(["123"], ["123"])));
        console.log(fff);
        core.alert(fff);
    };
    DymicPage.prototype.ggg = function (placeholders) {
        return placeholders;
    };
    DymicPage.prototype.fff = function () {
        return new Date().toString();
    };
    DymicPage.prototype.gg = function () {
        return new View("1", "2");
    };
    Object.defineProperty(DymicPage.prototype, "getcc", {
        get: function () {
            return this.cc.Title;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        vue.compute(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], DymicPage.prototype, "getcc", null);
    DymicPage = __decorate([
        vue.com("<div>\n<Card>\n<h3  slot=\"title\">\nTpl1{{vm.fff()}}|\n{{getcc}}\n</h3>\n" + vue.vm("Tpl1") + "\n" + vue.vm("Tpl2") + "\n" + vue.vm("Tpl3") + "\nview1:\n<View1 :vm=\"{Title:'aaa',DemoName:'bbb'}\" Pro=\"terterter123\"></View1>\n<View2 :vm=\"{Title:'aaa',DemoName:'bbb'}\" Pro=\"vbvbvb\"></View2>\n<View2 :vm=\"vm.cc\" Pro=\"vbvbvb\"></View2>\n<View2 :vm=\"vm.gg()\" Pro=\"cc\"></View2>\n</Card>\n</div>", {
            data: function () {
                return {
                    vf: new View("aaa", "bbb")
                };
            }
        }),
        ioc.PlugIn({ RegName: "DymicPage", BaseType: "IPage", CreateDate: "2018-02-06", Doc: "Dymic页面插件" })
    ], DymicPage);
    return DymicPage;
}(BasePage));
export { DymicPage };
import view1 from "./view/demoView.vue";
Vue.component("View1", view1);
import view2 from "./view/demoView2.vue";
Vue.component("View2", view2);
var Tpl_1 = function (vm) {
    return vue.cvue(vm)("\n          <Button @click.prevent=\"vm.fun.call(vm)\">{{vm.Name}}</Button>\n    ");
    ;
};
var res;
var _params = [];
var fun1 = function (a) {
    _params.push(a);
    // const _fun = _params.push.bind(_params);
    return fun1;
};
fun1("a")("b")("c");
if (_params.length == 1) {
    res = "a";
}
if (_params.length == 2) {
    res = "a" + "b";
}
var View = /** @class */ (function () {
    function View(Title, DemoName) {
        this.Title = Title;
        this.DemoName = DemoName;
    }
    View.prototype.change = function () {
        this.Title = new Date().toString() + "title";
    };
    return View;
}());
var templateObject_1;
//core.alert(res);
