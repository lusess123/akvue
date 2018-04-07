import { BasePage } from "ak-lib-web/basepage";
export declare class FormPage extends BasePage {
    Title: string;
    DataRowJson: string;
    OptionJson: string;
    FormReact: any;
    FormPros: {
        schema: {
            title: string;
            type: string;
            properties: {};
        };
        formData: any;
    };
    constructor(a: any);
    protected loadPage(): void;
    private createOptData();
    DataRow: any;
    FormOpt: Ioption[];
    IsAction: boolean;
    actionChange(): void;
}
export interface Ioption {
    default?: any;
    key: string;
    type: string;
    title: string;
    tooltip?: string;
    selectList?: ISelect[];
    radioList?: ISelect[];
    Options?: any;
}
export interface ISelect {
    label: string;
    value: string;
}
