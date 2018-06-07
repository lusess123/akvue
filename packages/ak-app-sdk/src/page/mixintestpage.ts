

import { core, ioc, vue, util } from "ak-lib-sys";
import { BasePage } from "ak-lib-web/basepage";

import  {BaseCom}  from "ak-lib-sys/com/basecom" 
import  BaseComVue from "ak-lib-sys/vuemixin/basecom.vue"


@vue.com(`<div>  
          <h1>mixintestPage</h1>
          <Card>
             <BaseComVue v-if="vm.BaseComObj" :vm="vm.BaseComObj"></BaseComVue>
          </Card>
          
          </div>`,{
    
            components:{
        BaseComVue
     }
})


@ioc.PlugIn({ RegName: "mixintestPage", BaseType: "IPage", CreateDate: "2018-02-27", Doc: "mixintest页面插件" })
export class mixintestPage extends BasePage {

    public Title: string = "mixintest";
    public BaseComObj : BaseCom = null; 

    protected loadPage() {
        //alert();
         this.BaseComObj = new BaseCom({
                  UniId:this.UniId
         });
    }

}
