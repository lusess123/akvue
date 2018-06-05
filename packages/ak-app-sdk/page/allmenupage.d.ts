import { BasePage } from "ak-lib-web/basepage";
import { IApp } from "ak-lib-web/app/IApp";
import { IMenu } from "ak-lib-web/app/IMenu";
import { ITreeNode } from './../lib/tree';
export declare class AllMenuPage extends BasePage {
    Title: string;
    protected loadPage(): void;
    getAppInfo(): IApp[];
    getMenuTreeObj(): ITreeNode[];
    mapTree(menu: IMenu): ITreeNode;
}
