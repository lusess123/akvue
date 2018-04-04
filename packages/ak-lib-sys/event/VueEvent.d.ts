import { IEvent, IEventInfo } from "./IEvent";
export declare class EventBus {
    private fEmit;
    FetchEmit(): any;
    showAllEvent(): IEventInfo[];
    constructor();
    ReactEvent: IEvent;
    VmEvent: IEvent;
    HookEvent: IEvent;
    CustomEvent: IEvent;
    RemoveReactEvent(): void;
}
export declare class BaseEvent implements IEvent {
    private fSubject;
    private fEventBus;
    constructor(eventBus: EventBus, name: string);
    protected fName: string;
    private createName(name);
    showAllEvent(): IEventInfo[];
    removeAllBusListeners(): void;
    getSubjectByName(name: string): any;
    emit(event: string, ...args: any[]): boolean;
    removeAllListeners(event?: string): IEvent;
    listeners(event: string): Function[];
    removeListener(event: string, listener: Function): IEvent;
    addListener(event: string, listener: Function): Function;
    off(event: string, listener: Function): IEvent;
    on(event: string, listener: Function): Function;
}
