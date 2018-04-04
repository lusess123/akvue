import { IEvent } from "./IEvent";
declare class App {
    private static fAppEvent;
    private static fUniId;
    static getUniId(): number;
    static initAppEvent(event: IEvent): void;
    static GetAppEvent(): IEvent;
}
export declare const fetchEvent: () => IEvent;
export default App;
