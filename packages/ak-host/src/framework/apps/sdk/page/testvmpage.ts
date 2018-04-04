

import { core, ioc, vue, util } from "ak-lib-sys";
import { BasePage } from "ak-lib-web/basepage";

import eventBus, { fetchEvent } from "ak-lib-sys/event";

import { IEvent ,IEventInfo } from "ak-lib-sys/event/IEvent";

import  * as table from "ak-lib-comp/iview/table"
import { eventShowComFactory } from "./eventbuspage"

class TestVmBasePage extends BasePage {
    public pageMethod1(d: Date) {
        alert("父类  TestVmBasePage.pageMethod1" + d.toString());
    }
}



@vue.com(`<div>

<h1>{{vm.Title}}</h1>
<h2>{{new Date()}}</h2>
<Button @click='vm.pageMethod1(new Date())'>com调用vm的函数</Button>
${vue.vm("TableObj")}
<pre>
<code>{{vm.getThisStr()}}</code>
</pre>
</div>`,{
    mounted(){
        this.vm.setTableObj()
    }
})
@ioc.PlugIn({ RegName: "testvmPage", BaseType: "IPage", CreateDate: "2018-03-02", Doc: "testvm页面插件" })
export class testvmPage extends TestVmBasePage {

    public Title: string = "testvm";
    public  TableObj : table.TableCom = null;

    public setTableObj(){
      this.TableObj =  eventShowComFactory(
            this.getEvent().showAllEvent(),
            this.UniId,
            "<p>消息总线</p>"
        );
    }

    protected loadPage() {
          this.setTableObj();
    }

    public pageMethod1(d: Date) {
        //  alert(d);
        super.pageMethod1(d);
        alert("子类   testvmPage.pageMethod1" + d.toString());
        this.callUpdate();
    }

    public callUpdate() {
        const _this: any = this;
       // window["xxx"] =eventBus.GetAppEvent();
       // alert("更新组件");
       //  this.forceUpdate();
         // const _ff =  this.getEvent().showAllEvent();
           // core.alert(_ff);
       // core.alert(this.renderString());
    }

    public getThisStr(): string {
        const _vm: any = this;
        const _obj = { ...{}, ..._vm, ...{ $store: null }, ...{ fLoacalEventBus: null } };
        return "";
       // return util2.inspect(_obj);
        //return getPropertyNames(_obj);
    }
}




