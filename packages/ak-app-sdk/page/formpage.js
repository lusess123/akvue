var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { core, ioc, vue } from "ak-lib-sys";
import { BasePage } from "ak-lib-web/basepage";
import lvForm from "ak-lib-comp/complex/form.vue";
import reactvue from "ak-lib-react/reactvmmixin";
import jsonForm from "react-jsonschema-form";
//import JsonEditor from 'vue-json-edit'
//Vue.use(JsonEditor)
let FormPage = class FormPage extends BasePage {
    constructor(a) {
        super(a);
        this.Title = "Form";
        this.DataRowJson = null;
        this.OptionJson = null;
        this.FormReact = jsonForm;
        this.FormPros = {
            // return {
            schema: {
                title: "DataRow",
                type: "object",
                //required: ["title"],
                properties: {
                //title: {type: "string", title: "Title", default: "A new task"},
                //done: {type: "boolean", title: "Done?", default: false}
                }
            },
            formData: null
            // }
        };
        this.DataRow = { text: "文本默认值", cascader: [], apps: {} };
        this.FormOpt = [
            {
                key: "text",
                title: "文本框",
                type: "text"
            }
        ];
        this.IsAction = true;
        this.actionChange.bind(this);
        //this.createOptData();
    }
    loadPage() {
        this.createOptData();
    }
    createOptData() {
        let _opts = [];
        for (const _col in ColTypeDict) {
            const col = ColTypeDict[_col];
            const _opt = {
                key: col[0],
                title: (col[1] ? col[1] : col[0]) + 1,
                type: col[0],
            };
            const _opt2 = Object.assign({}, _opt, col[2]);
            this.FormPros.schema.properties[_opt2.key] = {
                type: "string",
                title: _opt2.title
            };
            _opts.push(_opt2);
        }
        // core.alert(_opts);
        this.FormOpt = [..._opts];
        this.OptionJson = core.json(this.FormOpt, null, 2);
        this.FormPros.formData = this.DataRow;
    }
    actionChange() {
        core.alert(this.IsAction);
    }
};
FormPage = __decorate([
    vue.com(`<div>
<Row>
<Col span="13">
<Card style="height:700px;overflow-y: auto;">
<h2 slot="title">动态表单demo</h2>
<lvForm :value="vm.DataRow"  :options="vm.FormOpt"  :action="vm.IsAction" ></lvForm>
</Card>
</Col>
<Col span="11" style="height:900px;overflow-y: auto;">
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
            lvForm, reactvue
        },
        created() {
            this.$watch(function () {
                return core.json(this.vm.DataRow, null, 2);
            }, function (a, b) {
                // alert(b  + " 变成了 " + a);
                this.vm.DataRowJson = a;
            });
        }
    }),
    ioc.PlugIn({ RegName: "FormPage", BaseType: "IPage", CreateDate: "2018-02-22", Doc: "Form页面插件" }),
    __metadata("design:paramtypes", [Object])
], FormPage);
export { FormPage };
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
};
