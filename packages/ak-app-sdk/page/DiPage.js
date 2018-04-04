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
import { ioc, vue } from "ak-lib-sys";
import { BasePage } from "ak-lib-web/basepage";
//import {Container} from "typedi";
var DiPage = /** @class */ (function (_super) {
    __extends(DiPage, _super);
    function DiPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Title = "Di";
        _this.IsPage = "";
        return _this;
    }
    DiPage.prototype.loadPage = function () {
        // core
        // let someClass1 = Container.get(SomeClass);
        // someClass1.someMethod();
        // let someClass2 = Container.get(SomeClass);
        // this.IsPage = someClass1 === someClass2 ? "同一个":"不同个"
    };
    DiPage = __decorate([
        vue.com("<div>DiPage{{vm.IsPage}}</div>"),
        ioc.PlugIn({ RegName: "DiPage", BaseType: "IPage", CreateDate: "2018-02-04", Doc: "Di页面插件" })
    ], DiPage);
    return DiPage;
}(BasePage));
export { DiPage };
var SomeClass = /** @class */ (function () {
    function SomeClass() {
    }
    SomeClass.prototype.someMethod = function () {
        // alert(123);
    };
    return SomeClass;
}());
//someClass.someMethod();
