var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import appget from './appget';
export default (obj) => __awaiter(this, void 0, void 0, function* () {
    const props = appget().map(app => {
        return app.useContext;
    });
    return props[0](obj).then(a => {
        return props[1](a).then(b => {
            return props[2](b);
        });
    });
});
