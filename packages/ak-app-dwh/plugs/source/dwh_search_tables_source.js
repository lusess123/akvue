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
import { dwh_search_tables } from "./../../data/dwh_search_tables";
dwh_search_tables;
var dwh_search_tables_source = /** @class */ (function (_super) {
    __extends(dwh_search_tables_source, _super);
    function dwh_search_tables_source() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Title = "数据表";
        _this.ModelName = "dwh_search_tables";
        _this.Url = "/dwh/data/tables";
        return _this;
    }
    dwh_search_tables_source.prototype.setFormConfig = function () {
        _super.prototype.setFormConfig.call(this);
        //this.SourceObj
        this.PageView.DataButtons = {
            "apply": {
                Text: "申请订阅授权",
                Name: "apply"
            }
        };
        // DataButtons:
    };
    dwh_search_tables_source = __decorate([
        ioc.PlugIn({ BaseType: "ISource", RegName: "dwh_search_tables_source", Author: "zhengyukun", Doc: "搜索数据表的数据源插件" })
    ], dwh_search_tables_source);
    return dwh_search_tables_source;
}(dwhBaseSource));
export { dwh_search_tables_source };
