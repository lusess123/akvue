import { BaseCom, IBaseComConfig } from "ak-lib-sys/com/basecom";
export interface IBaseColConfig extends IBaseComConfig {
    DataValue: any;
    RegName?: string;
    DataSet?: any;
}
export declare class BaseCol extends BaseCom {
    private fDataValue;
    private RegName;
    private DataSet;
    constructor(config?: IBaseColConfig);
    DataValue: any;
    readonly DataText: string;
    protected pGetDataValue(): any;
    protected pGetDataText(): any;
}
