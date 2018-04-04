import { BaseCol, IBaseColConfig } from "./../BaseCol";
export interface IDetailColConfig extends IBaseColConfig {
}
export declare class DetailCol extends BaseCol {
    constructor(config?: IDetailColConfig);
    protected pGetDataText(): any;
}
