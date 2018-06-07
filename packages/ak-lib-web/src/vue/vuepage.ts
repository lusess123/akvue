import { core, ioc, vue, util } from "ak-lib-sys";
import { BasePage } from "./../basepage";
import Vue from "vue";

@vue.com(`<div>
               <div  v-if="vm.VueName" :is="vm.VueName"></div>
               <div v-else>
               <Spin size="large"></Spin>
               找不到注册名为{{vm.P1}}的vue组件
               <Spin size="large"></Spin>
               </div>
               </div>`)
@ioc.PlugIn({ RegName: "vue", BaseType: "IPage", CreateDate: "2018-02-05", Doc: "Vue页面插件" })
export class VuePage extends BasePage {

    public Title: string = "Vue";
    public VueName: string = "";
    protected loadPage() {
        const _vueName = this.P1;
        if (_vueName) {
            // debugger;
            const _vueObj = ioc.getType("vue", _vueName);
            if (_vueObj) {
                this.VueName = vue.getTempVueName(_vueObj, _vueName);
                // alert(this.VueName);
                Vue.component(this.VueName, _vueObj);
            }
            //this.forceUpdate();
        }
    }

}
