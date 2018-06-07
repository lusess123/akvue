import { BasePage } from "ak-lib-web/basepage";
import { ISource } from "./source/isource";
export declare class BizPage extends BasePage {
    Title: string;
    protected Source: ISource;
    PageStyle: string;
    reset(pagename: any, p1: any, p2: any, p3: any): void;
    protected loadPage(): void;
    protected: any;
    loadModule(): void;
    protected readonly getVuexSource: any;
    readonly Store: ISource;
}
