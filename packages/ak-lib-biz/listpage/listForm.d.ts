import { BaseCom, IBaseComConfig } from "ak-lib-sys/com/basecom";
import * as data from "../contract/pageview";
import { IPage } from "./../contract/net";
import { ISource } from "./../source/isource";
import { IPageView } from "../contract/pageview";
export interface IListFormConfig extends IBaseComConfig {
    Columns?: data.IColumn[];
    Datasource?: any[];
    DataSet?: any;
    PageButtons?: data.IDataButton[];
    PagerData?: IPage;
    Text?: string;
}
export declare class ListForm extends BaseCom {
    constructor(config?: any);
    readonly Columns: any;
    Text: string;
    readonly Store: ISource;
    readonly PageView: IPageView;
    readonly Datasource: any[];
    readonly fDataSet: any;
    readonly DataButtons: data.IDataButton[];
    PagerData: IPage;
    sendMesg(msg: string): void;
    private getColWidth(col);
    pageChange(current: number): void;
    private getColumnConfigList(configColumns);
    private getColumnCol(colTypename, val, colRegName);
}
