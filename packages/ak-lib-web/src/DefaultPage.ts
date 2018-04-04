import { BasePage } from "./basepage";
import Vue from "vue";
import { core, ioc, vue, util } from "ak-lib-sys";
//import * as codePage from "./sdk/CodePage"; codePage;
import { IApp } from "./app/IApp";
import { Ioc } from "ak-lib-sys/Ioc";
//import { IAPP } from "../../mock/management/app";
//import { fail } from "assert";



debugger;
@ioc.PlugIn({ BaseType: "IPage", RegName: "defaultpage" })

@vue.com(`
<div>
   <Card>
   <h1 v-if="vm.getPageName() != 'defaultpage'"><Icon type="sad-outline"></Icon> 找不到名称为：  <b>{{vm.PageName}}</b>  的页面</h1>
   
   <Card v-if="!vm.IsNoAppList">
   <p  slot=“title”><h2>项目应用 列表：</h2></p>
   <Row  :gutter="16">
   <Col span="6" v-for=" app in vm.appList()" :key="app.Name">
            <Card style="text-align:center" >
                <router-link  :to="{path:'/nweb/appdetailpagepage/'+app.Name}" ><Icon :type="app.Icon" size="100"></Icon></router-link >
                <p>{{app.Title}}</p>
               
            </Card>
        </Col>
   </Row>

   </Card>
   <Card>
   <h1 slot="title">以下是所有的插件：</h1>
   <Table   size="large" stripe  :columns="vm.Columns" :data="vm.pageList()"></Table>
  </Card>
  </Card>
</div>
`)
export class DefultPage extends BasePage {
  //_VueObj : any  = _vue;
  Title: string = "系统默认页面";
  OrgName: string;
  IsNoAppList : boolean = false ;
  Columns = [

    {
      title: "接口/契约", key: "BaseType"
    },
    { title: "插件注册名称", key: "RegName" },
    { title: "作者", key: "Author" },
    { title: "创建时间", key: "CreatDate" },
    { title: "注释", key: "Message" },
    {
      title: "操作", key: "opt",

      render: (h, params) => {
        const _regName = params.row["RegName"].toLowerCase();
        const _base = params.row["BaseType"];

        const _vm = this.getPagePath(_base, _regName);
        return vue.tpl(h)(`
              <div>
               <router-link :to="{path:vm.Path}"  ><Button  v-if='vm.Path != "" '>{{vm.Text}}</Button></router-link>
              </div>
         `,
          {
            Val: _base,
            RegName: _regName,
            Path: _vm.Path,
            Text: _vm.Text
            // IsPage:  params.row[params.column.key] == "IPage"
          });
      }


    },
  ];

  pagesInfo() {

    const _mo = ioc.Ioc.Current().IocModel();
    return core.json(_mo);
  }

  private fPlugList: ioc.IClassMeta[];

  pageList():ioc.IClassMeta[] {
    if (!this.fPlugList) {
      const _mo = ioc.Ioc.Current().IocModel();
      // core.log(_mo,{info:"插件信息 ： ",sign:"app"});
      let _res = [];
      for (const n in _mo) {
        _res.push(_mo[n]);
      }
      _res = _res.sort(util.sortBy("BaseType", 1))
      this.fPlugList = _res;
    }
    return this.fPlugList;

  }

  appList():IApp[] {
     if(!this.fPlugList){
       this.pageList();
     }
     const _res:  ioc.IClassMeta[] = this.fPlugList.filter(a=>a.BaseType == "IApp");
     const _apps = _res.map(info=>{
            
        return ioc.Ioc.Current().FetchInstance<IApp>(info.RegName,"IApp")  ;

     })
    // core.alert(_apps);
     return _apps ;
  }

  getPageName() {
    // alert(this.PageName);
    return this.PageName ? this.PageName.toLowerCase() : "defaultpage";
  }

  getPagePath(name: string, regName: string) {
    switch (name) {
      case "IPage":
        return { Path: "/web/" + regName, Text: "页面跳转" };
      case "ISource":
        return { Path: "/web/listpage/" + regName, Text: "业务模块搜索" };
        case "vue":
        return { Path: "/web/vue/" + regName, Text: "vue无参数组件" };
      default:
        break;
    }
    return { Path: "", Text: "" };
  }


}


