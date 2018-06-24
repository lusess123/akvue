<template>
  
<div>

<Form :label-width="100" inline >
<template  v-for="item   in  getSearchColList">
    <Form-item   class="nomargin"  :key="item.Name" :label="item.DisplayName" >
     <colcontent    :ColumnConfig="item" :value="{}"    />
    </Form-item>
    

    </template>
    <Form-item key="__searchfrom_btn">
    <i-button size="small" type="primary" icon="ios-search" @click="vm.search()">搜索</i-button>
    </Form-item>
    </Form>

 
</div>


</template>

<script lang="ts">
import colcontent from "./col/colcontent.vue";
import getmodule from "ak-lib-sys/src/vuemixin/getmodule.vue";
import { mapGetters } from 'vuex'

export default {

  mixins: [getmodule as any],
 components: { colcontent },
  computed: {
          ...mapGetters([
              "getSearchColList"
          ])
      }
};
</script>

<style scoped>
    .nomargin {
           margin-bottom:0
    }
</style>
