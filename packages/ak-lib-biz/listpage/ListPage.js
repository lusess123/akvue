var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ioc, vue } from "ak-lib-sys";
import { SearchForm } from "./SearchForm";
import { ListForm } from "./ListForm";
import { BizPage } from "./../BizPage";
//import JsonEditor from 'vue-json-edit'
import event from "ak-lib-sys/event";
//Vue.use(JsonEditor)
let ListPage = class ListPage extends BizPage {
    //Vue.use(JsonEditor)
    constructor() {
        super(...arguments);
        this.Title = "List";
        this.IsLoad = false;
        this.SearchFormObj = null;
        this.ListFormObj = null;
    }
    //ddd = "ddddd";
    loadPage() {
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
        });
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
    get PageView() {
        const _state = this.getModuleState();
        return _state ? _state.PageView : null;
    }
    get PageTitle() {
        //if(){
        return this.Source.PageView.Title;
    }
    get PageButtons() {
        const _pages = this.Source.PageView.PageButtons;
        // core.alert(_pages);
        return _pages;
    }
    pageButtonClick(btn) {
        if (btn.Name) {
            switch (btn.Name.toLocaleLowerCase()) {
                case "insert":
                    event.GetAppEvent().emit("openurl", {
                        path: "/web/insertpage-win/" + this.Source.PageView.RegName,
                        nourl: true
                    });
                    break;
                default:
                    break;
            }
        }
    }
};
ListPage = __decorate([
    vue.com(`
<Card >

<p slot="title">
    <i class="fa fa-table"></i>
   {{vm.PageTitle + "  列表"}}
</p>
${vue.vm("SearchFormObj")}
<Card >
<div >
<div class="row" style="padding-bottom:1rem;text-align:right"><Button-group size="small"     shape="circle"  slot="extra"   >
    <i-button  type="primary"  icon="refresh" @click.prevent="vm.refreshBtnClick" >刷新</i-button>
    <template v-for="item  in vm.PageButtons">
    <i-button   type="primary"     :key="item.Name"  @click.prevent="vm.pageButtonClick(item)">{{item.Text}}</i-button>
    </template>
</Button-group></div>
${vue.vm("ListFormObj")}
</div>
 </Card>
 <Card   v-if="vm.IsLoad">

 </Card>
</Card>
`),
    ioc.PlugIn({ RegName: "ListPage", BaseType: "IPage", CreateDate: "2018-02-03", Doc: "List页面插件" })
], ListPage);
export { ListPage };
