import { IEvent } from "./../event/IEvent";

export interface ICom 
{
    _VueObj : any ;
    UniId :string ;
    $store:any ;
    forceUpdate();
    getEvent():IEvent;
    dispose();
    getModuleState():any ;
    getGetters(name:string):any ;
    commit(name:string,obj:any);
    dispatch(name:string,obj:any);
}