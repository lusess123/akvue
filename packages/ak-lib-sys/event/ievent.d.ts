export interface IEvent {
    emit(event: string, ...args: any[]): boolean;
    removeAllListeners(event?: string): IEvent;
    listeners(event: string): Function[];
    removeListener(event: string, listener: Function): IEvent;
    addListener(event: string, listener: Function): Function;
    showAllEvent(): IEventInfo[];
    removeAllBusListeners(): void;
    on(event: string, listener: Function): Function;
    off(event: string, listener: Function): IEvent;
    getSubjectByName(name: string): any;
}
export interface IEventInfo {
    EventName: string;
    FunLength: number;
    EventObj: any;
    FunCodeList?: string;
}
export interface ISubiectOb {
    Name: string;
    ArgList: any[];
}
