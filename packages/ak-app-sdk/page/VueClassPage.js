var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
import { VuePage } from "./VuePage";
VuePage;
//mport {Container} from "typedi";
var _getType = function (name) {
    //core.alert(ioc.Ioc.Current().IocModel());
    var _list = ioc.Ioc.Current().GetTypeList("vue");
    var _num = _list.findIndex(function (a) { return a.RegName.toLocaleLowerCase() == name.toLocaleLowerCase(); });
    //core.alert(_list[_num].InstanceType);
    return _list[_num].InstanceType;
};
export var com = function (vuea, comOpt) {
    if (comOpt === void 0) { comOpt = {}; }
    return function (constructor) {
        //debugger ;
        comOpt = __assign({}, comOpt, { extends: constructor["_vueObj"] });
        var components = comOpt.components;
        var _type = typeof (vuea);
        var _base = constructor["_vueObj"];
        if (_type == "function")
            constructor["_vueObj"] = vuea;
        else {
            if (_type == "string")
                constructor["_vueObj"] = vue.vueTpl(util.getFunName(constructor) + core.getUniId(), components, comOpt)(vuea);
            else {
                var _base_1 = { name: "com" + core.getUniId(), props: ["vm"] };
                constructor["_vueObj"] = Vue.extend(__assign({}, _base_1, vue, comOpt));
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
        var _baseVue = target.constructor["_vueObj"];
        if (_baseVue) {
            //constructor["_vueObj"]  = 
            target.constructor["_vueObj"] = {
                computed: (_a = {},
                    _a[propertyKey] = function () {
                        return this.vm[propertyKey];
                    },
                    _a.CCC = function () {
                        return "123";
                    },
                    _a),
                extends: _baseVue
            };
        }
        var _a;
    };
}
var VueClassPage = /** @class */ (function (_super) {
    __extends(VueClassPage, _super);
    function VueClassPage() {
        var _this = _super.call(this) || this;
        _this.Title = "vue class";
        _this.$_aa = "vfr";
        _this.A = "123";
        _this.B = "abc";
        _this.c = "sssss";
        _this.d = "dfdfdf";
        _this.e = "cderer";
        _this.f = "666";
        _this.g = "ggggg";
        return _this;
        // this.submit = this.submit.bind(this);
    }
    VueClassPage.prototype.loadPage = function () {
        window["xxx"] = this;
        // core.alert(this.UniId);
        this.pRegisterModule(moduleA);
    };
    VueClassPage.prototype.update = function () {
        // this.forceUpdate();
        this.forceUpdate();
    };
    VueClassPage.prototype.getModuleX = function () {
        // alert("方法执行");
        // alert(this.getModuleState().X);
        return this.getModuleState().X;
    };
    Object.defineProperty(VueClassPage.prototype, "X", {
        get: function () {
            debugger;
            //  alert("computer getters X");
            return this.$store.getters.getX;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VueClassPage.prototype, "RR", {
        get: function () {
            // alert("RR");
            return this.$store.getters.getX;
        },
        enumerable: true,
        configurable: true
    });
    VueClassPage.prototype.submit = function () {
        if (this.$store.state[this.UniId]) {
            // this.registerModule();
            // alert("开始更新"+ this.A);
            //this.$store.commit('increment')
            this.commit('increment', "");
            // this.$store.state[this.UniId].add();
            // this.forceUpdate();
        }
    };
    VueClassPage.prototype.change = function (a) {
        // alert(a);
        this.A = new Date().toString();
    };
    Object.defineProperty(VueClassPage.prototype, "DatePro", {
        get: function () {
            //this.fDatePro = new Date().toString();
            return new Date().toString();
        },
        set: function (val) {
            this.fDatePro = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VueClassPage.prototype, "Pro", {
        get: function () {
            return this.e;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(VueClassPage.prototype, "StoreObj", {
        get: function () {
            // alert(this.A);
            if (this.A == "1")
                return this.$store.state.user.a;
            else if (this.$store.state[this.UniId])
                return this.$store.state[this.UniId].count;
            else {
                return new Date().toString();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VueClassPage.prototype, "listk", {
        get: function () {
            if (this.$store.state[this.UniId])
                return this.getModuleState().threeCount;
            else
                return "不存在";
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        vue.compute(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], VueClassPage.prototype, "RR", null);
    VueClassPage = __decorate([
        ioc.PlugIn({ RegName: "VueClassPage", BaseType: "IPage", CreateDate: "2018-02-01", Doc: "VueClass页面插件" }),
        vue.com("<div>{{vm.$_aa}}   ---------------\n{{vm.g}}\n<br/>\n\n<br/>\nRR:{{RR}}\n<br/>\nVueClassPage{{vm.d}} === {{vm.Pro}}\n<br/>\n\u4E8B\u4EF6\u8BBF\u95EE\u5668\uFF1A\n{{vm.DatePro}}---- {{DatePro}}\n<br/>\n\u53CC\u500D\u70B9\u51FB: {{vm.listk}}\n<br/>\n{{vm.StoreObj}}\n<br/>\n\n<Button  @click=\"vm.submit()\">\u66F4\u65B0</Button>\n<VuePage   propMessage=\"xxxxx\" />\n</div>", {
            components: { VuePage: _getType("VuePage") },
            beforeUpdate: function () {
                //alert(" vueclass 更新了");
            },
            computed: {
                DatePro: function () {
                    // alert("计算属性执行");
                    return new Date().toString() + "====" + this.vm.X;
                },
                iiii: function () {
                    //alert("iiii");
                }
            }
        }),
        __metadata("design:paramtypes", [])
    ], VueClassPage);
    return VueClassPage;
}(BasePage));
export { VueClassPage };
var _vue = Vue.component("testcom", {
    template: "\n    <div>\n    \u65F6\u95F4\u8BA1\u7B97\u5C5E\u6027\uFF1A{{DatePro}} \u51FD\u6570\u5C5E\u6027\uFF1A{{aa1}}\n    <Button  @click='change(val)'>testcom{{a}}  {{b}} {{change}}</Button>\n    </div>\n    ",
    props: ["a", "b", "change"],
    data: function () {
        return {
            val: "cc",
            get aa1() {
                return "aa" + new Date().toString();
            }
        };
    },
    beforeUpdate: function () {
        // alert(" testcom 更新了");
    },
    methods: {
        get aa() {
            return "aa" + new Date().toString();
        }
    },
    computed: {
        DatePro: function () {
            // alert();
            return new Date().toString() + this.b;
        }
    }
});
var AppData = /** @class */ (function () {
    function AppData() {
        this.count = 1;
        this.X = "dddd";
        this.M = "tttt";
    }
    AppData.prototype.add = function () {
        this.count = this.count + 2;
    };
    Object.defineProperty(AppData.prototype, "threeCount", {
        get: function () {
            return this.count * 3;
        },
        enumerable: true,
        configurable: true
    });
    return AppData;
}());
var moduleA = {
    state: new AppData(),
    mutations: {
        increment: function (state) {
            // 这里的 `state` 对象是模块的局部状态
            state.count++;
            state.X = state.count;
        }
    },
    getters: {
        doubleCount: function (state) {
            return state.count * 2;
        },
        getX: function (s) {
            // alert("x");
            return s.X;
        }
    }
};
var AA = /** @class */ (function () {
    function AA(asd, fff, XXX) {
        this.asd = asd;
        this.fff = fff;
        this.XXX = XXX;
        this.asd;
        this.XXX;
    }
    AA.prototype.alert = function () {
        // alert(this.XXX);
    };
    return AA;
}());
export { AA };
new AA("aa", "ccc", "tytyty").alert();
var SomeClass = /** @class */ (function () {
    function SomeClass() {
    }
    SomeClass.prototype.someMethod = function () {
    };
    return SomeClass;
}());
