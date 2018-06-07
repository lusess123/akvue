import { BasePage } from "ak-lib-web/basepage";
import { IEventInfo } from "ak-lib-sys/event/ievent";
import * as table from "ak-lib-comp/iview/table";
export declare class EventBusPage extends BasePage {
    Title: string;
    EventInfo: IEventInfo[];
    TableObj: table.TableCom;
    protected loadPage(): void;
}
export declare const eventShowComFactory: (data: IEventInfo[], uniid: string, title?: string) => table.TableCom;
