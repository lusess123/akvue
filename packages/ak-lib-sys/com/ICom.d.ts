import { IEvent } from "./../event/IEvent";
export interface ICom {
    _VueObj: any;
    UniId: string;
    $store: any;
    forceUpdate(): any;
    getEvent(): IEvent;
    dispose(): any;
    getModuleState(): any;
    getGetters(name: string): any;
    commit(name: string, obj: any): any;
    dispatch(name: string, obj: any): any;
}
