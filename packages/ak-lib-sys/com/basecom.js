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
let BaseCom = class BaseCom {
    constructor(config) {
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
    bindMethod() {
    }
    forceUpdate() {
        this.getEvent().emit("forceUpdate");
    }
    getEvent() {
        if (!this.fLoacalEventBus) {
            this.fLoacalEventBus = fetchEvent();
        }
        return this.fLoacalEventBus;
    }
    toogleShow() {
        this.fIsShow = !this.fIsShow;
    }
    renderString() {
        const _vm = this;
        // const _ff =  {..._vm}
        return core.json(Object.assign({}, _vm, { $store: null }, { fLoacalEventBus: null }));
    }
    getConstructName() {
        // debugger ;
        return util.getFunName(this["constructor"]);
    }
    setRx(pro, obj) {
        const me = this;
        Vue.set(me, pro, obj ? obj : {});
    }
    getVueObj() {
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
    }
    renderCom() {
        return vue.registAndGetVueComName(this, this.getVueObj());
    }
    listenComEvent(name, fun) {
        this.comEventList.push({ name, fun });
        this.getEvent().addListener(name, fun);
    }
    emitComEvent(name, ...arg) {
        this.getEvent().emit(name, ...arg);
    }
    clearVueEvent() {
        this.comEventList.forEach(a => {
            this.getEvent().off(a.name, a.fun);
        });
        this.comEventList = [];
    }
    listenAppEvent(name, uniId, fun) {
        var _fun = eventBus
            // .App
            .GetAppEvent()
            .addListener(name + uniId, fun);
        this.AppEventFunDic[name + uniId] = _fun;
        //eventFile.App.GetAppEvent().removeListener(name + uniId, fun);
    }
    emitAppEvent(name, sign, ...args) {
        // eventFile
        // .App
        eventBus
            .GetAppEvent()
            .emit(name + sign, ...args);
    }
    pRegisterModule(module) {
        if (this.$store) {
            if (this.$store.state[this.UniId]) {
                core.alert("该模块${this.UniId}已经注册过了");
            }
            else {
                // alert("注册模块"+ this.UniId);
                this.$store.registerModule(this.UniId, module);
            }
        }
    }
    pUnRegisterModule() {
        if (this.$store) {
            //unregisterModule
            if (this.$store.state[this.UniId]) {
                //alert("卸载模块"+ this.UniId);
                this.$store.unregisterModule(this.UniId);
            }
        }
    }
    pDispose() {
        this.pUnRegisterModule();
    }
    dispose() {
        this.pDispose();
    }
    /**
     * 获取当前页面的模块
     *
     * @returns
     * @memberof BaseCom
     */
    getModuleState() {
        //debugger;
        if (this.$store && this.$store.state[this.UniId]) {
            return this.$store.state[this.UniId];
        }
    }
    /**
     * 获取计算属性
     *
     * @param {string} name
     * @returns
     * @memberof BaseCom
     */
    getGetters(name) {
        if (this.$store) {
            if (name)
                return this.$store.getters[name];
            else {
                return this.$store.getters;
            }
        }
    }
    /**
     * 提交数据
     *
     * @param {string} name
     * @param {*} obj
     * @memberof BaseCom
     */
    commit(name, obj) {
        if (this.$store) {
            this.$store.commit(name, obj);
        }
    }
    /**
     * 分发数据
     *
     * @param {string} name
     * @param {*} obj
     * @memberof BaseCom
     */
    dispatch(name, obj) {
        if (this.$store) {
            this.$store.dispatch(name, obj);
        }
    }
    get xxx() {
        return "123";
    }
    set xxx(val) {
        this.xxx = val;
    }
};
BaseCom = __decorate([
    ioc.PlugIn({ BaseType: "ICom", RegName: "BaseCom" }),
    vue.com(basecomvue),
    __metadata("design:paramtypes", [Object])
], BaseCom);
export { BaseCom };
