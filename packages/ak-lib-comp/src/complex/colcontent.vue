<template>

    <div class="ivu-form-item-content" >
        <div class="ivu-input-wrapper ivu-input-type " :class="{'acs-tag':ControlType=='configList'}">

        <input-tag  v-if="ControlType=='configList' " 
         :placeholder="placeholder"   
         :tags="val"  
      
         :onChange="_onchange"  />

         <radio-selector :Val="val"  v-else-if="ControlType=='radio'"   :onChange="_onchange"  :Url="Url" :ItemList="ItemList"  />

        <Tabs    :value ="val"   v-else-if="ControlType=='Tab'"   @on-click="_onchange"  >
            <TabPane :label="item.cnname" :name="item.id" :key="item.id" v-for="item in ItemList"  ></TabPane>
        </Tabs>

       <DatePicker   @on-change="_dateTimeSpanChange"   v-else-if="ControlType=='DateTime'"  format="yyyy-MM-dd HH:mm:ss"   type="datetimerange" placement="bottom-start" placeholder="Select date" style="width: 350px"></DatePicker>

        <input  v-else class="ivu-input" type="text"   :value="val" @blur="_onchange($event.target.value)"  @input="_onchange($event.target.value)"   :placeholder="placeholder"/> 
         
    </div>
    </div>
       
</template>

<script>
import InputTag from './../inputtag/inputtag.vue'
import radioSelector from './../multi/radioselector.vue'
import { util } from "ak-lib-sys/src"

const _conDict = {
       configList:1 ,
       radio:1,
       Text:1 
};

export default {
    name:"col-place",
     components: {
        "input-tag":InputTag,
        "radio-selector":radioSelector
    },
    data(){
          return {
                ColVmObj: {}
          };
    },
    props:["ControlType","isError","isRequire","ErrorMesg","val","onChange","placeholder","displayName","ColName","Url","ItemList"],
    methods:{

        _dateTimeSpanChange(_val){
            let  _res = "";
              const _list = _val ;
             if(_list && _list.length){
                 debugger ;
                 const  _listN = _list.map(a =>  { return util.getTimeCodeFromDate(new Date(a))} );
                  _res = _listN.join("-");
             }
             this.onChange(this,_res);
        },

         _onchange(_val){
             
             this.onChange(this,_val);
         }

     },
     created(){
          
     }
}
</script>

<style>
.ivu-form-item-error .acs-tag{
    border: 1px solid #f30;
}
.acs-tag   .new-tag{
        width: 100% !important;
    }
</style>



