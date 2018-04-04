import { BaseSource } from "ak-lib-biz/source/BaseSource";
import * as pageView from "ak-lib-biz/contract/PageView";
import * as contractFile from "ak-lib-biz/contract/net";
export declare abstract class dwhBaseSource extends BaseSource {
    Title: string;
    ListFormName: string;
    SearchFormName: string;
    ModelName: string;
    Url: string;
    PageView: pageView.IPageView;
    TableName: string;
    initData(): void;
    asyncLoadData(): Promise<void>;
    protected setData(data: any): void;
    protected setFormConfig(): void;
    asyncSearch(postData: any): Promise<void>;
    protected setPostData(postData: any): contractFile.IGetReq;
}
