

import { core, ioc, vue } from "ak-lib-sys";
import { BaseCom, IBaseComConfig } from "ak-lib-sys/com/basecom";

export interface IItem
{
    cnname :string ;
    id:string ;
}


export interface ITabSelectorComConfig extends IBaseComConfig {
    ItemList
}

@ioc.PlugIn({ RegName: "TabSelectorCol", BaseType: "BaseCom", CreateDate: "2018-01-31", Doc: "TabSelector组件插件" })

@vue.com(`<div>
<Tabs value="name1">
<TabPane label="标签一" name="name1">标签一的内容</TabPane>
<TabPane label="标签二" name="name2">标签二的内容</TabPane>
<TabPane label="标签三" name="name3">标签三的内容</TabPane>
</Tabs></div>`)
export class TabSelectorCom extends BaseCom {

    constructor(config?: ITabSelectorComConfig) {
        super(config);
    }

}
