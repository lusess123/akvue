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
import { BaseCom } from "ak-lib-sys/com/basecom";
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
let TableCom = class TableCom extends BaseCom {
    constructor(config) {
        super(config);
        this.Columns = [];
        this.DataTable = [];
        this.Footer = null;
        this.Columns = config.Columns;
        this.DataTable = config.DataTable;
        if (!this.Columns && config.DataTable.length > 0) {
            const _tpl = this.DataTable[0];
            this.Columns = [];
            for (const n in _tpl) {
                this.Columns.push({
                    title: n,
                    key: n
                });
            }
        }
        if (config.Footer) {
            this.Footer = vue.cvue(config.Footer.VmFun(this))(config.Footer.Tpl);
        }
    }
};
TableCom = __decorate([
    ioc.PlugIn({ RegName: "TableCom", BaseType: "BaseCom", CreateDate: "2018-03-02", Doc: "Table组件插件" }),
    vue.com(`
<Table   size="large" stripe  :columns="vm.Columns" :data="vm.DataTable">
<template slot="header" v-if="vm.Footer">${vue.vm("Footer")}</template>
</Table>
`),
    __metadata("design:paramtypes", [Object])
], TableCom);
export { TableCom };
