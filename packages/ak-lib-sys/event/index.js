import * as vueEvent from "./VueEvent";
var App = /** @class */ (function () {
    function App() {
    }
    App.getUniId = function () {
        this.fUniId++;
        return this.fUniId;
    };
    App.initAppEvent = function (event) {
        this.fAppEvent = event;
    };
    App.GetAppEvent = function () {
        if (!this.fAppEvent) {
            this.fAppEvent = new vueEvent.EventBus().HookEvent;
        }
        return this.fAppEvent;
    };
    App.fAppEvent = null;
    App.fUniId = 0;
    return App;
}());
export var fetchEvent = function () {
    return new vueEvent.EventBus().VmEvent;
};
export default App;
