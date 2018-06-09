import {core, ioc, vue, util} from "ak-lib-sys";
import {BasePage} from "ak-lib-web/basepage";

import {IApp} from "ak-lib-web/app/iapp";
import {Ioc} from "ak-lib-sys/ioc";
import event from "ak-lib-sys/event";
import getapps from "ak-lib-web/app/appget";

@vue.com(`<div>
123uuuu

<Row  :gutter="16">
<Col span="4"  v-for=" (app,n) in vm.appList()" :key="app.Name" style="padding:1rem">

         <Card style="text-align:center" >
             <a @click="vm.goMenu(app.Name)"><Icon :type="app.Icon" size="100"></Icon></a >
             <p>{{app.Title}}</p>
         </Card>
     </Col>
</Row>



</div>`)
@ioc.PlugIn({RegName: "AllAppPage", BaseType: "IPage", CreateDate: "2018-06-05", Doc: "AllApp页面插件"})
export class AllAppPage extends BasePage {

    public Title : string = "所有的应用";

    private fAppList : IApp[];
    protected loadPage() {}

    goMenu(name:string){
        const _app =  this.fAppList.find(a=>a.Name == name);
        if(_app){
            const _menus =  _app.getMenus();
           const _url = this.getFirstUrl(_menus);
           if(_url){
             event.GetAppEvent().emit("global-main-mounted", _menus, _url);
           }

        }
    }

    getFirstUrl(menus) {
        if (menus && menus.length > 0) {
            const _a = menus[0];
            if (_a.children && _a.children.length > 0) {
                return this.getFirstUrl(_a.children);
            }
            else {
                return _a.name;
            }
        }
        return "";
    }

    appList() : IApp[] {
        if (!this.fAppList) {
          
            this.fAppList = getapps();
        }
        return this.fAppList;

    }

}
