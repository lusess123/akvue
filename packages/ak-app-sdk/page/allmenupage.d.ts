import { BasePage } from "ak-lib-web/basepage";
import { IApp } from "ak-lib-web/app/iapp";
import { IMenu } from "ak-lib-web/app/imenu";
import { ITreeNode } from './../lib/tree';
export declare class AllMenuPage extends BasePage {
    Title: string;
    protected loadPage(): void;
    getAppInfo(): IApp[];
    onSelectChange(nodes: ITreeNode[]): void;
    getMenuTreeObj(): ITreeNode[];
    mapTree(menu: IMenu, _menus?: any): ITreeNode;
}
