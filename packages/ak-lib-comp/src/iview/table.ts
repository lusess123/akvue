

import { core, ioc, vue } from "ak-lib-sys/src";
import { BaseCom, IBaseComConfig } from "ak-lib-sys/src/com/basecom";

export interface ITableComConfig extends IBaseComConfig {
      Columns?: IColumn[],
      DataTable:IRow[],
      Footer?:ISlot<TableCom>;
}

export interface ISlot<T> {
    Tpl :string ;
    VmFun:(obj:T)=>any
}

export interface IRow {

}

export interface IColumn{
    type?:ColumnType;
    title:string ;
    /**
     * 列头显示文字
     * 
     * @type {string}
     * @memberof IColumn
     */
    key:string ;
    render?:Function;
}
/**
 * 字段类型
 * 
 * @export
 * @enum {number}
 */
export  enum ColumnType {
    //index、selection、expand、html
    /**
     * 索引
     */
    index  = "index",
    selection = "selection",
    expand = "expand",
    html = "html"
}

@ioc.PlugIn({ RegName: "TableCom", BaseType: "BaseCom", CreateDate: "2018-03-02", Doc: "Table组件插件" })

@vue.com(`
<Table   size="large" stripe  :columns="vm.Columns" :data="vm.DataTable">
<template slot="header" v-if="vm.Footer">${vue.vm("Footer")}</template>
</Table>
`)
export class TableCom extends BaseCom {
    
    Columns: IColumn[] = [];
    DataTable:IRow[] = [];
    Footer:any = null;
    constructor(config?: ITableComConfig) {
        super(config);
        this.Columns = config.Columns ;
        this.DataTable = config.DataTable ;
        if(!this.Columns && config.DataTable.length > 0){

            const _tpl = this.DataTable[0];
            this.Columns = [] ;
            for(const n in _tpl){
                this.Columns.push({
                    title: n ,
                    key:n
                });
            }
           

        }
        if(config.Footer){
            this.Footer = vue.cvue(config.Footer.VmFun(this))(config.Footer.Tpl);
            }
    }

}
