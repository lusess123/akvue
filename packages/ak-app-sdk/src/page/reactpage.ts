

import { core, ioc, vue, util } from "ak-lib-sys";
import { BasePage } from "ak-lib-web/basepage";
import {renderTest} from "ak-lib-react/testdom";


@vue.com(`<div>ReactPage</div>`,{
 
    mounted () {
       // alert("ddddd123");
       renderTest(this.$el,{compiler:"tsc",framework:"react"});
    }

})
@ioc.PlugIn({ RegName: "ReactPage", BaseType: "IPage", CreateDate: "2018-04-05", Doc: "React页面插件" })
export class ReactPage extends BasePage {

    public Title: string = "React";
    protected loadPage() {

    }

}
