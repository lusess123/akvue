<template>
<Card>
   <p slot="title" @click="expand"><Icon :type="icon"></Icon></p>
   
</Card>
</template>

<script lang="ts">
import lvfrom from "./form.vue"
import icon from "./../iview/icon.vue"
export default {
        components: { 
            lvfrom
        },
        data (){
              return {
                  IsExpand:false 
              };
        },
        computed :{
              icon (){
                // return "ios-plus";
                 return "ios-"+ (this.IsExpand?"plus":"minus") ;
             }
        },
        // props:{
        //     IsExpand:{
        //         type :Boolean,
        //         default: false
        //     }
        // },

        methods: {
            expand(){
                this.IsExpand = ! this.IsExpand ;
            }
        }
    
}
</script>

<style>

</style>
