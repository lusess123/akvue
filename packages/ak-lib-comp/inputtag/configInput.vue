
<template>
   <div class="ivu-form-item-content">
        <div class="ivu-input-wrapper ">
                                       <input-tag 
                                       :on-change="on-change" 
                                       class="acs-tag" 
                                       :tags="tags"
                                       :placeholder="(placeholder?placeholder:'输入后请按回车...')">
                                       </input-tag>
                                       </div>
                                    </div>
</template>

<script>
 import InputTag from './inputtag.vue'

export default {
    components: {
       // Panel,
        "input-tag":InputTag
    },
    props:["placeholder","on-change","tags"]


      
}
</script>

<style>
.ivu-form-item-error .acs-tag{
    border: 1px solid #f30;
}
</style>

