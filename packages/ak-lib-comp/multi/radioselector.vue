<template>
<div>
    <RadioGroup v-model="datavalue" @on-change="onChange">

        <Radio  :key="item.id+ index"  v-for="(item,index) in ItemList"   :label="item.id">
           
            <span>{{item.cnname}}</span>
        </Radio>
       
    </RadioGroup>
    
</div>
</template>
<script>
//import  * as net from './../../requests/net'
import   { core,net } from "ak-lib-sys";
    export default {
        props:["onChange","Val","Url","ItemList"],
        data () {
            return {
               // Items: this.ItemList ,
                datavalue:""
            }
        },
      methods :{
      
      },
         mounted () {
               if(this.Url){
            // debugger ;
                net.get({
                    url:this.Url,
                    params:""
                }).then(a=>{
                     this.ItemList = a.rooms ;
                    
                     if(!this.Val)
                     this.datavalue = this.ItemList[0].cnname;
                     else
                     this.datavalue = this.Val ;
                     

                });
               }
         }
    }
</script>
