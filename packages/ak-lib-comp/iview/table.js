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
import { BaseCom } from "ak-lib-sys/com/BaseCom";
/**
 * 字段类型
 *
 * @export
 * @enum {number}
 */
export var ColumnType;
(function (ColumnType) {
    //index、selection、expand、html
    /**
     * 索引
     */
    ColumnType["index"] = "index";
    ColumnType["selection"] = "selection";
    ColumnType["expand"] = "expand";
    ColumnType["html"] = "html";
})(ColumnType || (ColumnType = {}));
var TableCom = /** @class */ (function (_super) {
    __extends(TableCom, _super);
    function TableCom(config) {
        var _this = _super.call(this, config) || this;
        _this.Columns = [];
        _this.DataTable = [];
        _this.Footer = null;
        _this.Columns = config.Columns;
        _this.DataTable = config.DataTable;
        if (!_this.Columns && config.DataTable.length > 0) {
            var _tpl = _this.DataTable[0];
            _this.Columns = [];
            for (var n in _tpl) {
                _this.Columns.push({
                    title: n,
                    key: n
                });
            }
        }
        if (config.Footer) {
            _this.Footer = vue.cvue(config.Footer.VmFun(_this))(config.Footer.Tpl);
        }
        return _this;
    }
    TableCom = __decorate([
        ioc.PlugIn({ RegName: "TableCom", BaseType: "BaseCom", CreateDate: "2018-03-02", Doc: "Table组件插件" }),
        vue.com("\n<Table   size=\"large\" stripe  :columns=\"vm.Columns\" :data=\"vm.DataTable\">\n<template slot=\"header\" v-if=\"vm.Footer\">" + vue.vm("Footer") + "</template>\n</Table>\n"),
        __metadata("design:paramtypes", [Object])
    ], TableCom);
    return TableCom;
}(BaseCom));
export { TableCom };
