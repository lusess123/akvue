import Vue from 'vue'
import Component from 'vue-class-component'
import { core, ioc, vue, util } from "ak-lib-sys/src";
import normalvue from "./view/normalvue.vue";

@Component
export class BaseVueDom extends Vue {
    get computedMsg() {
        return new Date().toString();
    }
}

@ioc.PlugIn({ RegName: "VuePage", BaseType: "vue", CreateDate: "2018-02-01", Doc: "VuePage" })
@Component({
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
    components:{
        normalvue
    }
})

export class VuePage extends BaseVueDom {
    // initial data
    msg = 123

    // use prop values for initial data
    helloMsg = 'Hello, ' + this["propMessage"]

    NormalVueVm = {aaa:"NormalVueVm"};


    // lifecycle hook
    mounted() {
       // this.greet()
    }

    // computed
  

    // method
    greet() {
        alert('greeting: ' + this.msg)
       this.NormalVueVm.aaa = "123";
    }

    get computedMsg1() {
        return new Date().toString();
    }

}


