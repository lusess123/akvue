import Vue from 'vue';
import * as core from "./Core";
import * as util from "./Util";
import event from "./event";
import * as $ from "jquery";
import basecomixin from "./vuemixin/basecom.vue"

export const create = (options, name?: string) => {
    if (name) options.name = name;
    return options;
}

const _com = function (h: any, name: string, tpl: string, pro: any, props: string[]) {
    const _vueObj = Vue.extend({
        name: name,
        props: props,
        template: tpl
    });

    Vue.component(name, _vueObj);

    return h(name, { props: { vm: pro } });
}

export const tpl = h =>
    (tpl: string, pro?: any) => {

        return _com(h, "tplName" + core.getUniId(), tpl, pro ? pro : {}, ["vm"])

    }
export const vm = (objPro: string) => {

    return `
       <temple   v-if="vm.${objPro} && vm.${objPro}.renderCom"  :is="vm.${objPro}.renderCom()"  :vm="vm.${objPro}"></temple>
   `;
}


export const registAndGetVueComName = (vm, vueObj?) => {
   // debugger ;
    if (!vueObj) {
        if (vm) {
            if (vm._VueObj) {
                vueObj = vm._VueObj;
            }
            else {
                if (vm["constructor"]["_vueObj"]) {
                    vueObj = vm["constructor"]["_vueObj"];
                }
            }
        }

    }
    if (!vueObj) throw { error: "组件不能为空", vm: vm };
    let _name: string = "";
    if (!vueObj.name) {
         _name = "tempvuecom";
    }
    else {
        // debugger;
        if (vm["constructor"]) {
            _name = util.getFunName(vm["constructor"]);
        }
        else {
            _name = vueObj.name;
        }
    }
    _name = _name + core.getUniId();
    //Vue.component('FormType'+name,com);
    Vue.component(_name, vueObj);
    return _name;

}



export const vueTpl =
    (name: string, components?: any, comOpt?: any) =>
        (tpl: string) => {

            //  const _vueObj = Vue.extend(
            const _vueOpt = {

                mixins: [basecomixin],

               
                template: tpl,
                components: components
            }

            comOpt = comOpt ? comOpt : {};

            comOpt = { ..._vueOpt, ...comOpt };

            //  );
            const _obj: any = comOpt;
            return _obj;
        }



export const com = function (vue: any|string, comOpt: any = {}) {
    return function (constructor: Function) {
        //debugger ;


        const _type = typeof (vue);
        if (_type == "function" || _type == "object") {
            //直接设置组件
            constructor["_vueObj"] = vue;
        }
        else {
            //如果是string
           
            comOpt = {    ...comOpt,  ...{ extends: constructor["_vueObj"] } };

            if (!constructor["_vueObj"]) {
                const components = comOpt.components;
                constructor["_vueObj"] = vueTpl(util.getFunName(constructor) + core.getUniId(), components, comOpt)(vue);
            }
            else {
                const components = comOpt.components;
                //constructor["_vueObj"].template = vue ;
                constructor["_vueObj"] = { ...{ components:components,render:null,template: vue ,name:util.getFunName(constructor)+ core.getUniId()}, ...{ extends: comOpt } };
            }

        }
    }
}

const _clearRender = function(vueObj){
         
}


export function getTempVueName(vueProty: any, name?: string) {
    let _name = name;
    if (!_name) {
        _name = util.getFunName(vueProty);
    }
    _name = _name + event.getUniId();
    return _name;
}


export const compute = function (name?: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const _baseVue = target.constructor["_vueObj"];
        if (_baseVue) {
            //constructor["_vueObj"]  = 
            target.constructor["_vueObj"] = {
                computed: {
                    [name ? name : propertyKey]: function () {
                        return this.vm[propertyKey];
                    }
                },

                extends: _baseVue

            };


        }
    };
}



const _createTplVue = function <T>(tpl, vm: T): T {
    const _name = "tplVue" + event.getUniId();
    Vue.component(_name, {
        props: ["vm"],
        template: tpl
    });

    // vm = { ...vm };
    vm["renderCom"] = () => {
        return _name;
    }
    return vm;
};

export const cvue = <T>(vm: T) =>
    (tpl: string): T | IVueRender => {

        return _createTplVue<T>(tpl, vm);
    }


export interface IVueRender {
    renderCom(): string;
}

















