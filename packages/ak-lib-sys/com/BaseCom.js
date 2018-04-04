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
import { core, ioc, vue, util } from "./../index";
import eventBus, { fetchEvent } from "./../event";
import Vue from "vue";
import basecomvue from "./../vuemixin/basecom.vue";
var BaseCom = /** @class */ (function () {
    function BaseCom(config) {
        this.fIsShow = false;
        this.AppEventFunDic = {};
        this.comEventList = [];
        this.bindMethod();
        if (config) {
            if (config.UniId) {
                this.UniId = config.UniId;
            }
        }
    }
    BaseCom.prototype.bindMethod = function () {
    };
    BaseCom.prototype.forceUpdate = function () {
        this.getEvent().emit("forceUpdate");
    };
    BaseCom.prototype.getEvent = function () {
        if (!this.fLoacalEventBus) {
            this.fLoacalEventBus = fetchEvent();
        }
        return this.fLoacalEventBus;
    };
    BaseCom.prototype.toogleShow = function () {
        this.fIsShow = !this.fIsShow;
    };
    BaseCom.prototype.renderString = function () {
        var _vm = this;
        // const _ff =  {..._vm}
        return core.json(__assign({}, _vm, { $store: null }, { fLoacalEventBus: null }));
    };
    BaseCom.prototype.getConstructName = function () {
        // debugger ;
        return util.getFunName(this["constructor"]);
    };
    BaseCom.prototype.setRx = function (pro, obj) {
        var me = this;
        Vue.set(me, pro, obj ? obj : {});
    };
    BaseCom.prototype.getVueObj = function () {
        if (this._VueObj)
            return this._VueObj;
        else {
            if (this["constructor"] && this["constructor"]["_vueObj"]) {
                return this["constructor"]["_vueObj"];
            }
            else {
                throw " 没有挂载组件...";
            }
        }
    };
    BaseCom.prototype.renderCom = function () {
        return vue.registAndGetVueComName(this, this.getVueObj());
    };
    BaseCom.prototype.listenComEvent = function (name, fun) {
        this.comEventList.push({ name: name, fun: fun });
        this.getEvent().addListener(name, fun);
    };
    BaseCom.prototype.emitComEvent = function (name) {
        var arg = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            arg[_i - 1] = arguments[_i];
        }
        (_a = this.getEvent()).emit.apply(_a, [name].concat(arg));
        var _a;
    };
    BaseCom.prototype.clearVueEvent = function () {
        var _this = this;
        this.comEventList.forEach(function (a) {
            _this.getEvent().off(a.name, a.fun);
        });
        this.comEventList = [];
    };
    BaseCom.prototype.listenAppEvent = function (name, uniId, fun) {
        var _fun = eventBus
            // .App
            .GetAppEvent()
            .addListener(name + uniId, fun);
        this.AppEventFunDic[name + uniId] = _fun;
        //eventFile.App.GetAppEvent().removeListener(name + uniId, fun);
    };
    BaseCom.prototype.emitAppEvent = function (name, sign) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        // eventFile
        // .App
        (_a = eventBus
            .GetAppEvent()).emit.apply(_a, [name + sign].concat(args));
        var _a;
    };
    BaseCom.prototype.pRegisterModule = function (module) {
        if (this.$store) {
            if (this.$store.state[this.UniId]) {
                core.alert("该模块${this.UniId}已经注册过了");
            }
            else {
                // alert("注册模块"+ this.UniId);
                this.$store.registerModule(this.UniId, module);
            }
        }
    };
    BaseCom.prototype.pUnRegisterModule = function () {
        if (this.$store) {
            //unregisterModule
            if (this.$store.state[this.UniId]) {
                //alert("卸载模块"+ this.UniId);
                this.$store.unregisterModule(this.UniId);
            }
        }
    };
    BaseCom.prototype.pDispose = function () {
        this.pUnRegisterModule();
    };
    BaseCom.prototype.dispose = function () {
        this.pDispose();
    };
    /**
     * 获取当前页面的模块
     *
     * @returns
     * @memberof BaseCom
     */
    BaseCom.prototype.getModuleState = function () {
        //debugger;
        if (this.$store && this.$store.state[this.UniId]) {
            return this.$store.state[this.UniId];
        }
    };
    /**
     * 获取计算属性
     *
     * @param {string} name
     * @returns
     * @memberof BaseCom
     */
    BaseCom.prototype.getGetters = function (name) {
        if (this.$store) {
            if (name)
                return this.$store.getters[name];
            else {
                return this.$store.getters;
            }
        }
    };
    /**
     * 提交数据
     *
     * @param {string} name
     * @param {*} obj
     * @memberof BaseCom
     */
    BaseCom.prototype.commit = function (name, obj) {
        if (this.$store) {
            this.$store.commit(name, obj);
        }
    };
    /**
     * 分发数据
     *
     * @param {string} name
     * @param {*} obj
     * @memberof BaseCom
     */
    BaseCom.prototype.dispatch = function (name, obj) {
        if (this.$store) {
            this.$store.dispatch(name, obj);
        }
    };
    Object.defineProperty(BaseCom.prototype, "xxx", {
        get: function () {
            return "123";
        },
        set: function (val) {
            this.xxx = val;
        },
        enumerable: true,
        configurable: true
    });
    BaseCom = __decorate([
        ioc.PlugIn({ BaseType: "ICom", RegName: "BaseCom" }),
        vue.com(basecomvue),
        __metadata("design:paramtypes", [Object])
    ], BaseCom);
    return BaseCom;
}());
export { BaseCom };
