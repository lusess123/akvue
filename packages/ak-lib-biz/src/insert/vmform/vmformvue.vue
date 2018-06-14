
<template>
          <lvfrom   ref="$lvform" :value="vm.value"   :options="vm.options"  :action="vm.action" :rules="vm.rules"   />
</template>

<script lang="ts">
import lvfrom from "ak-lib-comp/src/complex/form.vue"
import  * as vmForm from "./vmform"
export default {
      name:"vmform",
      props:["vm"],
      components:{
           lvfrom
      },
      mounted(){
          this.vm.gevmformt
      }

}
</script>

<style>

</style>
