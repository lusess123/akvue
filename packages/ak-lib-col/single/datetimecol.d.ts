import { BaseCol, IBaseColConfig } from "../basecol";
export interface IDateTimeColConfig extends IBaseColConfig {
}
export declare class DateTimeCol extends BaseCol {
    constructor(config?: IDateTimeColConfig);
}
