<template>
    <Breadcrumb>
        <BreadcrumbItem 
            v-for="(item,index) in currentPath" 
           
            :key="item.name"
        >
        <template v-if="index == 0 ">
             <div style="display:inline-block;padding:0 6px;">
                
              当前集群： <router-link :to='{name:"dwh.table.search"}'> {{ itemTitle(item) }}</router-link>
        <Dropdown trigger="click"  @on-visible-change="openMenu" @on-click="ddd">
            <a href="javascript:void(0)">
                <Icon :style="{marginTop: '-2px', verticalAlign: 'middle'}" color="#495060" :size="25" :type="'android-arrow-drop'+ (IsDown?'down':'up')"></Icon>
                
            </a>
            <DropdownMenu slot="list">
                <DropdownItem v-for="(_item, index) in themeList" :key="index" :name="_item.id"    :disabled="_item.id==getOrgId()">
                   <i class="fa fa-cube"> {{_item.cnname+ '(' + _item.name +')'}}</i>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </div>
        </template>
      
             <a v-else   :href="item.path">{{ itemTitle(item) }}</a>
       
       
        </BreadcrumbItem>
    </Breadcrumb>
</template>

<script>
import themeSwitch from './theme-switch/theme-switch.vue';
//import * as dwh from './../../controller/dwh'
import { dom  }from 'sys';
//import  * as dwhcore from './../../requests/dwh.core';
export default {
    name: 'breadcrumbNav',
    data(){
      return { 
          
          IsDown:true ,
          
          themeList: [
               
               
            
            ]
      }
    },
    components:{
        themeSwitch
    },
    props: {
        currentPath: Array
    },
    methods: {
        itemTitle (item) {
            if (typeof item.title === 'object') {
                return this.$t(item.title.i18n);
            } else {
                return item.title;
            }
        },

        openMenu(val){
           //alert(val);
           this.IsDown = !val ;
        },
        ddd(val){
            //alert(index);
           const _org =  this.themeList.find(a=>a.id == val );
           dwhcore.setOrg(_org);
           window.location.reload();
        },
        getOrgId(){
            const _org = dwhcore.getOrg();
            if(_org){
                return _org.id ;
            }
            else {
                return  "";
            }
        }
        
    },
    mounted(){
            //  dwh.asycGetClusters().then(a=>{

            //     this.themeList = a.clusters.data;
                
            //  });
        }
};
</script>

