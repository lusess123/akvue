import Vue from 'vue';
import VueRouter from 'vue-router';
import {routers} from './router';
import route from './route';

Vue.use(VueRouter);

// 路由配置
const RouterConfig = {
    // mode: 'history',
    routes: [route]
};

export const router = new VueRouter(RouterConfig);

