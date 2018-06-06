import { ISource } from "./ISource";
import * as pageView from "./../contract/PageView";
export declare const DetaiComTrans: {
    DateTime: string;
    Date: string;
    Hidden: string;
};
export declare class BaseSource implements ISource {
    PageView: pageView.IPageView;
    fff: string;
    readonly getListFormData: pageView.IDataRow[];
    readonly getPagerData: pageView.IDataRow;
    readonly getColumnGroupsByPageStyle: pageView.IColumnGroup[];
    readonly getSearchColumns: pageView.IColumn[];
    readonly getListFormColumns: pageView.IColumn[];
    readonly getDataButtonsList: pageView.IDataButton[];
    getDetailCol(ctype: string): any;
    initData(): void;
    asyncLoadData(): Promise<void>;
    asyncSearch(postData: any, page?: any): Promise<void>;
    decode(regName: any, val: any): string;
    readonly getDataRowKey: string;
    command(name: string, ids?: string[]): void;
    setSource(pageStyle: string, obj: any): void;
}
