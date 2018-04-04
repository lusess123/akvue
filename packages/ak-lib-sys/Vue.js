var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import Vue from 'vue';
import * as core from "./Core";
import * as util from "./Util";
import event from "./event";
import basecomixin from "./vuemixin/basecom.vue";
export var create = function (options, name) {
    if (name)
        options.name = name;
    return options;
};
var _com = function (h, name, tpl, pro, props) {
    var _vueObj = Vue.extend({
        name: name,
        props: props,
        template: tpl
    });
    Vue.component(name, _vueObj);
    return h(name, { props: { vm: pro } });
};
export var tpl = function (h) {
    return function (tpl, pro) {
        return _com(h, "tplName" + core.getUniId(), tpl, pro ? pro : {}, ["vm"]);
    };
};
export var vm = function (objPro) {
    return "\n       <temple   v-if=\"vm." + objPro + " && vm." + objPro + ".renderCom\"  :is=\"vm." + objPro + ".renderCom()\"  :vm=\"vm." + objPro + "\"></temple>\n   ";
};
export var registAndGetVueComName = function (vm, vueObj) {
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
    if (!vueObj)
        throw { error: "组件不能为空", vm: vm };
    var _name = "";
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
};
export var vueTpl = function (name, components, comOpt) {
    return function (tpl) {
        //  const _vueObj = Vue.extend(
        var _vueOpt = {
            mixins: [basecomixin],
            template: tpl,
            components: components
        };
        comOpt = comOpt ? comOpt : {};
        comOpt = __assign({}, _vueOpt, comOpt);
        //  );
        var _obj = comOpt;
        return _obj;
    };
};
export var com = function (vue, comOpt) {
    if (comOpt === void 0) { comOpt = {}; }
    return function (constructor) {
        //debugger ;
        var _type = typeof (vue);
        if (_type == "function" || _type == "object") {
            //直接设置组件
            constructor["_vueObj"] = vue;
        }
        else {
            //如果是string
            comOpt = __assign({}, comOpt, { extends: constructor["_vueObj"] });
            if (!constructor["_vueObj"]) {
                var components = comOpt.components;
                constructor["_vueObj"] = vueTpl(util.getFunName(constructor) + core.getUniId(), components, comOpt)(vue);
            }
            else {
                var components = comOpt.components;
                //constructor["_vueObj"].template = vue ;
                constructor["_vueObj"] = __assign({ components: components, render: null, template: vue, name: util.getFunName(constructor) + core.getUniId() }, { extends: comOpt });
            }
        }
    };
};
var _clearRender = function (vueObj) {
};
export function getTempVueName(vueProty, name) {
    var _name = name;
    if (!_name) {
        _name = util.getFunName(vueProty);
    }
    _name = _name + event.getUniId();
    return _name;
}
export var compute = function (name) {
    return function (target, propertyKey, descriptor) {
        var _baseVue = target.constructor["_vueObj"];
        if (_baseVue) {
            //constructor["_vueObj"]  = 
            target.constructor["_vueObj"] = {
                computed: (_a = {},
                    _a[name ? name : propertyKey] = function () {
                        return this.vm[propertyKey];
                    },
                    _a),
                extends: _baseVue
            };
        }
        var _a;
    };
};
var _createTplVue = function (tpl, vm) {
    var _name = "tplVue" + event.getUniId();
    Vue.component(_name, {
        props: ["vm"],
        template: tpl
    });
    // vm = { ...vm };
    vm["renderCom"] = function () {
        return _name;
    };
    return vm;
};
export var cvue = function (vm) {
    return function (tpl) {
        return _createTplVue(tpl, vm);
    };
};
