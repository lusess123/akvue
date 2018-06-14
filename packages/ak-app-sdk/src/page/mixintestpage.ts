

import { core, ioc, vue, util } from "ak-lib-sys/src";
import { BasePage } from "ak-lib-web/src/basepage";

import  {BaseCom}  from "ak-lib-sys/src/com/basecom" 
import  BaseComVue from "ak-lib-sys/src/vuemixin/basecom.vue"


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
