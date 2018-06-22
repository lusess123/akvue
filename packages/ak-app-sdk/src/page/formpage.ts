import { registAndGetVueComName } from './../../../ak-lib-sys/src/vue';

import Vue from "vue"
import { core, ioc, vue, util } from "ak-lib-sys/src";
import { BasePage } from "ak-lib-web/src/basepage";

import lvForm  from "ak-lib-comp/src/complex/form.vue";
import * as lv  from "ak-lib-comp/src/complex/form.vue";
import reactvue from "ak-lib-react/reactvmmixin";
import jsonForm from "react-jsonschema-form";

import itemform from 'ak-lib-comp/src/complex/itemfrom.vue'
  (lv  as any ).registComponent("itemform",itemform);




//import JsonEditor from 'vue-json-edit'
//Vue.use(JsonEditor)
@vue.com(`<div>
<Row>
<Col span="23">
<Card style="height:700px;overflow-y: auto;">
<h2 slot="title">动态表单demo</h2>
<lvForm :value="vm.DataRow"  :options="vm.FormOpt"  :action="vm.IsAction" ></lvForm>
</Card>
</Col>
<Col span="1" style="height:900px;overflow-y: auto;">
<h2>
数据
<Card>
<h2 slot="title">参数设置</h2>
<div>
   是否有按钮： <i-switch v-model="vm.IsAction" ></i-switch>
</div>
</Card>
<Card >
   <reactvue   :Vm="vm.FormPros"   :ReactType="vm.FormReact"   />
</Card>

</h2>
</Col>

</Row>
  

</div>`, {

        components: {
            lvForm,reactvue
        },
        created() {
            this.$watch(function () {
                return core.json(this.vm.DataRow, null, 2)
            }, function (a, b) {
                // alert(b  + " 变成了 " + a);
                this.vm.DataRowJson = a;
            });
        }

    })
@ioc.PlugIn({ RegName: "FormPage", BaseType: "IPage", CreateDate: "2018-02-22", Doc: "Form页面插件" })
export class FormPage extends BasePage {

    public Title: string = "Form";
    public DataRowJson: string = null;
    public OptionJson: string = null;
    public FormReact:any = jsonForm ;
    public  FormPros= {
       // return {
            schema:{
                title: "DataRow",
                type: "object",
                //required: ["title"],
                properties: {
                  //title: {type: "string", title: "Title", default: "A new task"},
                  //done: {type: "boolean", title: "Done?", default: false}
                }
              },
              formData:null
       // }
    }

    public constructor(a: any) {
        super(a);
        this.actionChange.bind(this);
        //this.createOptData();
    }

    protected loadPage() {
        this.createOptData();
    }

    private createOptData() {
        let _opts: Ioption[] = [];
        for (const _col in ColTypeDict) {
            const col = ColTypeDict[_col];
            const _opt = {
                key: col[0],
                title: (col[1] ? col[1] : col[0]) + 1,
                type: col[0],
                //default:col[2]?col[2]: undefined
            };
            const _opt2 = { ..._opt, ...col[2] }

            this.FormPros.schema.properties[_opt2.key] = {
                type :"string",
                title:_opt2.title
            }

            _opts.push(_opt2);
        }
        // core.alert(_opts);
        this.FormOpt = [..._opts];
        this.OptionJson = core.json(this.FormOpt, null, 2);
        this.FormPros.formData = this.DataRow;
    }


    public DataRow: any = { text: "文本默认值", cascader: [], apps: {} };
    public FormOpt: Ioption[] = [
        {
            key: "text",
            title: "文本框",
            type: "text"
        }
    ];

    public IsAction: boolean = true;

    actionChange() {
        core.alert(this.IsAction);
    }


}


const ColTypeDict = {
    Text: ["text", "文本框"],
    select: ["select", ""],
    mutiselect: ["mutiselect", ""],
    datetime: ["datetime", ""],
    checkbox: ["checkbox", ""],
    radio: ["radio", ""],
    number: ["number", ""],
    textarea: ["textarea", ""],
    select2: ["select2", ""],
    date: ["date", ""],
    markdown: ["markdown", ""],
    cascader: ["cascader", ""],
    apps: ["apps", ""],
    switch: ["switch", "", {
        trueOpt: {},
        falseOpt: {}
    }],
    "switch-tag": ["switch-tag", ""],
    user: ["user", ""],
    users: ["users", ""],
    devices: ["devices", ""],
    label: ["label", ""],
    TableData: ["TableData", ""],
    itemform :["itemform","嵌套模版"]

}

interface ILvForm {
    roles?: IDict<IRule>;
    value?: any;
    options?: Ioption[];
    action?: boolean;
    loading?: boolean;
}

interface IDict<T> {
    [index: string]: T;
}

interface IRule {
    message?: string;
    pattern?: string;
    required?: boolean;

}

export interface Ioption {
    default?: any;
    key: string;
    type: string;
    title: string;
    tooltip?: string;
    selectList?: ISelect[];
    radioList?: ISelect[];
    Options?: any;
}
export interface ISelect {
    label: string;
    value: string;
}
