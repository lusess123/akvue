

import { core, ioc, vue, util } from "ak-lib-sys";
import { BasePage } from "ak-lib-web/basepage";
import List from "./testrx/list.vue";
//import JsonEditor from "vue-json-edit";
import  event from "ak-lib-sys/event";

import Vue from "vue"
//Vue.use(JsonEditor)

@vue.com(`<div>
<Input v-model="vm.Url" placeholder="Enter something..." style="width: 300px"></Input>
<Button @click="vm.open()">url显示</Button>
<Button @click="vm.open1()">url隐藏</Button>
<List v-if=""  :List="vm.List" :b="vm.List.b" :c="vm.getC()"></List>
<h1>{{vm.Title}}===={{vm.IsSingle$}}</h1>
</div>`, {
        name :"TestRxPage",
        components: {
            List
        },
        provide:{
            UniId : ""
        },

        methods:{
              getC(){
                   
                   

                  return    {a:123,b:4456 };
              }
        },
       
        mounted() {
            window["rxx"] = this;
        },
        updated() {
          //  alert("page.vue 更新了");
        },
        created(){
            this._provided.UniId = this.vm.UniId ;
        },
        destroyed:function(){
          //  alert();
            //debugger ;
            if (this.$props.vm && this.$props.vm.IsSingle$) {
                if(this.$props.vm.dispose){
                 //   alert("销毁数据");
                this.$props.vm.dispose();
                }
            }
        }
    })
@ioc.PlugIn({ RegName: "TestRxPage", BaseType: "IPage", CreateDate: "2018-02-23", Doc: "TestRx页面插件" })
export class TestRxPage extends BasePage {


    public Title: string = "TestRx";
    public List: any = { a: [], b: "tttt" };
    public Url  = "/web/testrxpage-win";
    //public IsSingle : true ;

    open(){
        event.GetAppEvent().emit("openurl",{
            path:this.Url
            
       });
        //this.$store.state["fff"] = new Date().toString();
       

       // this.$store.registerModule(new Date().toString(), { state: new TestRxMoule()})
    }

    open1(){
        event.GetAppEvent().emit("openurl",{
            path:this.Url,nourl:true
            
       });
    }

    getC(){
                
          const _vm =  new Vue({
               mixins:[{
                   data:{
                       ddd :123
                   }
               }],
               
                data:{


                    $$data :{
                        a:124,b:5555
                    }

                },
                methods:{
                    ff(){

                    }
                }
            });  
            
            _vm.ff();
           
        return   _vm.$data.$$data;
    }
    //public copyList = [];
    protected loadPage() {
        // alert("load");
        const _list = [1, 2, 3, 4, 5].map(a => {
            return {
                Index: a,
                Text: a + "文本"
            }
        });
        this.List = { a: _list, b: "xxx" };
        window["RRR"] = this;
      //  this.changeJson.bind(this);
      // window["mm"] = new TestRxMoule();
        this.pRegisterModule({
            state: new TestRxMoule()
        });

    }

    public changeJson(list) {
        // this.List.a = [];

        for (const n in list) {
            const _index = parseInt(n);
            const _n = list[n];
            this.List.a[_index].Text = _n.Text;
        }

    }

}

 export class  TestRxMoule 
 {
     public page = {
        form: {
            row: {
                col: "aaaa",
                col1:"11111"
            }
        }
     }
     
    
    

     changeCol(a){
         this.page.form.row.col = a;
     }
     changeCol1(a){
        this.page.form.row.col1 = a;
    }

    getCol(){
        return this.page.form.row.col+  new Date().toString();
    }
    getCol1(){
        return this.page.form.row.col1+  new Date().toString();
    }
    getCol3(){
        return this.page.form.row["col3"]+  new Date().toString();
    }

    get colget()
    {
        return this.getCol();
    }
 }
