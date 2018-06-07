var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { core, ioc, vue, util } from "ak-lib-sys";
import { BasePage } from "ak-lib-web/basepage";
import Vue from "vue";
import { VuePage } from "./vuepage";
VuePage;
//mport {Container} from "typedi";
const _getType = (name) => {
    //core.alert(ioc.Ioc.Current().IocModel());
    const _list = ioc.Ioc.Current().GetTypeList("vue");
    const _num = _list.findIndex(a => a.RegName.toLocaleLowerCase() == name.toLocaleLowerCase());
    //core.alert(_list[_num].InstanceType);
    return _list[_num].InstanceType;
};
export const com = function (vuea, comOpt = {}) {
    return function (constructor) {
        //debugger ;
        comOpt = Object.assign({}, comOpt, { extends: constructor["_vueObj"] });
        const components = comOpt.components;
        const _type = typeof (vuea);
        const _base = constructor["_vueObj"];
        if (_type == "function")
            constructor["_vueObj"] = vuea;
        else {
            if (_type == "string")
                constructor["_vueObj"] = vue.vueTpl(util.getFunName(constructor) + core.getUniId(), components, comOpt)(vuea);
            else {
                const _base = { name: "com" + core.getUniId(), props: ["vm"] };
                constructor["_vueObj"] = Vue.extend(Object.assign({}, _base, vue, comOpt));
            }
        }
        //constructor["_vueObj"] = {extends:};
        //window["aaaa1"] =   constructor["_vueObj"];
        //window["a1"] =   constructor;
        // alert(1);
    };
};
function configurable(value) {
    return function (target, propertyKey, descriptor) {
        debugger;
        const _baseVue = target.constructor["_vueObj"];
        if (_baseVue) {
            //constructor["_vueObj"]  = 
            target.constructor["_vueObj"] = {
                computed: {
                    [propertyKey]: function () {
                        return this.vm[propertyKey];
                    },
                    CCC() {
                        return "123";
                    }
                },
                extends: _baseVue
            };
        }
    };
}
let VueClassPage = class VueClassPage extends BasePage {
    constructor() {
        super();
        this.Title = "vue class";
        this.$_aa = "vfr";
        this.A = "123";
        this.B = "abc";
        this.c = "sssss";
        this.d = "dfdfdf";
        this.e = "cderer";
        this.f = "666";
        this.g = "ggggg";
        // this.submit = this.submit.bind(this);
    }
    loadPage() {
        window["xxx"] = this;
        // core.alert(this.UniId);
        this.pRegisterModule(moduleA);
    }
    update() {
        // this.forceUpdate();
        this.forceUpdate();
    }
    getModuleX() {
        // alert("方法执行");
        // alert(this.getModuleState().X);
        return this.getModuleState().X;
    }
    get X() {
        debugger;
        //  alert("computer getters X");
        return this.$store.getters.getX;
    }
    get RR() {
        // alert("RR");
        return this.$store.getters.getX;
    }
    submit() {
        if (this.$store.state[this.UniId]) {
            // this.registerModule();
            // alert("开始更新"+ this.A);
            //this.$store.commit('increment')
            this.commit('increment', "");
            // this.$store.state[this.UniId].add();
            // this.forceUpdate();
        }
    }
    change(a) {
        // alert(a);
        this.A = new Date().toString();
    }
    get DatePro() {
        //this.fDatePro = new Date().toString();
        return new Date().toString();
    }
    set DatePro(val) {
        this.fDatePro = val;
    }
    get Pro() {
        return this.e;
    }
    ;
    get StoreObj() {
        // alert(this.A);
        if (this.A == "1")
            return this.$store.state.user.a;
        else if (this.$store.state[this.UniId])
            return this.$store.state[this.UniId].count;
        else {
            return new Date().toString();
        }
    }
    get listk() {
        if (this.$store.state[this.UniId])
            return this.getModuleState().threeCount;
        else
            return "不存在";
    }
};
__decorate([
    vue.compute(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], VueClassPage.prototype, "RR", null);
VueClassPage = __decorate([
    ioc.PlugIn({ RegName: "VueClassPage", BaseType: "IPage", CreateDate: "2018-02-01", Doc: "VueClass页面插件" }),
    vue.com(`<div>{{vm.$_aa}}   ---------------
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
            },
            iiii() {
                //alert("iiii");
            }
        }
    }),
    __metadata("design:paramtypes", [])
], VueClassPage);
export { VueClassPage };
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
    constructor() {
        this.count = 1;
        this.X = "dddd";
        this.M = "tttt";
    }
    add() {
        this.count = this.count + 2;
    }
    get threeCount() {
        return this.count * 3;
    }
}
const moduleA = {
    state: new AppData(),
    mutations: {
        increment(state) {
            // 这里的 `state` 对象是模块的局部状态
            state.count++;
            state.X = state.count;
        }
    },
    getters: {
        doubleCount(state) {
            return state.count * 2;
        },
        getX(s) {
            // alert("x");
            return s.X;
        }
    }
};
export class AA {
    constructor(asd, fff, XXX) {
        this.asd = asd;
        this.fff = fff;
        this.XXX = XXX;
        this.asd;
        this.XXX;
    }
    alert() {
        // alert(this.XXX);
    }
}
new AA("aa", "ccc", "tytyty").alert();
class SomeClass {
    someMethod() {
    }
}
