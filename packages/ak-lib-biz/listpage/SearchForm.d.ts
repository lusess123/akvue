import { BaseCom } from "ak-lib-sys/com/basecom";
import { IBasePageConfig } from "ak-lib-web/basepage";
import * as data from "./../contract/pageview";
import { ISource } from "../source/isource";
import { IPageView } from "./../contract/pageview";
export interface ISearchFormConfig extends IBasePageConfig {
    Columns?: data.IColumn[];
    DataRow?: any;
    CodeTables?: any;
    Text?: string;
}
export declare class SearchForm extends BaseCom {
    clear: any;
    DataRow: any;
    readonly CodeTables: any;
    Text: string;
    MesgList: {
        List: string[];
    };
    SearchFormName: string;
    constructor(config?: ISearchFormConfig);
    readonly Store: ISource;
    readonly PageView: IPageView;
    getItemList(item: any): any[];
    readonly getSearchColList: data.IColumn[];
    readonly getNaviColList: data.IColumn[];
    search(): void;
    colChange(vueObj: any, val: string): void;
    colNaviChange(vueObj: any, val: string): void;
}
