

import { core, ioc, vue, util } from "ak-lib-sys/src";
import { BasePage } from "ak-lib-web/src/basepage";

import eventBus, { fetchEvent } from "ak-lib-sys/src/event";
import { IEvent ,IEventInfo } from "ak-lib-sys/src/event/ievent";

import  * as table from "ak-lib-comp/src/iview/table"

@vue.com(`
 <Card>
   ${vue.vm("TableObj")}
  </Card>
`)
@ioc.PlugIn({ RegName: "EventBusPage", BaseType: "IPage", CreateDate: "2018-03-02", Doc: "EventBusPage页面插件" })
export class EventBusPage extends BasePage {

    public Title: string = "EventBusPage";
    public EventInfo : IEventInfo[] = [] ;
    
    public  TableObj : table.TableCom = null;
    protected loadPage() {
          this.TableObj = eventShowComFactory(
              eventBus.GetAppEvent().showAllEvent(),
              this.UniId,
              "<p >全局消息总线{{vm.UniId}}</p>"
            );
            window["rrr"] =  eventBus.GetAppEvent();
         
    }

}

export const  eventShowComFactory = (data:IEventInfo[],uniid:string,title?:string)=>{
         return  new table.TableCom({
            UniId: uniid,
            DataTable:data,
            Columns:[
                {
                    key:"FunCodeList",
                    title:"代码",
                    type:table.ColumnType.expand,
                    render: (h, params) => {
                        return vue.tpl(h)(
                            `<div>
                            <Card v-for=" (code,index) in vm.codes">
                            <h2 slot="title">{{index}}</h2>
                                <pre>
                                <code>{{code}}</code>
                                </pre>
                            </Card>
                            </div>`,
                            {codes:params.row.FunCodeList.split("|")}
                        )
                    }
                },
                {key:"EventName",title:"消息主题"},
                {key:"FunLength",title:"订阅数"}
               // {key:"select",title:"选择",type:table.ColumnType.selection},
                
            ],
            Footer:title?{
             Tpl:title,
             VmFun:(a)=>{
                   return {...a};
             }
            }:null
        });
};
