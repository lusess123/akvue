

import { core, ioc, vue, util } from "ak-lib-sys/src";
import { BasePage } from "ak-lib-web/src/basepage";

//import {Container} from "typedi";


@vue.com(`<div>DiPage{{vm.IsPage}}</div>`)
@ioc.PlugIn({ RegName: "DiPage", BaseType: "IPage", CreateDate: "2018-02-04",  Doc: "Di页面插件" })
export class DiPage extends BasePage {

    public Title: string = "Di";
    IsPage  = "";
    protected loadPage() {
        
       // core
       // let someClass1 = Container.get(SomeClass);
       // someClass1.someMethod();
       // let someClass2 = Container.get(SomeClass);
      // this.IsPage = someClass1 === someClass2 ? "同一个":"不同个"
    }

}


class SomeClass {

    someMethod() {
       // alert(123);
    }

}


//someClass.someMethod();