import { IPage } from "./IPage";
import { BaseCom, IBaseComConfig } from "ak-lib-sys/com/BaseCom";
export interface IBasePageConfig extends IBaseComConfig {
}
export declare class BasePage extends BaseCom implements IPage {
    Title: string;
    PageName: string;
    P1: string;
    P2: string;
    P3: string;
    protected IsSingle$: boolean;
    constructor(config?: IBaseComConfig);
    protected loadPage(): void;
    sysloadPage(): void;
    reset(pagename: any, p1: any, p2: any, p3: any): void;
}
