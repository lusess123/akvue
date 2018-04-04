import * as pageView from "./../contract/PageView";
export interface ISource {
    PageView: pageView.IPageView;
    asyncLoadData(): Promise<void>;
    initData(): any;
    asyncSearch(postData: any): Promise<void>;
    decode(regName: any, val: any): string;
    readonly getSearchColumns: pageView.IColumn[];
    readonly getListFormColumns: pageView.IColumn[];
    readonly getListFormData: any[];
    readonly getDataButtonsList: pageView.IDataButton[];
    readonly getPagerData: any;
    readonly getDataRowKey: string;
    command(name: string, ids?: string[]): any;
    readonly getColumnGroupsByPageStyle: pageView.IColumnGroup[];
}
