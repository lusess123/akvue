import { BaseCom, IBaseComConfig } from "ak-lib-sys/com/basecom";
export interface IItem {
    cnname: string;
    id: string;
}
export interface ITabSelectorComConfig extends IBaseComConfig {
    ItemList: any;
}
export declare class TabSelectorCom extends BaseCom {
    constructor(config?: ITabSelectorComConfig);
}
