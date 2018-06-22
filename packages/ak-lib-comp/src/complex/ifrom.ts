export interface ILvForm {
    roles?: IDict<IRule>;
    value?: any;
    options?: Ioption[];
    action?: boolean;
    loading?: boolean;
}

interface IDict<T> {
    [index: string]: T;
}

interface IRule {
    message?: string;
    pattern?: string;
    required?: boolean;

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
