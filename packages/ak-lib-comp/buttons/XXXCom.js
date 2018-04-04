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
import { ioc, vue } from "ak-lib-sys";
var XXXCom = /** @class */ (function (_super) {
    __extends(XXXCom, _super);
    function XXXCom(config) {
        return _super.call(this, config) || this;
    }
    XXXCom = __decorate([
        ioc.PlugIn({ RegName: "XXXCol", BaseType: "BaseCom", Author: "zhengyukun", CreateDate: "2018-01-26", Doc: "XXX组件插件" }),
        vue.com('<div>XXXCom</div>'),
        __metadata("design:paramtypes", [Object])
    ], XXXCom);
    return XXXCom;
}(BaseCom));
export { XXXCom };
