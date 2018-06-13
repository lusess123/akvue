var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import appget from './appget';
import rxjs from 'rxjs';
export default (obj) => __awaiter(this, void 0, void 0, function* () {
    // const props : any[] = appget().map(app => {     return (obj, callback) => {
    //     app             .useContext(obj)             .then(callback)     }; });
    //debugger;
    // return props[0](obj).then(a => {     return props[1](a).then(b => { return
    // props[2](b)     }) })   return callPromise(props,obj);
    const _apps = appget().map(a => a.useContext);
    return new Promise(
    // // callPost(props, obj, 0, success)
    _sconFun(_apps, obj)
    //reduceFun(_apps,obj)
    );
    //return    await (async ()=>{ return  _sconFun(obj) })();
    //    const _calls = appget().map(app =>  app.useContext );
    //    return  await callPromise(_calls,obj)
});
const rxjsCall = (obj, fun) => {
    let _obj = obj;
    const _props = appget().map(app => {
        return new Promise((successFun) => {
            app
                .useContext(_obj)
                .then(_newobj => {
                _obj = _newobj;
                successFun(_newobj);
            });
        });
    });
    rxjs
        .Observable
        .from(_props)
        .subscribe(a => fun(a));
};
function callPromise(calls, obj, i = 0) {
    return __awaiter(this, void 0, void 0, function* () {
        if (i < calls.length - 1) {
            const a = yield calls[i](obj);
            const j = i + 1;
            return yield callPromise(calls, a, j);
        }
        else {
            return yield calls[i](obj);
        }
    });
}
export const fff = (obj) => {
    const props = appget().map(app => {
        return (a, callback) => {
            app
                .useContext(a)
                .then(callback);
        };
    });
    return new Promise((sucess) => {
        callPost(props, obj, 0, sucess);
    });
};
function callPost(calls, obj, i, callback) {
    if (i < calls.length - 1) {
        calls[i](obj, function (a) {
            const j = i + 1;
            callPost(calls, a, j, callback);
        });
    }
    else {
        return calls[i](obj, callback);
    }
}
const _sconFun = (apps, obj) => callback => {
    const _$ = rxjs.Observable.from;
    return _$(apps).mergeScan((acc, fun) => _$(fun(acc)), obj).last().subscribe(a => callback(a));
};
const reduceFun = (apps, obj) => callback => {
    return apps.reduce((prev, cure) => __awaiter(this, void 0, void 0, function* () { return cure(yield prev); }), obj).then(a => callback(a));
};
