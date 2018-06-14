import { core, ioc, vue, util } from "ak-lib-sys/src";
import { BasePage } from "ak-lib-web/src/basepage";
import Vue from "vue";



interface Idd {
    
    ddd :string ;
}

@vue.com(`<div>
<Card>
<h3  slot="title">
Tpl1{{vm.fff()}}|
{{getcc}}
</h3>
${vue.vm("Tpl1")}
${vue.vm("Tpl2")}
${vue.vm("Tpl3")}
view1:
<View1 :vm="{Title:'aaa',DemoName:'bbb'}" Pro="terterter123"></View1>
<View2 :vm="{Title:'aaa',DemoName:'bbb'}" Pro="vbvbvb"></View2>
<View2 :vm="vm.cc" Pro="vbvbvb"></View2>
<View2 :vm="vm.gg()" Pro="cc"></View2>
</Card>
</div>`,{
    data(){
        return {
            vf: new View("aaa","bbb")
        }
    }
})
@ioc.PlugIn({ RegName: "DymicPage", BaseType: "IPage", CreateDate: "2018-02-06", Doc: "Dymic页面插件" })
export class DymicPage extends BasePage {

    public Title: string = "Dymic";
    public Tpl1 = vue.cvue({ a: 123456 })("<a >{{vm.a}}</a>");
    public Tpl2 = Tpl_1({ Name: "dd", fun: () => { alert(123); core.alert(this.Title); } });
    public Tpl3 :any= vue.cvue({ a: 123456, b: this })("<a >{{vm.a}}{{vm.b.Title}}</a>");

    protected loadPage() {
       this. cc = new View("1","2");
       const fff = this.ggg  `123`;
       console.log(fff);
       core.alert(fff);
    }

    ggg(placeholders: any){
        return placeholders ;
    }

    fff(){
        return new Date().toString();
    }
    gg():any{
        return new View("1","2");
    }
   cc = undefined  ;
    
   @vue.compute()
    get getcc(){
        return this.cc.Title;
    }

}

import view1  from "./view/demoView.vue";

Vue.component ("View1",view1);

import view2  from "./view/demoView2.vue";

Vue.component ("View2",view2);


const Tpl_1 = (vm) => {

    return vue.cvue(vm)(`
          <Button @click.prevent="vm.fun.call(vm)">{{vm.Name}}</Button>
    `);;
}
let res;
let _params: any[] = [];
const fun1 = (a: string) => {
    _params.push(a);
    // const _fun = _params.push.bind(_params);
    return fun1;
}

fun1("a")("b")("c");
if (_params.length == 1) {
    res = "a";
}
if (_params.length == 2) {
    res = "a" + "b";
}


class View {
    change (){
        this.Title = new Date().toString()+"title";
    }
   constructor(
       public Title : string ,
       public DemoName :string 
   ){

   }

}

//core.alert(res);

