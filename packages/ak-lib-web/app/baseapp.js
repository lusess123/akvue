export class BaseApp {
    constructor() {
        this.Name = "";
        this.Title = "";
        this.Doc = "";
        this.Icon = "";
        this.Order = 0;
    }
    getMenus() {
        return this.MenuList;
    }
    getPlugs() {
        return this.PlugDict;
    }
}
