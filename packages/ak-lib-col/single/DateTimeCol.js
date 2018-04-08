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
let DateTimeCol = class DateTimeCol extends BaseCol {
    constructor(config) {
        super(config);
    }
};
DateTimeCol = __decorate([
    ioc.PlugIn({ RegName: "DateTimeCol", BaseType: "BaseCol", Author: "zhengyukun", CreateDate: "2018-01-26", Doc: "时间控件插件" }),
    vue.com('<DatePicker type="datetime" placeholder="Select date" ></DatePicker>'),
    __metadata("design:paramtypes", [Object])
], DateTimeCol);
export { DateTimeCol };
