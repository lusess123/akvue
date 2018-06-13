<template>

    <!-- <Icon :type="type" size="size"></Icon> -->
    <i  v-if="IsAwesome" :class="'fa '+type"  :style="{fontSize: px+'px'}"  ></i>
    <Icon v-else :type="type" :size="size"></Icon>
</template>

<script>
 import "font-awesome/less/font-awesome.less"
export default {
     props:["type","size"],
     computed:{
         IsAwesome(){
               return   this.type && this.type.indexOf("fa-") == 0 ;
        },
        px (){
                return this.size? this.size : 12 ;
        }
     }
}
</script>

<style>

</style>
