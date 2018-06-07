import { core, ioc, vue, util } from "ak-lib-sys";
import { BasePage } from "ak-lib-web/basepage";
import { BizPage } from "../bizpage";
import NaviVue from "./navi.vue";
import * as vmform from "./vmform/vmform";
import { IColumnGroup, IColumn } from "../contract/pageview";

//import DragableTable from './../../views/tables/components/dragableTable.vue';
// import tableCol from "./../multi/TableDataCol.vue";
// import  lvForm , {registComponent } from "./../form/form.vue";


@vue.com(`<div style="max-width:200rem">
<Card>
<NaviVue :ColumnGroups="vm.NaviColumnGroups"  :GroupIndex="vm.GroupIndex"></NaviVue>

<div style="padding-top:1rem;">
          <Card     v-if="index == vm.GroupIndex"    v-for="(group,index) in  vm.NaviColumnGroups"  >
             <div style="margin:2rem" >${vue.vm("createFormVm(group)")}</div>
          </Card>
</div>
<div  style="text-align: center; padding-top:1rem;">
<Button  @click="vm.next()">下一步</Button>
</div>




</Card>
</div>`, {
        components: {
            // lvForm,
            // DragableTable,
            // tableCol
            NaviVue

        }
    })
@ioc.PlugIn({ RegName: "InsertPage", BaseType: "IPage", CreateDate: "2018-02-05", Doc: "Insert页面插件" })
export class InsertPage extends BizPage {

    public Title: string = "Insert";
    public GroupIndex = 0;
    public DataRow = {};
    public FormVMObj:vmform.VmFormCom = null
    //public vmFormObjList:vmform.VmFormCom[] = [] ;

    public PageStyle :string = "insert"; 


    protected loadPage() {
        //------------
        super.loadPage();
        this.Title = this.Source.PageView.Title + "  新增";
        this.loadModule();
        // this.vmFormObjList = new vmform.VmFormCom({
        //     UniId:this.UniId ,
        //     action:false,

        //     value:{},
        //     options:[
        //         {
        //             key:"key1",
        //             type:"text",
        //             title:"字段1"
        //         }
        //     ]
        // });
    }


    private getColumnByName(name: string) {
        return this.Store.PageView.Forms[this.Store.PageView.ListFormName].Columns.find(a => a.Name == name);

    }

    public createFormVm(group: IColumnGroup) {

        const _opts: vmform.Ioption[] = (group.Columns && group.Columns.length) ? group.Columns.map(a => {

            const _col = this.Store.PageView.Forms[this.Store.PageView.ListFormName].Columns.find(c => c.Name == a);
           
            const _res:vmform.Ioption = {
                key: a,
                type: _col.ControlType,
                title: _col.DisplayName,
                tooltip:_col.DisplayName,
            
                radioList:this.getSelectList(_col),
                selectList:this.getSelectList(_col)
            };

            return _res ;

        }) : [];
       const _rules : vmform.IDict<vmform.IRule> = {}; 
        _opts.forEach(p=>{
            _rules[p.key] = {
                   required:true ,
                   message:p.title + "不能为空"
                   
            };
        });

        const _res = new vmform.VmFormCom({
            UniId: this.UniId,
            action: false,
            value: this.DataRow,
            options: _opts,
            rules:_rules
            
        });
        this.FormVMObj = _res ;
        return _res ;

    }

    private getSelectList(col:IColumn):vmform.ISelect[]
    {
        
        const _res:vmform.ISelect[] = [];
        if(col && col.Options && col.Options.RegName){
        const _table = this.Store.PageView.CodeTables[col.Options.RegName];
        if(_table){
            for(const n in _table){
                _res.push({
                    label:_table[n],
                    value:n
                });
            }
        }
    }
        return _res ;
    }

    public get SourceString() {
        // alert();
        // const _a: any = this;
        return util.safeJson({ ...this.Source }, null, 2);
    }

    public get getName() {
        return "123";
    }

    public get NaviColumnGroups() {
        // alert("获取");
        return this.Store.getColumnGroupsByPageStyle;
    }

    public getNaviColGroupByCOlName(index: number) {

    }

    public next() {
        const _len = this.Store.getColumnGroupsByPageStyle.length;
        this.GroupIndex++;
        if (_len == this.GroupIndex) {
            this.GroupIndex = 0;
        }
    }

}
