<template>
    <div>
        <Card>lllll
            <p slot="title" @click="vm.toogleShow()">
                <a>
                    {{vm.getConstructName()}}
                    <Icon type="android-happy" color="green"></Icon>
                </a>
            </p>
            <div v-if="vm.fIsShow">
                <pre><code>{{vm.renderString()}} </code></pre>
            </div>
        </Card>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import UniIdMixin from "./uniidmixin.vue";
import tipmixin from "./tipmixin.vue";
import * as $ from "jquery";
import * as util from "./../Util";
import * as basecom from "./../com/BaseCom"
export default {
  props: ["vm"],
  mixins: [UniIdMixin  as any , tipmixin   as any ],

  data(){
       return {
             vmEvent:[]
       }
  },
  renderError: (h, err) => {
    return h("pre", { title: err.stack, style: { color: "red" } }, err.stack);
  },

  created: function() {
    this.vm.$store = this.$store;
  },


  
  beforeUpdate: function() {
    this.vm.$store = this.$store;
  },

  beforeDestroyed: function() {
    if (this.vm.IsSingle$) {
      if (this.vm.dispose) {
        this.vm.dispose();
      }
    }
  },

  mounted: function() {
    if (this.$props.vm.getEvent) {
       const _vm :  basecom.BaseCom   = this.$props.vm;
       const me = this ;
       this.listenVmEvent(_vm,function(){
          me.$forceUpdate();
       });

    }
  },

  watch: {
    vm(newVm, oldVm) {
      if (newVm) {
        // alert("watch vm ");
        //  this.vm.$store = this.$store;
        if (oldVm.IsSingle$) {
          if (oldVm.dispose) {
            oldVm.dispose();
          }
        }
        console.log("vm change");
        const _$t = $(this.$el);
        _$t.removeClass("acs-module-warning  borderError ");
        console.log(this.$el["div"]);
        // if(window["aaa"] === this) {alert("el");}
        if (this.$el["div"]) {
          // alert(123);
          this.$el["div"].remove();
        }
         const me = this ;
        this.clearVmEvent(oldVm);
         this.listenVmEvent(newVm,function(){
          me.$forceUpdate();
       });


      }
    }
  },

  methods:{
    listenVmEvent(vm: basecom.BaseCom, name:string ,fun: Function ){
        this.vmEvent.push({name,fun});
        //const _vm :  basecom.BaseCom   = this.$props.vm;
        vm.getEvent().on(name,fun);

  },

  clearVmEvent(vm: basecom.BaseCom){
           this.vmEvent.foreach(e=>{
                vm.getEvent().off(e.name,e.fun);
           });
           this.vmEvent = [] ;
  },

  }
};
</script>

<style>

</style>
