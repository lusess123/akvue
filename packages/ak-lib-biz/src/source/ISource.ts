

 import * as pageView from "./../contract/PageView";

export interface ISource 
{
    PageView : pageView.IPageView  ;
    
    asyncLoadData():Promise<void>;
    initData();
    asyncSearch(postData):Promise<void>;
    decode(regName,val):string;
    readonly getSearchColumns :pageView.IColumn[];
    readonly getListFormColumns:pageView.IColumn[];
    readonly getListFormData:any[];
    readonly getDataButtonsList:pageView.IDataButton[];
    readonly getPagerData:any;

    readonly getDataRowKey:string;

    command(name:string ,ids?:string[]);

    readonly getColumnGroupsByPageStyle:pageView.IColumnGroup[];
     
}