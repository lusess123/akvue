import { BaseCom, IBaseComConfig } from "ak-lib-sys/com/BaseCom";
export interface ILvForm {
    rules?: IDict<IRule>;
    value?: any;
    options?: Ioption[];
    action?: boolean;
    loading?: boolean;
}
export interface IDict<T> {
    [index: string]: T;
}
export interface IRule {
    message?: string;
    pattern?: string;
    required?: boolean;
    type?: string;
    min?: number;
    max?: number;
    trigger?: string;
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
export interface IVmFormComConfig extends IBaseComConfig, ILvForm {
}
export declare class VmFormCom extends BaseCom implements ILvForm {
    rules?: IDict<IRule>;
    value?: any;
    options?: Ioption[];
    action?: boolean;
    loading?: boolean;
    constructor(config?: IVmFormComConfig);
}
