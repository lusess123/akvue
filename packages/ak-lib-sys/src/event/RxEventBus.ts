import * as rxjs from "rxjs";
import { IEvent, IEventInfo, ISubiectOb } from "./IEvent";
import Vue from "vue";



export class BaseEvent implements IEvent {
    emit(event: string, ...args: any[]): boolean{
        return true ;
    }
    removeAllListeners(event?: string): IEvent{
        return null;
    }
    listeners(event: string): Function[]{
        return null;
    }
    removeListener(event: string, listener: Function): IEvent{
        return null;
    }
    addListener(event: string, listener: Function): Function{
        return null;
    }
    showAllEvent(): IEventInfo[]{
        return null;
    }
    removeAllBusListeners(): void{

    }
    on(event: string, listener: Function): Function{
        return null;
    }
    off(event: string, listener: Function): IEvent{
        return null;
    }
    getSubjectByName(name: string): any{
        return null;
    }
}