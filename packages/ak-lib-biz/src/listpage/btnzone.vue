<template>
    <div class="row" style="padding-bottom:1rem;text-align:right;padding-right:3rem;">
    <Button-group size="small"     shape="circle"  slot="extra"   >
    <i-button  type="primary"  icon="refresh"  >刷新</i-button>

   
   <template v-for="(btn) in  getNoGroupBtns">
        <i-button  :key="btn.Name" type="primary"   @click.prevent="btnClick({btn,$router})" >{{btn.DisplayName}}</i-button>
   </template>

    </Button-group>
<template v-for="(gValue,gKey) in  getBtnGroup">
    <dropdown :key="gKey" style="margin-left: 20px" >
<i-button type="primary"  size="small">
    {{gValue.DisplayName}}
   <i :class="'fa fa-'+gValue.Icon"></i>
</i-button>
<dropdown-menu slot="list" >
  <template  v-for="(btn) in getBtnsByGroupName(gValue.Name)">
  <dropdown-item :key="btn.Name"  > 
     <a @click.prevent="btnClick({btn,$router})"> <i :class="'fa fa-'+btn.Icon">{{btn.DisplayName}}</i></a>
      </dropdown-item>

  </template>
</dropdown-menu>
</dropdown>
</template>

    </div>
</template>

<script>
import getmodule from "ak-lib-sys/src/vuemixin/getmodule.vue";
import { mapGetters,mapActions } from "vuex";
export default {
  mixins: [getmodule],
  computed: {
    ...mapGetters(["getBtnGroup", "getNoGroupBtns", "getBtnsByGroupName"])
   
  },
  methods :{
     
       ...mapActions(["btnClick"])
  }
};
</script>

<style>
</style>
