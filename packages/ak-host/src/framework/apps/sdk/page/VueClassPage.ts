import { core, ioc, vue, util } from "ak-lib-sys";
import { BasePage } from "ak-lib-web/basepage";
import Vue from "vue"
import { VuePage } from "./VuePage"; VuePage;


//mport {Container} from "typedi";



const _getType = (name: string) => {

    //core.alert(ioc.Ioc.Current().IocModel());
    const _list = ioc.Ioc.Current().GetTypeList("vue");
    const _num = _list.findIndex(a => a.RegName.toLocaleLowerCase() == name.toLocaleLowerCase());
    //core.alert(_list[_num].InstanceType);
    return _list[_num].InstanceType;
}
export const com = function (vuea: any,comOpt:any = {} ) {
    return function (constructor: Function) {
        //debugger ;
        comOpt = { ...comOpt,...{extends:constructor["_vueObj"]}};
        const  components =  comOpt.components ;
        const _type = typeof (vuea);
       const _base =  constructor["_vueObj"] ;
        if (_type == "function")
            constructor["_vueObj"] = vuea;
        else {
            if (_type == "string")
                constructor["_vueObj"] =vue. vueTpl(util.getFunName(constructor) + core.getUniId(),components,comOpt)(vuea);
            else {
                const _base = {name : "com" + core.getUniId() , props: ["vm"]};
                constructor["_vueObj"] = Vue.extend( {..._base, ...vue,...comOpt} );
            }
        }
        
        //constructor["_vueObj"] = {extends:};
        //window["aaaa1"] =   constructor["_vueObj"];
       //window["a1"] =   constructor;
       // alert(1);
    }
}

function configurable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        debugger;
        const _baseVue = target.constructor["_vueObj"];
        if(_baseVue){
            //constructor["_vueObj"]  = 
            target.constructor["_vueObj"] ={
                      computed:{
                           [propertyKey]:function(){
                              return  this.vm[propertyKey];
                          },
                          CCC(){
                              return "123";
                          }
                        },
                        
                        extends:_baseVue

                    };
            
                
        } 
    };
}

@ioc.PlugIn({ RegName: "VueClassPage", BaseType: "IPage", CreateDate: "2018-02-01", Doc: "VueClass页面插件" })
@vue.com(`<div>{{vm.$_aa}}   ---------------
{{vm.g}}
<br/>

<br/>
RR:{{RR}}
<br/>
VueClassPage{{vm.d}} === {{vm.Pro}}
<br/>
事件访问器：
{{vm.DatePro}}---- {{DatePro}}
<br/>
双倍点击: {{vm.listk}}
<br/>
{{vm.StoreObj}}
<br/>
<testcom :a="vm.A"   :b="vm.B" :change="vm.change.bind(vm)" ></testcom>
<Button  @click="vm.submit()">更新</Button>
<VuePage   propMessage="xxxxx" />
</div>`, {
        components: { VuePage: _getType("VuePage") },
        beforeUpdate() {
            //alert(" vueclass 更新了");
        },
        computed: {
            DatePro() {
              // alert("计算属性执行");
                return new Date().toString() + "====" + this.vm.X;
            }
            ,iiii(){
                //alert("iiii");
            }
        }
    })

export class VueClassPage extends BasePage {

    Title = "vue class";

    constructor() {
        super();
        this.submit = this.submit.bind(this);
    }

    protected loadPage() {
        window["xxx"] = this;
        // core.alert(this.UniId);
        this.pRegisterModule(moduleA);


    }
    $_aa: string = "vfr";
    A: string = "123";
    B: string = "abc";
    c: string = "sssss";
    d: string = "dfdfdf";
    e: string = "cderer";
    f: string = "666";
    g: string = "ggggg";

    update() {
        // this.forceUpdate();
        this.forceUpdate();
    }
    
    getModuleX() {
       // alert("方法执行");
        // alert(this.getModuleState().X);
        return this.getModuleState().X;
    }
  
   get X(){
       debugger;
        //  alert("computer getters X");
        return this.$store.getters.getX;
    }
   @vue.compute() get RR(){
       // alert("RR");
        return this.$store.getters.getX;
    }

    submit() {
        if (this.$store.state[this.UniId]) {
            // this.registerModule();
            // alert("开始更新"+ this.A);
             //this.$store.commit('increment')
             this.commit('increment',"");
           // this.$store.state[this.UniId].add();
            // this.forceUpdate();
        }
    }

    change(a) {
        // alert(a);
        this.A = new Date().toString();
    }

    private fDatePro: any;
    get DatePro() {
        //this.fDatePro = new Date().toString();
        return new Date().toString();
    }
    set DatePro(val) {
        this.fDatePro = val;
    }


    get Pro(): string {
        return this.e;
    };

    get StoreObj(): string {
        // alert(this.A);
        if (this.A == "1")
            return this.$store.state.user.a;
        else
            if (this.$store.state[this.UniId])
                return this.$store.state[this.UniId].count;
            else {
                return new Date().toString();
            }
    }
 
    get listk(): string {
        if (this.$store.state[this.UniId])
            return this.getModuleState().threeCount;
        else
            return "不存在";
    }



}




const _vue = Vue.component("testcom", {
    template: `
    <div>
    时间计算属性：{{DatePro}} 函数属性：{{aa1}}
    <Button  @click='change(val)'>testcom{{a}}  {{b}} {{change}}</Button>
    </div>
    `,
    props: ["a", "b", "change"],
    data() {
        return {
            val: "cc",
            get aa1() {
                return "aa" + new Date().toString();
            }
        };
    },
    beforeUpdate() {
        // alert(" testcom 更新了");
    },
    methods: {
        get aa() {
            return "aa" + new Date().toString();
        }
    },
    computed: {
        DatePro() {
            // alert();
            return new Date().toString() + this.b;
        }
        
    }
});


class AppData {
    count: number = 1;
    X = "dddd";
    M = "tttt";
    add() {
        this.count = this.count + 2;
    }

    get threeCount(): number {
        return this.count * 3;
    }


}


const moduleA = {
    state: new AppData(),
    mutations: {
        increment(state) {
            // 这里的 `state` 对象是模块的局部状态
            state.count++
            state.X = state.count;
        }
    },

    getters: {
        doubleCount(state) {
            return  state.count * 2
        },
        getX(s){
           // alert("x");
            return s.X ;
         }
    }
}




export class  AA {
    constructor(
        private asd :string ,
        private fff :string ,
        public   XXX :string 
    ){
        this.asd ;
        this.XXX;
        
    }

    alert(){
       // alert(this.XXX);
    }
}

new AA("aa","ccc","tytyty").alert();

class SomeClass {

    someMethod() {
        
    }

}








