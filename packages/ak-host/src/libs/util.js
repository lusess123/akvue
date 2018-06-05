import axios from 'axios';
import env from '../../build/env';
import semver from 'semver';
import packjson from '../../package.json';
import { debug } from 'util';
import {dom as domFile} from 'sys';
//import  * as dwhcore from "./../requests/dwh.core";

let util = {

};
util.title = function (title) {
    title = title || 'iView admin';
    window.document.title = title;
};

const ajaxUrl = env === 'development'
    ? 'http://127.0.0.1:8888'
    : env === 'production'
        ? 'https://www.url.com'
        : 'https://debug.url.com';

util.ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 30000
});

util.inOf = function (arr, targetArr) {
    let res = true;
    arr.forEach(item => {
        if (targetArr.indexOf(item) < 0) {
            res = false;
        }
    });
    return res;
};

util.oneOf = function (ele, targetArr) {
    if (targetArr.indexOf(ele) >= 0) {
        return true;
    } else {
        return false;
    }
};

util.showThisRoute = function (itAccess, currentAccess) {
    if (typeof itAccess === 'object' && Array.isArray(itAccess)) {
        return util.oneOf(currentAccess, itAccess);
    } else {
        return itAccess === currentAccess;
    }
};

util.getRouterObjByName = function (routers, name) {
    if (!name || !routers || !routers.length) {
        return null;
    }
    // debugger;
    let routerObj = null;
    for (let item of routers) {
        if (item.name === name) {
            return item;
        }
        routerObj = util.getRouterObjByName(item.children, name);
        if (routerObj) {
            return routerObj;
        }
    }
    return null;
};

util.handleTitle = function (vm, item) {
    if (typeof item.title === 'object') {
        return vm.$t(item.title.i18n);
    } else {
        return item.title;
    }
};

util.setCurrentPath = (vm,name,rootTitle = "")=>{
    //debugger;
    //alert(domFile.getCookie("orgid"));
   // console.log('当前组织机构是： '+ dwhcore.getOrg());
    //console.log(dwhcore.getOrg());
   // i
   // rootTitle = dwhcore.getOrg() ?dwhcore.getOrg().cnname:"";
    let title = '';
    let leafObj ;
    let rootObj ;
    let isOtherRouter = true;
    vm.$store.state.app.menuList.every(
        (menu)=>{

               if(menu.name == name){
                isOtherRouter = false ;
                title = menu.title;
                leafObj = menu ;
                return flase;
                //break;
               }
               else{
                    if(menu.children && menu.children.length > 0){
                        menu.children.every((m)=>{
                                if(m.name == name){
                                    isOtherRouter = false ;
                                    title = menu.title;
                                    leafObj = m ;
                                    rootObj = menu;
                                    return false ;
                                }
                                return true;
                        })
                        //if(!isOtherRouter) return true ; ;
                        return isOtherRouter ;
                    }

               }

        }
    );
    let _res ;
    if(!isOtherRouter){
        _res = [
            {
                title: rootTitle,
                path: '/door',
                name: 'dwh.dash'
            },{
                title:rootObj.title,
                path:    _getVmStoreRouterPath(vm,rootObj),
                name:rootObj.name
            },{
                title:leafObj.title,
                path: _getVmStoreRouterPath(vm,leafObj),
                name:leafObj.name
            }
        ];
    }
    else{
        _res = [
            {
                title: rootTitle,
                path: '/door',
                name: 'dwh.dash'
            }
        ] ;
    }
    vm.$store.commit('setCurrentPath', _res);

    return _res ;
}

const _getVmStoreRouterPath = function (vm ,obj){
   if(!obj.path){
   let _res = _getChildrenData(
        vm.$store.state.app.routers,
        function(m){
            if(m && obj){
            return m.name == obj.name
            }
        }
    );
    if(_res) return _res.path ; else return "";
   }
   return obj.path ;
}

const _getChildrenData  = function (list ,fun)
{
        let res ;
        if(list.length > 0 ){

            list.every((item)=>{
                const _ff = fun(item);
                 if(_ff){
                     res = item ;
                     return false ;
                 }else{
                     if(item &&item.children ){
                         res = _getChildrenData(item.children,fun);
                         //if(res) return false;
                         return !res ;
                     }
                     return true ;
                 }

            })
        }
        return res ;
}



