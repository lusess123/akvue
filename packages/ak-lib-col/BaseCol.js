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
import { vue } from "ak-lib-sys";
var BaseCol = /** @class */ (function (_super) {
    __extends(BaseCol, _super);
    function BaseCol(config) {
        var _this = _super.call(this, config) || this;
        _this.fDataValue = config.DataValue;
        _this.RegName = config.RegName;
        _this.DataSet = config.DataSet;
        return _this;
    }
    Object.defineProperty(BaseCol.prototype, "DataValue", {
        get: function () {
            return this.pGetDataValue();
        },
        set: function (val) {
            this.fDataValue = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseCol.prototype, "DataText", {
        get: function () {
            return this.pGetDataText();
        },
        enumerable: true,
        configurable: true
    });
    BaseCol.prototype.pGetDataValue = function () {
        return this.fDataValue;
    };
    BaseCol.prototype.pGetDataText = function () {
        if (this.RegName) {
            if (this.DataSet[this.RegName]) {
                return this.DataSet[this.RegName][this.fDataValue];
            }
        }
        return "";
    };
    BaseCol = __decorate([
        vue.com("\n    <div>{{vm.DataText}}</div> \n    "),
        __metadata("design:paramtypes", [Object])
    ], BaseCol);
    return BaseCol;
}(BaseCom));
export { BaseCol };
