

import {  ioc, vue} from "ak-lib-sys/src";

import { IPageView, IDataButton } from "./../contract/pageview";
import { SearchForm } from "./searchform";
import { ListForm } from "./listform";

import { BizPage } from "../bizpage";
//import JsonEditor from 'vue-json-edit'
import event from "ak-lib-sys/src/event";
//Vue.use(JsonEditor)

@vue.com(`
<Card >

<p slot="title">
    <i class="fa fa-table"></i>
   {{vm.PageTitle + "  列表"}}
</p>
${vue.vm("SearchFormObj")}
<br/>
<Card >

<div v-if="vm.IsLoad" >
<div class="row" style="padding-bottom:1rem;text-align:right"><Button-group size="small"     shape="circle"  slot="extra"   >
    <i-button  type="primary"  icon="refresh" @click.prevent="vm.refreshBtnClick" >刷新</i-button>
    <template v-for="item  in vm.PageButtons">
    <i-button   type="primary"     :key="item.Name"  @click.prevent="vm.pageButtonClick(item)">{{item.Text}}</i-button>
    </template>
</Button-group></div>
<br/>
${vue.vm("ListFormObj")}
</div>
 </Card>
 <Card   v-if="vm.IsLoad">

 </Card>
</Card>
`)
@ioc.PlugIn({ RegName: "ListPage", BaseType: "IPage", CreateDate: "2018-02-03", Doc: "List页面插件" })
export class ListPage extends BizPage {

    public Title: string = "List";
    private IsLoad: boolean = false;

    public PageStyle :string = "list";

    public SearchFormObj: SearchForm = null;
    public ListFormObj: ListForm = null;
    //ddd = "ddddd";


    protected loadPage() {

        super.loadPage();
        // debugger ;
        // alert("after load");
        this.listenAppEvent("data-btn", this.UniId, (data) => {
            // core.alert(dataRow);
            const _key = this.getModuleState().getDataRowKey;
            // core.alert(data.Row[_key]);
            this.getModuleState().command(data.Name, [data.Row[_key]]);
            // this.ListFormObj.Text = new Date().toString();
            this.SearchFormObj.Text = new Date().toString();
        })
        //window["ss"] = this.Source ;
        this.Source.asyncLoadData().then(a => {
            // alert("载入module");
            this.loadModule();
            this.SearchFormObj = new SearchForm({ UniId: this.UniId });
            // this.setRx("SearchFormObj",this.SearchFormObj );
            this.ListFormObj = new ListForm({ UniId: this.UniId });
            //Vue.set(this,"ListFormObj",new ListForm({ UniId: this.UniId }));
            // this.setRx("ListFormObj", new ListForm({ UniId: this.UniId }) );
            this.IsLoad = true;
        });
    }



    public get PageView(): IPageView {
        const _state = this.getModuleState();
        return _state ? _state.PageView : null;
    }

    public get PageTitle() {
        //if(){
            if(this.Source && this.Source.PageView)
        return this.Source.PageView.Title;
        else 
        return "";
    }

    public get PageButtons():IDataButton {
        const _pages = this.Source.PageView.PageButtons;
        // core.alert(_pages);
        return _pages;
    }

    public pageButtonClick(btn: IDataButton) {
        if (btn.Name) {
            switch (btn.Name.toLocaleLowerCase()) {
                case "insert":
                    event.GetAppEvent().emit("openurl", {
                        path: "/web/insertpage$win/" + this.P1 + "/" + this.P2,
                        nourl: true
                    });
                    break;
                default:
                    break;
            }
        }
    }


}







