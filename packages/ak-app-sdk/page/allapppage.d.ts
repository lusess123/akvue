import { BasePage } from "ak-lib-web/basepage";
import { IApp } from "ak-lib-web/app/IApp";
export declare class AllAppPage extends BasePage {
    Title: string;
    private fAppList;
    protected loadPage(): void;
    goMenu(name: string): void;
    getFirstUrl(menus: any): any;
    appList(): IApp[];
}
