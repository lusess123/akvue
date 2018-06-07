import * as rxjs from "rxjs";
import Vue from "vue";
export class EventBus {
    constructor() {
        this.fEmit = null;
        this.ReactEvent = new BaseEvent(this, "React");
        this.VmEvent = new BaseEvent(this, "Vm");
        this.HookEvent = new BaseEvent(this, "Hook");
        this.CustomEvent = new BaseEvent(this, "Custom");
    }
    FetchEmit() {
        // rxjs.
        if (!this.fEmit) {
            this.fEmit = new Vue();
            //this.fEmit.setMaxListeners(0);
            // this.fEmit.
        }
        return this.fEmit;
    }
    showAllEvent() {
        var _res = [];
        var _emit = this.fEmit;
        if (_emit && _emit._events) {
            const _events = _emit._events;
            for (var n in _emit._events) {
                const _funList = _emit._events[n];
                //if(_funList){
                const _stringList = _funList ? _funList.map((f) => {
                    return f ? f.toString() : "";
                }).join("|") : "";
                // }
                _res.push({
                    EventName: n,
                    FunLength: _funList ? _funList.length : 0,
                    EventObj: {},
                    FunCodeList: _stringList
                });
            }
            return _res;
        }
        return _res;
    }
    RemoveReactEvent() {
    }
}
export class BaseEvent {
    constructor(eventBus, name) {
        this.fEventBus = eventBus;
        this.fName = name;
    }
    createName(name) {
        if (name) {
            return this.fName + "_" + name;
        }
        else
            return name;
    }
    showAllEvent() {
        return this.fEventBus.showAllEvent();
    }
    removeAllBusListeners() {
        this.fEventBus.FetchEmit().$off();
    }
    getSubjectByName(name) {
        let event = this.createName(name);
        if (!this.fSubject) {
            this.fSubject = new rxjs.Subject();
        }
        return this.fSubject.filter(a => { return a.Name == event; });
    }
    emit(event, ...args) {
        event = this.createName(event);
        console.log("事件调用： " + event);
        console.log(args);
        if (this.fSubject) {
            // this.fSubject = new rxjs.Subject<ISubiectOb>();
            this.fSubject.next({ Name: event, ArgList: args });
        }
        this.fEventBus.FetchEmit().$emit(event, ...args);
        return true;
    }
    ;
    removeAllListeners(event) {
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
    }
    ;
    //removeAllListeners(events: string[]): IEvent {
    //    return null;
    //};
    listeners(event) {
        event = this.createName(event);
        // return this.fEventBus.FetchEmit().
        alert("该接口未实现");
        return [];
    }
    ;
    removeListener(event, listener) {
        event = this.createName(event);
        var gg = listener;
        //var f: (eventObject: JQueryEventObject) => any = gg;
        this.fEventBus.FetchEmit().$off(event, gg);
        return this;
    }
    ;
    addListener(event, listener) {
        console.log("时间注册： " + event);
        event = this.createName(event);
        // var gg: any = listener;
        // var f:any = (eventObject: any, ...args: any[]) => {
        //     listener(...args);
        // };
        this.fEventBus.FetchEmit().$on(event, listener);
        return listener;
    }
    off(event, listener) {
        return this.removeListener(event, listener);
    }
    ;
    on(event, listener) {
        return this.addListener(event, listener);
    }
}
