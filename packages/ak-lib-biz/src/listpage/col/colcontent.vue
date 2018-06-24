<template>
    <div>
        <div v-if="hasCol(ColumnConfig.ControlType)"  :is="ColumnConfig.ControlType+'col'"  :v-model="value" :ColumnConfig="ColumnConfig" ></div>
        <div v-else>找不到{{ColumnConfig.ControlType}} 控件</div>
    </div>
</template>

<script lang="ts">
import registcol from "./registcol"
import Textcol from "./textcol.vue";

export default {
      props:["ColumnConfig","value"],
      components: registcol,
      
      methods:{
          hasCol(controlType:string){           
            return registcol[controlType+"col"];           
          }
      }
}
</script>

<style>

</style>
