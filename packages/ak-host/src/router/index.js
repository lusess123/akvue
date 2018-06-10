import Vue from 'vue';
import VueRouter from 'vue-router';
import   * as route from './route';
import { setGlobRoute } from 'ak-lib-sys/vue'
import { core} from 'ak-lib-sys'

Vue.use(VueRouter);
console.log([route.MainRoutes , ...route.RootRoutes]);
// 路由配置
const RouterConfig = {
    // mode: 'history',
    routes: [route.MainRoutes , ...route.RootRoutes]
};

 const router1 = new VueRouter(RouterConfig);

 setGlobRoute(router1);

 export const router = router1;

