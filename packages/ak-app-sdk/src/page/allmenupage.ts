import {core, ioc, vue, util} from "ak-lib-sys";
import {BasePage} from "ak-lib-web/basepage";

import {IApp} from "ak-lib-web/app/IApp";
import {IMenu} from "ak-lib-web/app/IMenu";
import {ITreeNode} from './../lib/tree'

@vue.com(`<div><Card><h3 slot="title">所有的菜单</h3><Tree :data="vm.getMenuTreeObj()"></Tree></Card></div>`)
@ioc.PlugIn({RegName: "AllMenuPage", BaseType: "IPage", CreateDate: "2018-06-05", Doc: "AllMenuPage页面插件"})
export class AllMenuPage extends BasePage {

    public Title : string = "AllMenuPage";
    protected loadPage() {}

    public getAppInfo() : IApp[] {

        const _cml = ioc
            .Ioc
            .Current()
            .GetTypeList("IApp");

        return _cml.map(info => {

            return ioc
                .Ioc
                .Current()
                .FetchInstance < IApp > (info.RegName, "IApp");

        })

        // const _app = _apps.filter(a => a.Name.toUpperCase() ==
        // this.AppName.toUpperCase()); _app[0].getMenus()  return _apps;

    }

    public getMenuTreeObj() {
        const _apps : IApp[] = this.getAppInfo();
        let _nodes : ITreeNode[] = [];
        if (_apps && _apps.length > 0) {

            _apps.forEach(_app => {
                let _node : ITreeNode = {
                    title: _app.Title,
                    children: []
                }
                const _menus = _app.getMenus();
                const _menusNodes = _menus.forEach(a => {
                    _node
                        .children
                        .push(this.mapTree(a));
                });
                _nodes.push(_node);

            });

        }
        return _nodes;
    }

    public mapTree(menu : IMenu) : ITreeNode {

        let _node: ITreeNode = {
            title: menu.text,
            expand: true,
            children: menu.children
                ? menu
                    .children
                    .map(a => {
                        return this.mapTree(a);
                    })
                : undefined
        };

        return _node;
    }

}
