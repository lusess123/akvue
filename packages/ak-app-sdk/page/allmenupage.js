var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ioc, vue } from "ak-lib-sys";
import { BasePage } from "ak-lib-web/basepage";
import event from "ak-lib-sys/event";
let AllMenuPage = class AllMenuPage extends BasePage {
    constructor() {
        super(...arguments);
        this.Title = "AllMenuPage";
    }
    loadPage() { }
    getAppInfo() {
        const _cml = ioc
            .Ioc
            .Current()
            .GetTypeList("IApp");
        return _cml.map(info => {
            return ioc
                .Ioc
                .Current()
                .FetchInstance(info.RegName, "IApp");
        });
        // const _app = _apps.filter(a => a.Name.toUpperCase() ==
        // this.AppName.toUpperCase()); _app[0].getMenus()  return _apps;
    }
    onSelectChange(nodes) {
        //debugger;
        if (nodes[0].obj && nodes[0].obj.menu.name) {
            event
                .GetAppEvent()
                .emit("global-main-mounted", nodes[0].obj._menus, nodes[0].obj.menu.name);
        }
        //     event.GetAppEvent().emit("openurl", {         path:
        // nodes[0].obj.menu.name     }); }  alert(nodes[0].obj);
    }
    getMenuTreeObj() {
        const _apps = this.getAppInfo();
        let _nodes = [];
        if (_apps && _apps.length > 0) {
            _apps.forEach(_app => {
                let _node = {
                    title: _app.Title,
                    //expand: true,
                    children: []
                };
                const _menus = _app.getMenus();
                const _menusNodes = _menus.forEach(a => {
                    _node
                        .children
                        .push(this.mapTree(a, _menus));
                });
                _nodes.push(_node);
            });
        }
        return _nodes;
    }
    mapTree(menu, _menus) {
        const _isLeaf = menu.name && (!menu.children || menu.children.length == 0);
        let _node = {
            title: menu.text + "   " + (_isLeaf
                ? menu.name
                : ""),
            expand: true,
            render: _isLeaf
                ? (h, obj) => {
                    return vue.tpl(h)(`
                    <span> 
                    <Button  size="small"  shape="circle"   @click="vm.click">{{vm.title}}{{vm.url}}</Button>
                    <Button  size="small"  shape="circle" icon="android-open" @click="vm.newclick"></Button>
                    </span>

                     `, {
                        title: menu.text,
                        url: menu.name,
                        click: (a) => {
                            event
                                .GetAppEvent()
                                .emit("global-main-mounted", _menus, menu.name);
                        },
                        newclick: (a) => {
                            event
                                .GetAppEvent()
                                .emit("openurl", {
                                path: menu.name + "$win",
                                nourl: true
                            });
                        }
                    });
                }
                : undefined,
            //obj:menu.name,
            obj: {
                _menus,
                menu
            },
            children: menu.children
                ? menu
                    .children
                    .map(a => {
                    return this.mapTree(a, _menus);
                })
                : undefined
        };
        return _node;
    }
};
AllMenuPage = __decorate([
    vue.com(`<div>
<Card>
<h3 slot="title">所有的菜单</h3>
<Tree @on-select-change="vm.onSelectChange($event)" :data="vm.getMenuTreeObj()"></Tree>
</Card>
</div>`),
    ioc.PlugIn({ RegName: "AllMenuPage", BaseType: "IPage", CreateDate: "2018-06-05", Doc: "AllMenuPage页面插件" })
], AllMenuPage);
export { AllMenuPage };
