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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ioc, vue } from "ak-lib-sys";
import { BasePage } from "ak-lib-web/basepage";
import List from "./testrx/list.vue";
//import JsonEditor from "vue-json-edit";
import event from "ak-lib-sys/event";
import Vue from "vue";
//Vue.use(JsonEditor)
var TestRxPage = /** @class */ (function (_super) {
    __extends(TestRxPage, _super);
    function TestRxPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Title = "TestRx";
        _this.List = { a: [], b: "tttt" };
        _this.Url = "/web/testrxpage-win";
        return _this;
    }
    //public IsSingle : true ;
    TestRxPage.prototype.open = function () {
        event.GetAppEvent().emit("openurl", {
            path: this.Url
        });
        //this.$store.state["fff"] = new Date().toString();
        // this.$store.registerModule(new Date().toString(), { state: new TestRxMoule()})
    };
    TestRxPage.prototype.open1 = function () {
        event.GetAppEvent().emit("openurl", {
            path: this.Url, nourl: true
        });
    };
    TestRxPage.prototype.getC = function () {
        var _vm = new Vue({
            mixins: [{
                    data: {
                        ddd: 123
                    }
                }],
            data: {
                $$data: {
                    a: 124, b: 5555
                }
            },
            methods: {
                ff: function () {
                }
            }
        });
        _vm.ff();
        return _vm.$data.$$data;
    };
    //public copyList = [];
    TestRxPage.prototype.loadPage = function () {
        // alert("load");
        var _list = [1, 2, 3, 4, 5].map(function (a) {
            return {
                Index: a,
                Text: a + "文本"
            };
        });
        this.List = { a: _list, b: "xxx" };
        window["RRR"] = this;
        //  this.changeJson.bind(this);
        // window["mm"] = new TestRxMoule();
        this.pRegisterModule({
            state: new TestRxMoule()
        });
    };
    TestRxPage.prototype.changeJson = function (list) {
        // this.List.a = [];
        for (var n in list) {
            var _index = parseInt(n);
            var _n = list[n];
            this.List.a[_index].Text = _n.Text;
        }
    };
    TestRxPage = __decorate([
        vue.com("<div>\n<Input v-model=\"vm.Url\" placeholder=\"Enter something...\" style=\"width: 300px\"></Input>\n<Button @click=\"vm.open()\">url\u663E\u793A</Button>\n<Button @click=\"vm.open1()\">url\u9690\u85CF</Button>\n<List v-if=\"\"  :List=\"vm.List\" :b=\"vm.List.b\" :c=\"vm.getC()\"></List>\n<h1>{{vm.Title}}===={{vm.IsSingle$}}</h1>\n</div>", {
            name: "TestRxPage",
            components: {
                List: List
            },
            provide: {
                UniId: ""
            },
            methods: {
                getC: function () {
                    return { a: 123, b: 4456 };
                }
            },
            mounted: function () {
                window["rxx"] = this;
            },
            updated: function () {
                //  alert("page.vue 更新了");
            },
            created: function () {
                this._provided.UniId = this.vm.UniId;
            },
            destroyed: function () {
                //  alert();
                //debugger ;
                if (this.$props.vm && this.$props.vm.IsSingle$) {
                    if (this.$props.vm.dispose) {
                        //   alert("销毁数据");
                        this.$props.vm.dispose();
                    }
                }
            }
        }),
        ioc.PlugIn({ RegName: "TestRxPage", BaseType: "IPage", CreateDate: "2018-02-23", Doc: "TestRx页面插件" })
    ], TestRxPage);
    return TestRxPage;
}(BasePage));
export { TestRxPage };
var TestRxMoule = /** @class */ (function () {
    function TestRxMoule() {
        this.page = {
            form: {
                row: {
                    col: "aaaa",
                    col1: "11111"
                }
            }
        };
    }
    TestRxMoule.prototype.changeCol = function (a) {
        this.page.form.row.col = a;
    };
    TestRxMoule.prototype.changeCol1 = function (a) {
        this.page.form.row.col1 = a;
    };
    TestRxMoule.prototype.getCol = function () {
        return this.page.form.row.col + new Date().toString();
    };
    TestRxMoule.prototype.getCol1 = function () {
        return this.page.form.row.col1 + new Date().toString();
    };
    TestRxMoule.prototype.getCol3 = function () {
        return this.page.form.row["col3"] + new Date().toString();
    };
    Object.defineProperty(TestRxMoule.prototype, "colget", {
        get: function () {
            return this.getCol();
        },
        enumerable: true,
        configurable: true
    });
    return TestRxMoule;
}());
export { TestRxMoule };
