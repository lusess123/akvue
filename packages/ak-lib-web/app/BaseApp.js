var BaseApp = /** @class */ (function () {
    function BaseApp() {
        this.Name = "";
        this.Title = "";
        this.Doc = "";
        this.Icon = "";
    }
    BaseApp.prototype.getMenus = function () {
        return this.MenuList;
    };
    BaseApp.prototype.getPlugs = function () {
        return this.PlugDict;
    };
    return BaseApp;
}());
export { BaseApp };
