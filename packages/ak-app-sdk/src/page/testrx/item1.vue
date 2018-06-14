<template>
  <div>fff123
   
    计算属性： {{btnText}}{{col}}
  </div>
</template>

<script>
import vuemixin  from "ak-lib-sys/src/vuemixin/uniidmixin.vue"
import { core} from "ak-lib-sys/src"
//core.alert(123);
 // core.alert(vuemixin);
export default {
  mixins:[vuemixin],
  props: ["btnText"],
  updated() {
    //debugger;
   // alert("item1.vue 更新了");
  },
  
  computed:{
       col(){
         // debugger ;
         //alert("computed");
        return  this.getCurrentState$();
       }
  },

  methods: {
    getCol() {
      return this.getCurrentState$().getCol();
    },
     getCol1() {
      return this.getCurrentState$().getCol1();
    },
     getCol3() {
      return this.getCurrentState$().getCol3();
    },
     colget()
    {
      return this.getCurrentState$().colget;
    }
  }
};
</script>

<style>

</style>
