var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ioc, vue } from "ak-lib-sys";
import { BasePage } from "ak-lib-web/basepage";
import eventBus from "ak-lib-sys/event";
import * as table from "ak-lib-comp/iview/table";
let EventBusPage = class EventBusPage extends BasePage {
    constructor() {
        super(...arguments);
        this.Title = "EventBusPage";
        this.EventInfo = [];
        this.TableObj = null;
    }
    loadPage() {
        this.TableObj = eventShowComFactory(eventBus.GetAppEvent().showAllEvent(), this.UniId, "<p >全局消息总线{{vm.UniId}}</p>");
        window["rrr"] = eventBus.GetAppEvent();
    }
};
EventBusPage = __decorate([
    vue.com(`
 <Card>
   ${vue.vm("TableObj")}
  </Card>
`),
    ioc.PlugIn({ RegName: "EventBusPage", BaseType: "IPage", CreateDate: "2018-03-02", Doc: "EventBusPage页面插件" })
], EventBusPage);
export { EventBusPage };
export const eventShowComFactory = (data, uniid, title) => {
    return new table.TableCom({
        UniId: uniid,
        DataTable: data,
        Columns: [
            {
                key: "FunCodeList",
                title: "代码",
                type: table.ColumnType.expand,
                render: (h, params) => {
                    return vue.tpl(h)(`<div>
                            <Card v-for=" (code,index) in vm.codes">
                            <h2 slot="title">{{index}}</h2>
                                <pre>
                                <code>{{code}}</code>
                                </pre>
                            </Card>
                            </div>`, { codes: params.row.FunCodeList.split("|") });
                }
            },
            { key: "EventName", title: "消息主题" },
            { key: "FunLength", title: "订阅数" }
            // {key:"select",title:"选择",type:table.ColumnType.selection},
        ],
        Footer: title ? {
            Tpl: title,
            VmFun: (a) => {
                return Object.assign({}, a);
            }
        } : null
    });
};
