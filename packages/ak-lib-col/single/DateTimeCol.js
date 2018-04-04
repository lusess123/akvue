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
import { BaseCol } from "./../BaseCol";
var DateTimeCol = /** @class */ (function (_super) {
    __extends(DateTimeCol, _super);
    function DateTimeCol(config) {
        return _super.call(this, config) || this;
    }
    DateTimeCol = __decorate([
        ioc.PlugIn({ RegName: "DateTimeCol", BaseType: "BaseCol", Author: "zhengyukun", CreateDate: "2018-01-26", Doc: "时间控件插件" }),
        vue.com('<DatePicker type="datetime" placeholder="Select date" ></DatePicker>'),
        __metadata("design:paramtypes", [Object])
    ], DateTimeCol);
    return DateTimeCol;
}(BaseCol));
export { DateTimeCol };
