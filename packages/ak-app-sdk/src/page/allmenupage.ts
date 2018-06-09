import {core, ioc, vue, util} from "ak-lib-sys";
import {BasePage} from "ak-lib-web/basepage";

import {IApp} from "ak-lib-web/app/iapp";
import {IMenu} from "ak-lib-web/app/imenu";
import {ITreeNode} from './../lib/tree'
import event from "ak-lib-sys/event";
import getapps from "ak-lib-web/app/appget";
@vue.com(`<div>
<Card>
<h3 slot="title">所有的菜单</h3>
<Tree @on-select-change="vm.onSelectChange($event)" :data="vm.getMenuTreeObj()"></Tree>
</Card>
</div>`)
@ioc.PlugIn({RegName: "AllMenuPage", BaseType: "IPage", CreateDate: "2018-06-05", Doc: "AllMenuPage页面插件"})
export class AllMenuPage extends BasePage {

    public Title : string = "AllMenuPage";
    protected loadPage() {}

    public getAppInfo() : IApp[] {

        return getapps();

        // const _app = _apps.filter(a => a.Name.toUpperCase() ==
        // this.AppName.toUpperCase()); _app[0].getMenus()  return _apps;

    }

    public onSelectChange(nodes : ITreeNode[])
    {
        //debugger;
        if (nodes[0].obj && nodes[0].obj.menu.name) {
            event
                .GetAppEvent()
                .emit("global-main-mounted", nodes[0].obj._menus, nodes[0].obj.menu.name);
        }

        //     event.GetAppEvent().emit("openurl", {         path:
        // nodes[0].obj.menu.name     }); }  alert(nodes[0].obj);

    }

    public getMenuTreeObj() {
        const _apps : IApp[] = this.getAppInfo();
        let _nodes : ITreeNode[] = [];
        if (_apps && _apps.length > 0) {

            _apps.forEach(_app => {
                let _node : ITreeNode = {
                    title: _app.Title,
                    //expand: true,
                    children: []
                }
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

    public mapTree(menu : IMenu, _menus
        ?) : ITreeNode {

        const _isLeaf = menu.name && (!menu.children || menu.children.length == 0);

        let _node: ITreeNode = {
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

}
