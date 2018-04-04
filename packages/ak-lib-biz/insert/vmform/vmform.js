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
import { BaseCom } from "ak-lib-sys/com/BaseCom";
import lvForm from "./vmformvue.vue";
let VmFormCom = class VmFormCom extends BaseCom {
    constructor(config) {
        super(config);
        this.rules = config.rules;
        this.value = config.value;
        this.options = config.options;
        this.action = config.action;
        this.loading = config.loading;
    }
};
VmFormCom = __decorate([
    ioc.PlugIn({ RegName: "VmFormCol", BaseType: "BaseCom", CreateDate: "2018-02-24", Doc: "VmForm组件插件" }),
    vue.com(lvForm),
    __metadata("design:paramtypes", [Object])
], VmFormCom);
export { VmFormCom };
