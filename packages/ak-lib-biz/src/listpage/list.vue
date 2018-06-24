<template>
<div>
    <listbiz   :fetchModule="fetchModule"  />
    <button @click="()=>{btnclick()}">修改</button>
 </div>
</template>

<script>
import listbiz from './listbiz.vue'
import module from "./listmodule";
export default {
    components :{listbiz},
    methods: {
        fetchModule :()=>{
            return module ;
        },
        btnclick(){
           debugger;
            
            this.fetchModule = ()=>{
                return module ;
            }
            this.$forceUpdate();
        }
    }

}
</script>

<style>

</style>
