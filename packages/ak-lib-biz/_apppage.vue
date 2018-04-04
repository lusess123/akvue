<template>
  <div>{{vm.getPageName()}}</div>
</template>

<script lang="ts">
import {BasePage} from "ak-lib-web/basepage";
import { ioc,core } from "ak-lib-sys";
import Vue from 'vue'


export default {
        props:["vm"],
        name:"appPage"
}; 

// _view ;
@ioc.PlugIn({RegName:"AppPage",BaseType:"IPage"})
export class AppPage extends BasePage{
       // _VueObj  =  _vue ;
        protected  loadPage(){
               super.loadPage();
               //alert(alert(this.P1));
               
         }

         public getPageName():string{
                 return this.PageName ? this.PageName :"";
         }

}
//core.alert(default);
//core.alert(eval("default"));

</script>
//
<style>

</style>
