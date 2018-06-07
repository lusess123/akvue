import { BasePage } from "./basepage";
import { ioc } from "ak-lib-sys";
import { IApp } from "./app/iapp";
export declare class DefultPage extends BasePage {
    Title: string;
    OrgName: string;
    IsNoAppList: boolean;
    Columns: ({
        title: string;
        key: string;
        render?: undefined;
    } | {
        title: string;
        key: string;
        render: (h: any, params: any) => any;
    })[];
    pagesInfo(): string;
    private fPlugList;
    pageList(): ioc.IClassMeta[];
    appList(): IApp[];
    getPageName(): string;
    getPagePath(name: string, regName: string): {
        Path: string;
        Text: string;
    };
}
