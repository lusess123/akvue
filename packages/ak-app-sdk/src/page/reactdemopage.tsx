

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

  for (i = 0; i < aEle.length; i++) {
    if (reg.test(aEle[i].className)) {
      aResult.push(aEle[i]);
    }
  }

  return aResult;
}

import reactvue from "ak-lib-react/reactvuemixin";

export const testreactvue = {
  mixins: [reactvue],
  template: '<div></div>'
}


@vue.com(`<div><Card>
vue:<h2>{{vm.Title}}</h2>
react:
<testreactvue :framework="vm.framework"  :compiler="vm.Title"></testreactvue>
react:
<div class="act-react" style="padding:auto;margin:auto;"></div>
</Card></div>`, {

    components: { testreactvue },

    mounted() {
      // alert("ddddd123"); 
      //renderTest(this.$el,{compiler:"tsc",framework:"react"});

      const _dom = getElementsByClass(this.$el, "act-react");

      const _node: any = () => {
        render((
          <div>
            <h2>{this.vm.Title}</h2>
            <Form schema={schema}
              onChange={log("changed")}
              onSubmit={log("submitted")}
              onError={log("errors")} />
            <button onClick={() => { this.vm.changeTitle(); _node(); }} >修改标题</button>
          </div>
        ), _dom[0]);
      }
      _node();
      //console.log(_node);
    }

  })
@ioc.PlugIn({ RegName: "ReactDemoPage", BaseType: "IPage", CreateDate: "2018-04-05", Doc: "React页面插件" })
export class ReactDemoPage extends BasePage {

  public Title: string = "ReactPage页面标题";
  framework: string = "fff123";
  compiler: string = "tttt444";
  protected loadPage() {

  }

  changeTitle() {
    this.Title = new Date().toString();
  }
 

}








