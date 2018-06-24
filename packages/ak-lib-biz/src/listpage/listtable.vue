<template>
    <div>
        <Table   stripe border  :columns="Columns" :data="Datasource"  size="large"></Table>
        <Card v-if="Datasource && Datasource.length"  > 
        <Page :total="PagerData.total"  :page-size-opts="[5,10, 20, 30, 40]"  @on-change="pageChange"
         :page-size="PagerData.size"   :current="PagerData.page+1"  
          size="small" show-elevator show-sizer show-total  >
          </Page></Card>
         
        </div>
</template>

<script lang="ts">
import getmodule from "ak-lib-sys/src/vuemixin/getmodule.vue";
import { mapGetters } from 'vuex'

export default {

  mixins: [getmodule as any],
    computed: {
          ...mapGetters([
              "Columns",
              "Datasource","PagerData"
          ])
      }
    
}
</script>

<style>

</style>
