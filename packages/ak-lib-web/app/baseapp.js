var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class BaseApp {
    constructor() {
        this.Name = "";
        this.Title = "";
        this.Doc = "";
        this.Icon = "";
        this.Order = 0;
    }
    useContext(pre) {
        return __awaiter(this, void 0, void 0, function* () {
            return pre;
        });
    }
    getMenus() {
        return this.MenuList;
    }
    getPlugs() {
        return this.PlugDict;
    }
}
