import { BaseCol, IBaseColConfig } from "./../BaseCol";
export interface IDateTimeColConfig extends IBaseColConfig {
}
export declare class DateTimeCol extends BaseCol {
    constructor(config?: IDateTimeColConfig);
}
