import { dwhBaseSource } from "./../../base/dwhBaseSource";
import * as contractFile from "ak-lib-biz/contract/net";
export declare class dwh_tabless_source extends dwhBaseSource {
    Title: string;
    ModelName: string;
    Url: string;
    protected setFormConfig(): void;
    protected setPostData(postData: any): contractFile.IGetReq;
}
