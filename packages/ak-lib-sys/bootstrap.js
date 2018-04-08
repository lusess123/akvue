var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const loadSys = function () {
    return __awaiter(this, void 0, void 0, function* () {
        //await loadListForm();
        // return new Promise((a, b) => {
        //     //     require.ensure([],function (require) {
        //     //         require("app");
        //     //         require("app/listpage/ListForm");
        //     //          a();
        //     //  });
        // });
        return Promise.all(_BootStrapTasks);
    });
};
let _BootStrapTasks = [];
export const addTask = (p) => {
    _BootStrapTasks.push(p);
};
