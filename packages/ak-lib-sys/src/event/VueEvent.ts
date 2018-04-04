import * as rxjs from "rxjs";
import { IEvent, IEventInfo, ISubiectOb } from "./IEvent";
import Vue from "vue";



export class EventBus {
    private fEmit: any = null;
    public FetchEmit() {
        // rxjs.
        if (!this.fEmit) {
            this.fEmit = new Vue();
            //this.fEmit.setMaxListeners(0);
            // this.fEmit.
        }
        return this.fEmit;
    }

    public showAllEvent(): IEventInfo[] {
        var _res: IEventInfo[] = [];
        var _emit = this.fEmit;
        if (_emit && _emit._events) {
            const _events = _emit._events;
            for (var n in _emit._events) {

                const _funList: Function[] = _emit._events[n];
                //if(_funList){
                const _stringList = _funList? _funList.map((f) => {
                    return f.toString();
                }).join("|"):"";
               // }

                _res.push(
                    {
                        EventName: n,
                        FunLength: _funList ? _funList.length : 0,
                        EventObj: {},
                        FunCodeList:_stringList
                    });
            }

            return _res;
        }

        return _res;
    }



    public constructor() {
        this.ReactEvent = new BaseEvent(this, "React");
        this.VmEvent = new BaseEvent(this, "Vm");
        this.HookEvent = new BaseEvent(this, "Hook");
        this.CustomEvent = new BaseEvent(this, "Custom");
    }

    public ReactEvent: IEvent;
    public VmEvent: IEvent;
    public HookEvent: IEvent;
    public CustomEvent: IEvent;

    public RemoveReactEvent() {

    }
}





export class BaseEvent implements IEvent {


    private fSubject: rxjs.Subject<ISubiectOb>;

    private fEventBus: EventBus;

    public constructor(eventBus: EventBus, name: string) {
        this.fEventBus = eventBus;
        this.fName = name;
    }

    protected fName: string;

    private createName(name: string): string {
        if (name) {
            return this.fName + "_" + name;
        }
        else
            return name;
    }

    public showAllEvent(): IEventInfo[] {
        return this.fEventBus.showAllEvent();
    }
    public removeAllBusListeners() {
        this.fEventBus.FetchEmit().$off();
    }

    public getSubjectByName(name: string): any {
        let event = this.createName(name);
        if (!this.fSubject) {
            this.fSubject = new rxjs.Subject<any>();

        }
        return this.fSubject.filter(a => { return a.Name == event });
    }

    public emit(event: string, ...args: any[]): boolean {
        event = this.createName(event);
        console.log("事件调用： " + event);
        console.log(args);
        if (this.fSubject) {
            // this.fSubject = new rxjs.Subject<ISubiectOb>();
            this.fSubject.next({ Name: event, ArgList: args });
        }

        this.fEventBus.FetchEmit().$emit(event, ...args);
        return true;
    };
    public removeAllListeners(event?: string): IEvent {
        if (event) {
            event = this.createName(event);
            this.fEventBus.FetchEmit().$off(event);
            return null;

        }
        else {



            var _events = this.fEventBus.showAllEvent();
            _events.forEach((n) => {
                if (n.EventName.length > this.fName.length) {
                    if (n.EventName.substr(0, this.fName.length) == this.fName) {
                        this.fEventBus.FetchEmit().$off(n.EventName);
                    }
                }
            });
            return this;
        }
    };
    //removeAllListeners(events: string[]): IEvent {
    //    return null;
    //};
    public listeners(event: string): Function[] {
        event = this.createName(event);
        // return this.fEventBus.FetchEmit().
        alert("该接口未实现");
        return [];
    };
    public removeListener(event: string, listener: Function): IEvent {
        event = this.createName(event);
        var gg: any = listener;
        //var f: (eventObject: JQueryEventObject) => any = gg;
        this.fEventBus.FetchEmit().$off(event, gg);
        return this;
    };
    public addListener(event: string, listener: Function): Function {
        console.log("时间注册： " + event);
        event = this.createName(event);
        // var gg: any = listener;
        // var f:any = (eventObject: any, ...args: any[]) => {
        //     listener(...args);
        // };
        this.fEventBus.FetchEmit().$on(event, listener);
        return listener;
    }
    public off(event: string, listener: Function): IEvent {

        return this.removeListener(event, listener);
    };
    public on(event: string, listener: Function): Function {
        return this.addListener(event, listener);
    }
}