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
import { BaseCom } from "ak-lib-sys/com/BaseCom";
import { vue, core } from "ak-lib-sys";
var BasePage = /** @class */ (function (_super) {
    __extends(BasePage, _super);
    function BasePage(config) {
        var _this = _super.call(this, config) || this;
        _this.PageName = "";
        // public _VueObj : any ;
        _this.IsSingle$ = true;
        if (config && config.UniId) {
            _this.UniId = config.UniId;
        }
        else {
            _this.UniId = "BasePage" + core.getUniId();
        }
        return _this;
    }
    BasePage.prototype.loadPage = function () {
    };
    BasePage.prototype.sysloadPage = function () {
        this.loadPage();
    };
    BasePage.prototype.reset = function (pagename, p1, p2, p3) {
        this.PageName = pagename,
            this.P1 = p1,
            this.P2 = p2,
            this.P3 = p3;
        //alert(this.PageName); 
    };
    BasePage = __decorate([
        vue.com("\n      <div>\u9875\u9762\u7EC4\u4EF6\uFF1A{{vm.PageName}}</div>\n"),
        __metadata("design:paramtypes", [Object])
    ], BasePage);
    return BasePage;
}(BaseCom));
export { BasePage };
