var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BasePage } from "ak-lib-web/basepage";
import { ioc, vue, util } from "ak-lib-sys";
let CodePage = class CodePage extends BasePage {
    constructor() {
        super(...arguments);
        this.Name = "";
        this.Code = "";
        this.CodeType = "";
        this.Title = "代码生成";
        this.MesgList = {
            List: [
                "code",
                "分成 分页，表格，按钮"
            ]
        };
    }
    loadPage() {
        this.CodeType = this.P1 ? this.P1 : "com";
        this.Name = this.P2 ? this.P2 : "XXX";
        this.change();
    }
    change() {
        this.Code = codeDict[this.CodeType.toLocaleLowerCase()](this.Name);
    }
};
CodePage = __decorate([
    ioc.PlugIn({ BaseType: "IPage", RegName: "CodePage", Doc: "代码生成页面" }),
    vue.com(`
  <Card>
     <row  slot="title"> 
     <RadioGroup v-model="vm.CodeType" size="large"  @on-change="vm.change()"  >
     <Radio label="com">
         <Icon type="social-apple"></Icon>
         <span>组件</span>
     </Radio>
     <Radio label="col">
         <Icon type="social-android"></Icon>
         <span>控件</span>
     </Radio>
     <Radio label="page">
         <Icon type="social-windows"></Icon>
         <span>页面</span>
     </Radio>
 </RadioGroup>
     <Input  v-model="vm.Name"  @on-change="vm.change()"   placeholder="Enter 名称..." ></Input>
     </row>
     <Card>
     <Input v-model="vm.Code" type="textarea" :rows="50" placeholder="Enter 代码..."></Input>
     </Card>
  </Card>
`)
], CodePage);
export { CodePage };
const _comFun = (XXX) => {
    return `
  
    import { core ,ioc,vue } from "ak-lib-sys";
    import {BaseCom,IBaseComConfig} from "ak-lib-sys/com/BaseCom";

    export interface I${XXX}ComConfig extends IBaseComConfig{
   
    }

    @ioc.PlugIn({RegName:"${XXX}Col",BaseType:"BaseCom",CreateDate:"${util.formatDate(new Date(), "yyyy-MM-dd")}",Doc:"${XXX}组件插件"})

    @vue.com(\`<div>${XXX}Com</div>\`)
    export   class ${XXX}Com extends BaseCom {

      constructor (config?: I${XXX}ComConfig){
          super(config);
      }

    }
`;
};
const _colFun = (XXX) => {
    return `
    import { core ,ioc,vue } from "ak-lib-sys";
    import {BaseCol,IBaseColConfig}  from "./BaseCol"
    
    export interface I${XXX}ColConfig extends IBaseColConfig{
       
    }
     
    @ioc.PlugIn({RegName:"${XXX}Col",BaseType:"BaseCol",Author:"zhengyukun",CreateDate:"${util.formatDate(new Date(), "yyyy-MM-dd")}",Doc:"${XXX}Col控件插件"})
    @vue.com(\`<div>${XXX}Col</div>\`)
    export   class ${XXX}Col extends BaseCol {
    
          constructor (config?: I${XXX}ColConfig){
              super(config);
          }
    
    }
`;
};
const _pageFun = (XXX) => {
    return `  
   
    import { core, ioc, vue, util } from "ak-lib-sys";
    import { BasePage } from "ak-lib-web/BasePage";

    @vue.com(\`<div>${XXX}Page</div>\`)
    @ioc.PlugIn({  RegName: "${XXX}Page", BaseType: "IPage", CreateDate:"${util.formatDate(new Date(), "yyyy-MM-dd")}", Doc: "${XXX}页面插件" })
    export class ${XXX}Page extends BasePage {
         
        public Title :string = "${XXX}";
        protected loadPage() {

        }

    }
`;
};
const codeDict = {
    com: _comFun,
    col: _colFun,
    page: _pageFun
};
