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
import { ioc } from "ak-lib-sys";
import { dwhBaseSource } from "./../../base/dwhBaseSource";
import * as dt from "./../../data/dwh_permission";
dt;
var dwh_permissionSource = /** @class */ (function (_super) {
    __extends(dwh_permissionSource, _super);
    function dwh_permissionSource() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Title = "订阅权限";
        _this.ModelName = "dwh_permission";
        _this.Url = "/dwh/subscriptions/";
        return _this;
    }
    dwh_permissionSource = __decorate([
        ioc.PlugIn({ BaseType: "ISource", RegName: "dwh_permissionSource", Author: "zhengyukun", Doc: "订阅权限管理的数据源插件" })
    ], dwh_permissionSource);
    return dwh_permissionSource;
}(dwhBaseSource));
export { dwh_permissionSource };
