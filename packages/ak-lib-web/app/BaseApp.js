export class BaseApp {
    constructor() {
        this.Name = "";
        this.Title = "";
        this.Doc = "";
        this.Icon = "";
    }
    getMenus() {
        return this.MenuList;
    }
    getPlugs() {
        return this.PlugDict;
    }
}
