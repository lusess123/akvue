var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BaseCom } from "ak-lib-sys/com/basecom";
import { vue } from "ak-lib-sys";
let BaseCol = class BaseCol extends BaseCom {
    constructor(config) {
        super(config);
        this.fDataValue = config.DataValue;
        this.RegName = config.RegName;
        this.DataSet = config.DataSet;
    }
    get DataValue() {
        return this.pGetDataValue();
    }
    set DataValue(val) {
        this.fDataValue = val;
    }
    get DataText() {
        return this.pGetDataText();
    }
    pGetDataValue() {
        return this.fDataValue;
    }
    pGetDataText() {
        if (this.RegName) {
            if (this.DataSet[this.RegName]) {
                return this.DataSet[this.RegName][this.fDataValue];
            }
        }
        return "";
    }
};
BaseCol = __decorate([
    vue.com(`
    <div>{{vm.DataText}}</div> 
    `),
    __metadata("design:paramtypes", [Object])
], BaseCol);
export { BaseCol };
