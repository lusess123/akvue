import { BasePage } from "ak-lib-web/basepage";
import { IApp } from "ak-lib-web/app/IApp";
import { IMenu } from "ak-lib-web/app/IMenu";
import { ITreeNode } from './../lib/tree';
export declare class AppDetailPagePage extends BasePage {
    AppName: string;
    Title: string;
    constructor();
    AppInfo: IApp;
    reset(pagename: any, p1: any, p2: any, p3: any): void;
    protected loadPage(): void;
    getInfo(): IApp;
    getAppInfo(): IApp[];
    enterApp(): void;
    getFirstUrl(menus: IMenu[]): any;
    getMenuTreeObj(): ITreeNode[];
    mapTree(menu: IMenu): ITreeNode;
}
