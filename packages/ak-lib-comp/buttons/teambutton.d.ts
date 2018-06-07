import { BaseCom, IBaseComConfig } from "ak-lib-sys/com/BaseCom";
export interface ITeamButtonComConfig extends IBaseComConfig {
    Buttons: IButton[];
    Data?: any;
}
export interface IButton {
    Name?: string;
    Text?: string;
    Disable?: boolean;
}
export declare class TeamButtonCom extends BaseCom {
    Buttons: IButton[];
    FirstBtn: IButton;
    IsDown: string;
    Data: any;
    readonly IsFirst: boolean;
    constructor(config?: ITeamButtonComConfig);
    changeMenu(val: any): void;
    private fGetFirstBtn();
    clickBtn(name: string): void;
}
