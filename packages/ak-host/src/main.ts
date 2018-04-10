import Vue from 'vue';
import iView from 'iview';
import {router} from './router/index';
import {appRouter} from './router/router';
import store from './store';
import App from './app.vue';
import '@/locale';
import 'iview/dist/styles/iview.css';
//import './views/main-components/theme-switch/theme/g.css';
import VueI18n from 'vue-i18n';
//import util from '@/libs/util';
import  * as boot from "ak-lib-sys/bootstrap";
import {core} from "ak-lib-sys";
import  event from "ak-lib-sys/event";

const _url = "ak-app-dwh";

import  * as a1 from "ak-lib-biz"; a1 ;
//import  * as a2 from "ak-app-sdk"; a2 ;
import  * as loader from "./boot";
//import  * as dwh from "ak-app-dwh"; dwh ;

Vue.use(VueI18n);
Vue.use(iView);


//require('@/assets/font-awesome/css/font-awesome.css')

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    data: {
        currentPageName: ''
    },
    mounted () {
        this.currentPageName = this.$route.name;
        // 显示打开的页面的列表
        this.$store.commit('setOpenedList');
        this.$store.commit('initCachepage');
        // 权限菜单过滤相关
        this.$store.commit('updateMenulist');

        event.GetAppEvent().addListener("global-main-mounted",(menus,url)=>{
           // alert(123);
            this.$store.commit('changeMenuList',menus);
            if(url){
                this.$router.push({path:url});
            }
                   
        });

        event.GetAppEvent().on("openurl",({path,nourl})=>{
           if(!nourl){
            this.$router.push({path});
           }
        });
       

        // iview-admin检查更新
       // util.checkUpdate(this);
    },
    created () {

         const _p:any =  new Promise((a, b) => {
                   loader.load(a);
            });

         boot.addTask(_p);
        // boot.begin();

        let tagsList = [];
        appRouter.map((item) => {
            if (item.children.length <= 1) {
                tagsList.push(item.children[0]);
            } else {
                tagsList.push(...item.children);
            }
        });
        this.$store.commit('setTagsList', tagsList);
    }
});
