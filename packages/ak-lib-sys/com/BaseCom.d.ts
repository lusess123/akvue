import { ICom } from "./ICom";
import { IEvent } from "./../event/IEvent";
export interface IBaseComConfig {
    UniId?: string;
}
export interface IFunDic {
    [name: string]: Function;
}
export declare class BaseCom implements ICom {
    $store: any;
    _VueObj: any;
    UniId: string;
    private fIsShow;
    protected AppEventFunDic: IFunDic;
    private fLoacalEventBus;
    constructor(config?: IBaseComConfig);
    protected bindMethod(): void;
    forceUpdate(): void;
    getEvent(): IEvent;
    private toogleShow();
    renderString(): string;
    getConstructName(): any;
    protected setRx(pro: string, obj?: any): void;
    getVueObj(): any;
    renderCom(): string;
    private comEventList;
    listenComEvent(name: string, fun: Function): void;
    protected emitComEvent(name: string, ...arg: any[]): void;
    clearVueEvent(): void;
    protected listenAppEvent(name: string, uniId: string, fun: Function): void;
    protected emitAppEvent(name: string, sign: string, ...args: any[]): void;
    protected pRegisterModule(module: any): void;
    protected pUnRegisterModule(): void;
    protected pDispose(): void;
    dispose(): void;
    /**
     * 获取当前页面的模块
     *
     * @returns
     * @memberof BaseCom
     */
    getModuleState(): any;
    /**
     * 获取计算属性
     *
     * @param {string} name
     * @returns
     * @memberof BaseCom
     */
    getGetters(name: string): any;
    /**
     * 提交数据
     *
     * @param {string} name
     * @param {*} obj
     * @memberof BaseCom
     */
    commit(name: string, obj: any): void;
    /**
     * 分发数据
     *
     * @param {string} name
     * @param {*} obj
     * @memberof BaseCom
     */
    dispatch(name: string, obj: any): void;
    xxx: string;
}
