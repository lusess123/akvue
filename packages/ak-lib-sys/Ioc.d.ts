export interface IClassMeta {
    RegName?: string;
    Author?: string;
    Message?: string;
    BaseType?: any;
    InstanceType?: any;
    customData?: any;
    CreateDate?: string;
}
export declare function applyNew(ctor: any, args: any[]): any;
export interface IErrorData {
    Path: string;
    error: string;
}
export interface IInstanceMeta {
    ClassMeta: IClassMeta;
    InstanceObj: any;
}
export interface IInstanceDict {
    [index: string]: IInstanceMeta;
}
export interface IClassList {
    [index: string]: IClassMeta;
}
export interface IIocAsy<T> {
    (obj: T): void;
}
export interface IRegisterTypeSrcConfig {
    NullFun?: INullFun;
    Args?: any[];
}
export interface INullFun {
    (regName: string, baseTypeStr: string): void;
}
export interface IFetchConfig {
    Args?: any[];
}
export declare class Ioc {
    private static fIoc;
    static Current(): Ioc;
    IocModel(): IClassList;
    IocSrcModel(): IClassList;
    private fInstanceClassList;
    private fInstanceSrcList;
    RegisterType(regName: string, baseType: any, instaceType: any, customData?: any, meta?: IClassMeta): void;
    RegisterTypeSrc(regName: string, baseType: any, src: string): void;
    FetchAsyInstance<T>(regName: string, baseType: any, fun: IIocAsy<T>, error?: Function, config?: IRegisterTypeSrcConfig): void;
    private fFetchAsyInstance<T>(regName, baseType, fun, error?, config?);
    private fFetchInstance<T>(regName, baseType, config?);
    FetchInstance<T>(regName: string, baseType: any, config?: IFetchConfig): T;
    static fGetFunName(s: any): any;
    GetTypeList(baseType: any): Array<IClassMeta>;
}
export interface IPlugMeta {
    RegName: string;
    BaseType: any;
    CreateDate?: string;
    Doc?: string;
    Author?: string;
}
export declare function PlugIn(plugMeta: IPlugMeta): (constructor: Function) => void;
export declare function getType(baseClass: any, name: string): any;
