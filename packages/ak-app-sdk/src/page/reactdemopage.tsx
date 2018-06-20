

import { core, ioc, vue, util } from "ak-lib-sys/src";
import { BasePage } from "ak-lib-web/src/basepage";
//import { renderTest } from "ak-lib-react/testdom";
// import React, { Component } from "react";
// import { render } from "react-dom";

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
      "type": "array",
      "title": "集合",
      items:{
        "type": "object",
        "title": "集合项",
        "properties": {
          "password": {
            "type": "string",
            "title": "字段1"
          },
          "lastName": {
            "type": "string",
            "title": "字段2"
          }
        }  
      },
      
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



//import reactvue from "ak-lib-react/reactvuemixin";
//import { Hello } from "ak-lib-react/testdom"
import reactvm from "ak-lib-react/reactvmmixin";




@vue.com(`<div><Card>
vue:<h2>{{vm.Title}}</h2>

<reactvm 
 :Vm="schema"  
  ref="reactvm"  
   :ReactType="ReactType"  />

</Card></div>`, {

    components: {reactvm },

    data: function () {
      return { 
        ReactType: Form ,
        schema:{
          schema: schema,
          onChange:log("changed"),
          onSubmit:log("changed"),
          onError:log("errors")
        }
      }
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
    //this.$refs.reactvm.$forceupdate();
  }


}








