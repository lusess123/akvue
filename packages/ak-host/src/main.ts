debugger;
import * as akvue from "./.akvue";
akvue;

import Vue from 'vue';
import iView from 'iview';
import {router} from './router';
import storeconfig from './store/config';
import App from './app.vue';
import '@/locale';
import 'iview/dist/styles/iview.css';
import VueI18n from 'vue-i18n';
//import  * as boot from "ak-lib-sys/bootstrap";
import {core} from "ak-lib-sys";
import event from "ak-lib-sys/event";
import * as a1 from "ak-lib-biz";
a1;
import useapp from "ak-lib-web/app/appuse";
//import  * as loader from "./boot";
import Vuex from 'vuex';

//import "font-awesome/less/font-awesome.less";
Vue.use(Vuex);



Vue.use(VueI18n);
Vue.use(iView);

const _obj = {
    el: '#app',
    router: router,
    //store: store,
    StoreConfig: storeconfig,
    render: h => h(App),
    data: {
        currentPageName: ''
    },
    mounted() {
        this.currentPageName = this.$route.name;
        // 显示打开的页面的列表
        this
            .$store
            .commit('setOpenedList');
        this
            .$store
            .commit('initCachepage');
        // 权限菜单过滤相关
        this
            .$store
            .commit('updateMenulist');

        event
            .GetAppEvent()
            .addListener("global-main-mounted", (menus, url) => {

                const ss = window.sessionStorage;
                if (ss) {
                    const _json = core.json(menus);
                    sessionStorage.setItem('menus_session_key', _json);
                }
                // alert(123);
                this
                    .$store
                    .commit('changeMenuList', menus);
                if (url) {
                    this
                        .$router
                        .push({path: url});
                }

            });

        event
            .GetAppEvent()
            .addListener("openurl", ({path, nourl}) => {
                if (!nourl) {
                    this
                        .$router
                        .push({path});
                }
            });

        // iview-admin检查更新 util.checkUpdate(this);
    },
    created() {}
}

useapp(_obj).then((a:any)=> {
    debugger;
    const _vuexConfig = a.StoreConfig;
    a.StoreConfig = undefined ;
    a.store =  new Vuex.Store(_vuexConfig);

    new Vue(a);
});

//require('@/assets/font-awesome/css/font-awesome.css')
