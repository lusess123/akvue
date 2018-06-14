import Util from '@/libs/util';

import Vue from 'vue';

import {
    core
} from 'ak-lib-sys/src'

const _menuMap = (sMenu) => {
    return {
        title: sMenu.text,
        name: sMenu.name,
        params: sMenu.params,
        icon: sMenu.icon ? sMenu.icon.replace(/fa-/i, "") : "circle-thin",
        children: (sMenu.children && sMenu.children.length > 0) ?
            sMenu.children.map((child) => {
                return _menuMap(child);
            }) : undefined
    }

}

const app = {
    state: {
        themeColor: "b",
        cachePage: [],
        lang: '',
        isFullScreen: false,
        openedSubmenuArr: [], // 要展开的菜单数组
        menuTheme: 'dark', // 主题
        //themeColor: '',
        // pageOpenedList: [{
        //     title: '数仓管理',
        //     path: '/dwh',
        //     name: 'dwh.dash'
        // }],
        currentControllName: '',
        currentPageName: '',
        currentPath: [
            // {
            //     title: '数仓管理',
            //     path: '/dwh',
            //     name: 'dwh.dash'
            // }
        ], // 面包屑数组
        menuList: [],
        routers: [
           
        ],
        tagsList: [],
        messageCount: 0,
        dontCache: ['text-editor', 'artical-publish'] // 在这里定义你不想要缓存的页面的name属性值(参见路由配置router.js)
    },
    mutations: {
        setTagsList(state, list) {
            state.tagsList.push(...list);
        },
        updateMenulist(state) {
            //let accessCode = parseInt(Cookies.get('access'));
            // let menuList = [];
            //目前菜单只有两级
            // debugger;
            if (state.menuList.length == 0) {
                const ss = window.sessionStorage;
                if (ss) {
                    const _menus = sessionStorage.getItem('menus_session_key');
                    if (_menus) {
                        const _menuObjects = core.parseJson(_menus);
                        if (_menuObjects) {
                            const menuList = _menuObjects.map(m => {
                                return _menuMap(m);

                            })

                            state.menuList = menuList;
                        }


                    }
                }



            }
        },

        changeMenuList(state, menus) {
            //alert("menu");
            debugger;
            const menuList = menus.map(m => {
                return _menuMap(m);

            })

            state.menuList = menuList;
        },

        changeMenuTheme(state, theme) {
            state.menuTheme = theme;
        },
        changeMainTheme(state, mainTheme) {
            state.themeColor = mainTheme;
        },
        addOpenSubmenu(state, name) {
            let hasThisName = false;
            let isEmpty = false;
            if (name.length === 0) {
                isEmpty = true;
            }
            if (state.openedSubmenuArr.indexOf(name) > -1) {
                hasThisName = true;
            }
            if (!hasThisName && !isEmpty) {
                state.openedSubmenuArr.push(name);
            }
        },
        closePage(state, name) {
            state.cachePage.forEach((item, index) => {
                if (item === name) {
                    state.cachePage.splice(index, 1);
                }
            });
        },
        initCachepage(state) {
            if (localStorage.cachePage) {
                state.cachePage = JSON.parse(localStorage.cachePage);
            }
        },
        removeTag(state, name) {
            state.pageOpenedList.map((item, index) => {
                if (item.name === name) {
                    state.pageOpenedList.splice(index, 1);
                }
            });
        },
        pageOpenedList(state, get) {
            debugger;
            let openedPage = state.pageOpenedList[get.index];
            if (get.argu) {
                openedPage.argu = get.argu;
            }
            if (get.query) {
                openedPage.query = get.query;
            }
            state.pageOpenedList.splice(get.index, 1, openedPage);
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        clearAllTags(state) {
            state.pageOpenedList.splice(1);
            state.cachePage.length = 0;
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        clearOtherTags(state, vm) {
            let currentName = vm.$route.name;
            let currentIndex = 0;
            state.pageOpenedList.forEach((item, index) => {
                if (item.name === currentName) {
                    currentIndex = index;
                }
            });
            if (currentIndex === 0) {
                state.pageOpenedList.splice(1);
            } else {
                state.pageOpenedList.splice(currentIndex + 1);
                state.pageOpenedList.splice(1, currentIndex - 1);
            }
            let newCachepage = state.cachePage.filter(item => {
                return item === currentName;
            });
            state.cachePage = newCachepage;
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        setOpenedList(state) {
            // state.pageOpenedList = localStorage.pageOpenedList ? JSON.parse(localStorage.pageOpenedList) : [otherRouter.children[0]];
        },
        setCurrentPath(state, pathArr) {
            state.currentPath = pathArr;
        },
        setCurrentPageName(state, name) {
            state.currentPageName = name;
        },
        setAvator(state, path) {
            localStorage.avatorImgPath = path;
        },
        switchLang(state, lang) {
            state.lang = lang;
            Vue.config.lang = lang;
        },
        clearOpenedSubmenu(state) {
            state.openedSubmenuArr.length = 0;
        },
        setMessageCount(state, count) {
            state.messageCount = count;
        },
        increateTag(state, tagObj) {
            if (!Util.oneOf(tagObj.name, state.dontCache)) {
                state.cachePage.push(tagObj.name);
                localStorage.cachePage = JSON.stringify(state.cachePage);
            }
            state.pageOpenedList.push(tagObj);
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        }
    }
};

export default app;