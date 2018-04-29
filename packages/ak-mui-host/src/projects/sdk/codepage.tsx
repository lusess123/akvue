import {BasePage, BaseDom} from './../dockcloud/mobx/base'
import * as ioc from 'ak-lib-sys/Ioc'
import React from 'react'

  
  
  
 

export class CodePageReact extends BaseDom < CodePage > {
    pRender() {
        return <div>123</div>
    }
}

@ioc.PlugIn({RegName: "CodePage", BaseType: "BasePage"})
export class CodePage extends BasePage {
    ReactType = CodePageReact;

    loadData(){
        // const schema = makeSchema(Query, {
        //     types: [Size, Box]
        //   });
        //  console.log(schema);
    }

}
