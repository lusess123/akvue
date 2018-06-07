import { BasePage } from "ak-lib-web/basepage";
export declare class CodePage extends BasePage {
    Name: string;
    Code: string;
    CodeType: string;
    Title: string;
    MesgList: {
        List: string[];
    };
    protected loadPage(): void;
    change(): void;
}
