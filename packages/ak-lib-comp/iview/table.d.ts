import { BaseCom, IBaseComConfig } from "ak-lib-sys/com/basecom";
export interface ITableComConfig extends IBaseComConfig {
    Columns?: IColumn[];
    DataTable: IRow[];
    Footer?: ISlot<TableCom>;
}
export interface ISlot<T> {
    Tpl: string;
    VmFun: (obj: T) => any;
}
export interface IRow {
}
export interface IColumn {
    type?: ColumnType;
    title: string;
    /**
     * 列头显示文字
     *
     * @type {string}
     * @memberof IColumn
     */
    key: string;
    render?: Function;
}
/**
 * 字段类型
 *
 * @export
 * @enum {number}
 */
export declare enum ColumnType {
    /**
     * 索引
     */
    index = "index",
    selection = "selection",
    expand = "expand",
    html = "html",
}
export declare class TableCom extends BaseCom {
    Columns: IColumn[];
    DataTable: IRow[];
    Footer: any;
    constructor(config?: ITableComConfig);
}
