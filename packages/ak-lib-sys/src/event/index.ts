import  * as vueEvent from "./VueEvent";
import { IEvent } from "./IEvent";


 class App {
    private static fAppEvent: IEvent = null;
    private static fUniId: number = 0;

    public static getUniId():number
    {
        this.fUniId++;
        return this.fUniId;
    }

    public static initAppEvent(event: IEvent) {
        this.fAppEvent = event;
    }

    public static GetAppEvent(): IEvent {
        if (!this.fAppEvent) {
            this.fAppEvent = new vueEvent.EventBus().HookEvent;
        }
        return this.fAppEvent;
    }
}

export const fetchEvent = function () {
      return  new vueEvent.EventBus().VmEvent ;
}

export default App ;