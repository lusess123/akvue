import { BasePage } from "ak-lib-web/basepage";
import { ISource } from "./source/ISource";
export declare class BizPage extends BasePage {
    Title: string;
    protected Source: ISource;
    protected loadPage(): void;
    protected loadModule(): void;
    protected readonly getVuexSource: any;
    readonly Store: ISource;
}
