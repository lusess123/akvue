import { ICom } from "./ICom";
import { core, ioc, vue, util } from "./../index";
import eventBus, { fetchEvent } from "./../event";
import { IEvent } from "./../event/IEvent";
import Vue from "vue";

import basecomvue from "./../vuemixin/basecom.vue"


export interface IBaseComConfig {
    UniId?: string;
}
export interface IFunDic {
    [name: string]: Function;
}




@ioc.PlugIn({ BaseType: "ICom", RegName: "BaseCom" })
@vue.com(basecomvue)
export class BaseCom implements ICom {
    $store: any;
    _VueObj: any;
    UniId: string;
    private fIsShow: boolean = false;
    protected AppEventFunDic: IFunDic = {};

    private fLoacalEventBus: IEvent;

    public constructor(config?: IBaseComConfig) {
        this.bindMethod();
        if (config) {
            if (config.UniId) {
                this.UniId = config.UniId;
            }
        }
    }

    protected bindMethod()
    {

    }

    public forceUpdate() {
        this.getEvent().emit("forceUpdate");
    }

    public getEvent(): IEvent {
        if (!this.fLoacalEventBus) {
            this.fLoacalEventBus = fetchEvent();
        }
        return this.fLoacalEventBus;
    }

    private toogleShow() {
        this.fIsShow = !this.fIsShow;
    }

    renderString() {
         const _vm :any = this ;
        // const _ff =  {..._vm}
        return core.json({...{}, ... _vm, ...{$store:null},...{fLoacalEventBus:null} });
    }

    getConstructName() {
        // debugger ;
        return util.getFunName(this["constructor"]);
    }

    protected setRx(pro: string, obj?: any) {
        const me: any = this;
        Vue.set(me, pro, obj ? obj : {});
    }

    getVueObj() {
        if (this._VueObj) return this._VueObj;
        else {
            if (this["constructor"] && this["constructor"]["_vueObj"]) {
                return this["constructor"]["_vueObj"];
            }
            else {
                throw " 没有挂载组件...";
            }
        }
    }

    renderCom(): string {
        return vue.registAndGetVueComName(this, this.getVueObj())
    }

    private  comEventList = [] ;
    public listenComEvent(name:string,fun:Function){
        this.comEventList.push({name,fun});
        this.getEvent().addListener(name,fun);
        
    }

    protected emitComEvent(name:string, ...arg){
        this.getEvent().emit(name,...arg);
    }

    public clearVueEvent(){
        this.comEventList.forEach(a=>{
                this.getEvent().off(a.name,a.fun);
        });
        this.comEventList = [] ;
    }


    protected listenAppEvent(name: string, uniId: string, fun: Function) {

        var _fun = eventBus
            // .App
            .GetAppEvent()
            .addListener(name + uniId, fun);
        this.AppEventFunDic[name + uniId] = _fun;
        //eventFile.App.GetAppEvent().removeListener(name + uniId, fun);
    }

    protected emitAppEvent(name: string, sign: string, ...args: any[]) {
        // eventFile
        // .App
        eventBus
            .GetAppEvent()
            .emit(name + sign, ...args);
    }

    protected pRegisterModule(module: any) {
       
        if (this.$store) {
            
            if (this.$store.state[this.UniId]) {
                core.alert("该模块${this.UniId}已经注册过了");
            }
            else{
               // alert("注册模块"+ this.UniId);
                this.$store.registerModule(this.UniId, module)
            }
        }
    }

    protected pUnRegisterModule() {
        if (this.$store) {
            //unregisterModule
            if (this.$store.state[this.UniId]) {
                //alert("卸载模块"+ this.UniId);
                this.$store.unregisterModule(this.UniId);
            }
        }
    }

    protected pDispose() {
        this.pUnRegisterModule();
    }

    public dispose() {
        this.pDispose();
    }
    /**
     * 获取当前页面的模块
     * 
     * @returns 
     * @memberof BaseCom
     */
    getModuleState(){
        //debugger;
        if(this.$store && this.$store.state[this.UniId]){
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
    getGetters(name:string){
        if(this.$store){
            if(name)
              return this.$store.getters[name] ;
              else {
                  return this.$store.getters ;
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
   commit(name:string,obj:any){
         if(this.$store){
             this.$store.commit(name,obj);
         }
    }
    /**
     * 分发数据
     * 
     * @param {string} name 
     * @param {*} obj 
     * @memberof BaseCom
     */
    dispatch(name:string,obj:any){
        if(this.$store){
            this.$store.dispatch(name,obj);
        }
    }

    get  xxx ():string {
        return "123";
    }
    set xxx(val :string){
        this.xxx = val ;
    }


}