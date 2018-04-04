import { BaseCol, IBaseColConfig } from "./../BaseCol";
export interface IDateTimeDetailColConfig extends IBaseColConfig {
}
export declare class DateTimeDetailCol extends BaseCol {
    constructor(config?: IDateTimeDetailColConfig);
    protected pGetDataText(): any;
}
