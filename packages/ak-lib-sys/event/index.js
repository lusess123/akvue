import * as vueEvent from "./vueevent";
class App {
    static getUniId() {
        this.fUniId++;
        return this.fUniId;
    }
    static initAppEvent(event) {
        this.fAppEvent = event;
    }
    static GetAppEvent() {
        if (!this.fAppEvent) {
            this.fAppEvent = new vueEvent.EventBus().HookEvent;
        }
        return this.fAppEvent;
    }
}
App.fAppEvent = null;
App.fUniId = 0;
export const fetchEvent = function () {
    return new vueEvent.EventBus().VmEvent;
};
export default App;
