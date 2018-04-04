import { BasePage } from "ak-lib-web/basepage";
export declare class TestRxPage extends BasePage {
    Title: string;
    List: any;
    Url: string;
    open(): void;
    open1(): void;
    getC(): any;
    protected loadPage(): void;
    changeJson(list: any): void;
}
export declare class TestRxMoule {
    page: {
        form: {
            row: {
                col: string;
                col1: string;
            };
        };
    };
    changeCol(a: any): void;
    changeCol1(a: any): void;
    getCol(): string;
    getCol1(): string;
    getCol3(): string;
    readonly colget: string;
}