util.setCurrentPath1 = function (vm, name) {
    //debugger;
    let title = '';
    let isOtherRouter = false;
    vm.$store.state.app.routers.forEach(item => {
        if (item.children.length === 1) {
            if (item.children[0].name === name) {
                title = util.handleTitle(vm, item);
                if (item.name === 'otherRouter') {
                    isOtherRouter = true;
                }
            }
        } else {
            item.children.forEach(child => {
                if (child.name === name) {
                    title = util.handleTitle(vm, child);
                    if (item.name === 'otherRouter') {
                        isOtherRouter = true;
                    }
                }
            });
        }
    });
    let currentPathArr = [];
    if (name === 'home_index') {
        currentPathArr = [
            {
                title: util.handleTitle(vm, util.getRouterObjByName(vm.$store.state.app.routers, 'dwh.dash')),
                path: '/dashboard',
                name: 'dwh.dash'
            }
        ];
    } else if ((name.indexOf('_index') >= 0 || isOtherRouter) && name !== 'home_index') {
        currentPathArr = [
            {
                title: util.handleTitle(vm, util.getRouterObjByName(vm.$store.state.app.routers, 'dwh.dash')),
                path: '/dashboard',
                name: 'dwh.dash'
            },
            {
                title: title,
                path: '',
                name: name
            }
        ];
    } else {
        let currentPathObj = vm.$store.state.app.routers.filter(item => {
            if (item.children.length <= 1) {
                return item.children[0].name === name;
            } else {
                let i = 0;
                let childArr = item.children;
                let len = childArr.length;
                while (i < len) {
                    if (childArr[i].name === name) {
                        return true;
                    }
                    i++;
                }
                return false;
            }
        })[0];
        if (currentPathObj.children.length <= 1 && currentPathObj.name === 'home') {
            currentPathArr = [
                {
                    title: '首页',
                    path: '/dwh',
                    name: 'dwh.dash'
                }
            ];
        } else if (currentPathObj.children.length <= 1 && currentPathObj.name !== 'home') {
            currentPathArr = [
                {
                    title: '首页',
                    path: '/dwh',
                    name: 'dwh.dash'
                },
                {
                    title: currentPathObj.title,
                    path: '/dwh',
                    name: name
                }
            ];
        } else {
            let childObj = currentPathObj.children.filter((child) => {
                return child.name === name;
            })[0];
            currentPathArr = [
                {
                    title: '首页',
                    path: '/dwh',
                    name: 'dwh.dash'
                },
                {
                    title: currentPathObj.title,
                    path: '',
                    name: currentPathObj.name
                },
                {
                    title: childObj.title,
                    path: currentPathObj.path + '/' + childObj.path,
                    name: name
                }
            ];
        }
    }
    vm.$store.commit('setCurrentPath', currentPathArr);

    return currentPathArr;
};

util.openNewPage = function (vm, name, argu, query) {
    let pageOpenedList = vm.$store.state.app.pageOpenedList;
    let openedPageLen = pageOpenedList.length;
    let i = 0;
    let tagHasOpened = false;
    while (i < openedPageLen) {
        if (name === pageOpenedList[i].name) { // 页面已经打开
            vm.$store.commit('pageOpenedList', {
                index: i,
                argu: argu,
                query: query
            });
            tagHasOpened = true;
            break;
        }
        i++;
    }
    if (!tagHasOpened) {
        let tag = vm.$store.state.app.tagsList.filter((item) => {
            if (item.children) {
                return name === item.children[0].name;
            } else {
                return name === item.name;
            }
        });
        tag = tag[0];
        if (tag) {
            tag = tag.children ? tag.children[0] : tag;
            if (argu) {
                tag.argu = argu;
            }
            if (query) {
                tag.query = query;
            }
            vm.$store.commit('increateTag', tag);
        }
    }
    vm.$store.commit('setCurrentPageName', name);
};

util.toDefaultPage = function (routers, name, route, next) {
    let len = routers.length;
    let i = 0;
    let notHandle = true;
    while (i < len) {
        if (routers[i].name === name && routers[i].children && routers[i].redirect === undefined) {
            route.replace({
                name: routers[i].children[0].name
            });
            notHandle = false;
            next();
            break;
        }
        i++;
    }
    if (notHandle) {
        next();
    }
};

util.fullscreenEvent = function (vm) {
    vm.$store.commit('initCachepage');
    // 权限菜单过滤相关
    vm.$store.commit('updateMenulist');
    // 全屏相关
};

util.checkUpdate = function (vm) {
    axios.get('https://api.github.com/repos/iview/iview-admin/releases/latest').then(res => {
        let version = res.data.tag_name;
        vm.$Notice.config({
            duration: 0
        });
        if (semver.lt(packjson.version, version)) {
            vm.$Notice.info({
                title: 'iview-admin更新啦',
                desc: '<p>iView-admin更新到了' + version + '了，去看看有哪些变化吧</p><a style="font-size:13px;" href="https://github.com/iview/iview-admin/releases" target="_blank">前往github查看</a>'
            });
        }
    });
};

export default util;
