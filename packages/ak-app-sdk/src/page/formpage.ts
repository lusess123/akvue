
import Vue from "vue"
import { core, ioc, vue, util } from "ak-lib-sys";
import { BasePage } from "ak-lib-web/basepage";

import lvForm from "ak-lib-comp/complex/form.vue";
//import JsonEditor from 'vue-json-edit'
//Vue.use(JsonEditor)
@vue.com(`<div>
<Row>
<Col span="8">
<Card style="height:700px;overflow-y: auto;">
<h2 slot="title">动态表单demo</h2>
<lvForm :value="vm.DataRow"  :options="vm.FormOpt"  :action="vm.IsAction" ></lvForm>
</Card>
</Col>
<Col span="6" style="height:700px;overflow-y: auto;">
<h2>
数据
<Card>
<h2 slot="title">参数设置</h2>
<div>
   是否有按钮： <i-switch v-model="vm.IsAction" ></i-switch>
</div>
</Card>
<Card >
   <h2 slot="title">DataRow</h2>
  
</Card>

</h2>
</Col>
<Col span="10" style="height:700px;overflow-y: auto;">
<Card>
   <h2 slot="title">Options</h2>
   
  
</Card>
</Col>
</Row>
  

</div>`, {

        components: {
            lvForm
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
            _opts.push(_opt2);
        }
        // core.alert(_opts);
        this.FormOpt = [..._opts];
        this.OptionJson = core.json(this.FormOpt, null, 2);
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
    TableData: ["TableData", ""]

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
