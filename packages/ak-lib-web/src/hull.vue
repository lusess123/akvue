<template>
    <div>
        <div v-if="hasPage(vm.PageDomObj)" :is="getPageVueName(vm.PageDomObj)" :vm="getPageVm()"></div>
        <Modal v-model="vm.IShow" :title="vm.WinPageDomObj?vm.WinPageDomObj.Title:''" transfer :width="95">
            <div v-if="hasPage(vm.WinPageDomObj)" :is="getPageVueName(vm.WinPageDomObj)" :vm="vm.WinPageDomObj"></div>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script lang="ts">
import { core, ioc, vue } from "ak-lib-sys/src";
import { IPage } from "./IPage";
import * as _defaultPage from "./defaultpage";
_defaultPage;

import * as bootstrap from "ak-lib-sys/src/bootstrap";
import * as vuePage from "./vue/vuepage"; vuePage;
import event from "ak-lib-sys/src/event";
// import * as _app from "app"; 
// _app ;
//import * as _appPage from "./../app/_AppPage.vue";
//_appPage;
//import * as _listPage from "./../app/ListPage.vue";
//_listPage;
//------------view
export default {
    props: {
        vm: {
            type: Object,
            default: () => {
                return new HullDom();
            }
        }
    },
    data() {
        return {
            pagename: "",
            p1: "",
            p2: "",
            p3: ""
        }
    },
    created() {
        // alert("hull create");
        bootstrap.loadSys().then(a => {
            // alert("loadDone");
            core.log(ioc.Ioc.Current().IocModel(), { sign: "app", info: "异步加载完了..." });
            this.init();

        });

        event.GetAppEvent().on("openurl", ({ path, nourl }) => {
            if (nourl) {
               // alert();
                if (path) {
                    const _len: string[] = path.split("/");
                    if (_len.length >= 3) {
                        const _pageName = _len[2];
                        const _p1 = _len.length > 3 ? _len[3] : null;
                        const _p2 = _len.length > 4 ? _len[4] : null;
                        const _p3 = _len.length > 5 ? _len[5] : null;

                        const _pas = this.getPageName(_pageName);
                         let _vm = core.cast<HullDom>(this.vm);
                        _vm.PageName = _pas.pageName;
                        _vm.P1 = _p1;
                        _vm.P2 = _p2;
                        _vm.P3 = _p3;
                        _vm.initPage(this.$store, _pas.isWin);

                    }

                }
            }
        });

        //debugger ;
        //this.Params = core.json(this.$route.params) ;

    },
    beforeDestroy(){
           //event.GetAppEvent().removeAllListeners("openurl");
    },
    watch: {
        "$route"() {
            //alert("路由变化");
            core.log("dddd", { sign: "app", info: "route" });
            this.init();
        }
    },
    methods: {
        init() {

            // _app.bootStrap();

            const _parms = this.$route.params ? this.$route.params : {};
            if (_parms) {
                let _vm = core.cast<HullDom>(this.vm);
                // _vm = {..._vm,...{
                const _pas = this.getPageName(_parms.pagename);

                _vm.PageName = _pas.pageName;
                _vm.P1 = _parms.p1;
                _vm.P2 = _parms.p2;
                _vm.P3 = _parms.p3;
                _vm.initPage(this.$store, _pas.isWin);

                // }
            };
        },

        getPageName(pageName: string) {
            if (pageName) {
                const _len = pageName.split("$")
                if (_len.length > 1) {
                    const _param = _len[1];
                    return { pageName: _len[0], isWin: _param.toUpperCase() == "WIN" };
                }
                return { pageName, isWin: false };
            }
            return { pageName: "", isWin: false };
        },
        getInfo() {
            return core.json(this.vm);
        },
        hasPage(pageObj) {
            // alert("hasPage");
            // debugger ;
            let _vm = core.cast<HullDom>(this.$props.vm);
            const _res = pageObj && (pageObj._VueObj || pageObj["constructor"]["_vueObj"]) ? true : false;
            // alert(_res);
            return _res;
        },
        getPageVueName(pageObj) {
            //alert(123);
            // debugger;
            let _vm = core.cast<HullDom>(this.vm);
            if (pageObj) {
                // debugger;
                //  _vm.PageDomObj
                // alert(_vm.PageDomObj["constructor"]["aa"]);
                return vue.registAndGetVueComName(pageObj);
            } else {
                return "div";
            }
        },
        getPageVm() {
            let _vm = core.cast<HullDom>(this.vm);
            return _vm.PageDomObj;
        }
    }
}
//--------------vm---------------
export class HullDom {
    PageName = "";
    P1 = "";
    P2 = "";
    P3 = "";
    PageDomObj: any = null;
    WinPageDomObj: any = null;
    IShow = false ;

    private setPageObj(isWin: boolean, page): any {
        return isWin ? (this.WinPageDomObj = page) : (this.PageDomObj = page);
    }

    private getPageObj(isWin: boolean): any {
        return isWin ? (this.WinPageDomObj) : (this.PageDomObj);
    }

    public initPage(store: any, isWin = false) {
        //debugger ;BooleanConstructor
        if (!isWin) {
            if (this.WinPageDomObj) {
                this.WinPageDomObj.dispose();
                this.WinPageDomObj = null;
            }
        }
        this.IShow = isWin ;
        if (this.PageDomObj && this.PageDomObj.dispose) {
            // this.PageDomObj.dispose();
        }
        // alert("after dispose");
        if (this.PageName) {
            const _page = ioc.Ioc.Current().FetchInstance<IPage>(this.PageName, "IPage", null);
            if (_page) {
                this.setPageObj(isWin, _page);
            } else {
                this.setPageObj(isWin, new _defaultPage.DefultPage());
                //core.cast<_defaultPage.DefultPage>(this.PageDomObj).OrgName = this.PageName;
            }
        } else {
            this.setPageObj(isWin, new _defaultPage.DefultPage());
            // this.PageDomObj = new _defaultPage.DefultPage();
        }
        document.title = isWin ? this.WinPageDomObj.Title : this.PageDomObj.Title;
        //alert(this.PageName);
        // this.PageDomObj.$store = this.$
        this.getPageObj(isWin).reset(this.PageName, this.P1, this.P2, this.P3);
        this.getPageObj(isWin).$store = store;
        this.getPageObj(isWin).sysloadPage();
        window["xxx"] = this.PageDomObj;
        //core.cast<_defaultPage.DefultPage>(this.PageDomObj).OrgName = this.PageName;
    }
}
</script>

<style>
.acs-mesg {
  box-shadow: 1px 2px 3px 1px #eee;
  position: fixed;
  opacity: 0.5;
  background: black;
  color: white;
  min-width: 150px;
  border: 2px solid red;
}
.borderError {
  border: 1px solid red;
}
</style>
