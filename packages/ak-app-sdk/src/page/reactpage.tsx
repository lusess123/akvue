

import { core, ioc, vue, util } from "ak-lib-sys";
import { BasePage } from "ak-lib-web/basepage";
import { renderTest } from "ak-lib-react/testdom";
import React, { Component } from "react";
import { render } from "react-dom";

import Form from "react-jsonschema-form";

const schema = {
  "title": "一个注册表单",
  "type": "object",
  "required": [
    "firstName",
    "lastName"
  ],
  "properties": {
    "password": {
      "type": "string",
      "title": "密码"
    },
    "lastName": {
      "type": "string",
      "title": "名字"
    },
    "bio": {
      "type": "string",
      "title": "性别"
    },
    "firstName": {
      "type": "string",
      "title": "姓"
    },
    "age": {
      "type": "integer",
      "title": "年龄"
    }
  }
}

const log = (type) => console.log.bind(console, type);

function getElementsByClass(oParent, target) {

       var aEle = oParent.getElementsByTagName('*');
       var aResult = [];
       var reg = new RegExp('\\b' + target + '\\b', 'i');
       var i = 0;

       for(i = 0; i < aEle.length; i++) {
              if(reg.test(aEle[i].className)) {
                  aResult.push(aEle[i]);
              }
       }

       return aResult;
}


@vue.com(`<div><Card><div class="act-react" style="padding:auto;margin:auto;"></div></Card></div>`, {

  mounted() {
    // alert("ddddd123"); 
    //renderTest(this.$el,{compiler:"tsc",framework:"react"});

    const _dom = getElementsByClass(this.$el,"act-react");

    render((
      <Form schema={schema}
        onChange={log("changed")}
        onSubmit={log("submitted")}
        onError={log("errors")} />
    ), _dom[0]);
  }

})
@ioc.PlugIn({ RegName: "ReactPage", BaseType: "IPage", CreateDate: "2018-04-05", Doc: "React页面插件" })
export class ReactPage extends BasePage {

  public Title: string = "React";
  protected loadPage() {

  }

}





