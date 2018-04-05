var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Vue from 'vue';
import Component from 'vue-class-component';
import { ioc } from "ak-lib-sys";
import normalvue from "./view/normalvue.vue";
let BaseVueDom = class BaseVueDom extends Vue {
    get computedMsg() {
        return new Date().toString();
    }
};
BaseVueDom = __decorate([
    Component
], BaseVueDom);
export { BaseVueDom };
let VuePage = class VuePage extends BaseVueDom {
    constructor() {
        super(...arguments);
        // initial data
        this.msg = 123;
        // use prop values for initial data
        this.helloMsg = 'Hello, ' + this["propMessage"];
        this.NormalVueVm = { aaa: "NormalVueVm" };
    }
    // lifecycle hook
    mounted() {
        // this.greet()
    }
    // computed
    // method
    greet() {
        alert('greeting: ' + this.msg);
        this.NormalVueVm.aaa = "123";
    }
    get computedMsg1() {
        return new Date().toString();
    }
};
VuePage = __decorate([
    ioc.PlugIn({ RegName: "VuePage", BaseType: "vue", CreateDate: "2018-02-01", Doc: "VuePage" }),
    Component({
        template: `
   
    <div>
      <input v-model="msg">
      <p>prop: {{propMessage}}</p>
      <p>msg: {{msg}}</p>
      <p>helloMsg: {{helloMsg}}</p>
      <p>computed msg: {{computedMsg}}</p>
      <p>computed msg1: {{computedMsg1}}</p>
      <button @click="greet">Greet</button>
      <hr/>
       <Card><div  :is="'normalvue'" :vm="NormalVueVm"></div></Card>
    </div>
 
    `,
        props: {
            propMessage: String
        },
        components: {
            normalvue
        }
    })
], VuePage);
export { VuePage };
