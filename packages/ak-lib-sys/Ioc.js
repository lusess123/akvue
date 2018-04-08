export function applyNew(ctor, args) {
    if (args && args.length > 0) {
        return new ctor(...args);
        // }
    }
    else {
        return new ctor();
    }
}
export class Ioc {
    constructor() {
        this.fInstanceClassList = {};
        this.fInstanceSrcList = {};
    }
    static Current() {
        return this.fIoc;
    }
    IocModel() {
        return this.fInstanceClassList;
    }
    IocSrcModel() {
        return this.fInstanceSrcList;
    }
    RegisterType(regName, baseType, instaceType, customData, meta) {
        // var _f = typeof (TTo);
        // alert(baseType.toString());
        regName = regName.toUpperCase();
        var _stre = Ioc.fGetFunName(baseType);
        var _meta = Object.assign({
            RegName: regName,
            BaseType: baseType,
            InstanceType: instaceType,
            customData: customData
        }, meta ? meta : {});
        this.fInstanceClassList[_stre + "_" + regName] = _meta;
    }
    RegisterTypeSrc(regName, baseType, src) {
        regName = regName.toUpperCase();
        var _stre = Ioc.fGetFunName(baseType);
        var _meta = { RegName: regName, BaseType: baseType, InstanceType: src };
        this.fInstanceSrcList[_stre + "_" + regName] = _meta;
    }
    FetchAsyInstance(regName, baseType, fun, error, config) {
        this.fFetchAsyInstance(regName, baseType, fun, error, config);
    }
    fFetchAsyInstance(regName, baseType, fun, error, config) {
        regName = regName.toUpperCase();
        var _obj = this.FetchInstance(regName, baseType, config ? { Args: config.Args } : null);
        if (!_obj) {
            var _stre = Ioc.fGetFunName(baseType);
            var _meta = this.fInstanceSrcList[_stre + "_" + regName];
            if (_meta) {
                window["require"]([_meta.InstanceType], (file) => {
                    var obj = this.fFetchInstance(regName, baseType, config && config.Args ? { Args: config.Args } : null);
                    fun(obj);
                }, (a) => {
                    console.warn(a);
                    error(_meta.InstanceType + "      " + a);
                });
            }
            else {
                console.log("注册名为 " + regName + "的类 " + _stre + "未注册 或者 不存在 ");
                var _isNull = false;
                if (config) {
                    if (config.NullFun) {
                        config.NullFun(regName, _stre);
                    }
                    else {
                        _isNull = true;
                    }
                }
                else {
                    _isNull = true;
                }
                if (_isNull) {
                    fun(null);
                }
                // error(null);
            }
        }
        else {
            return fun(_obj);
        }
    }
    fFetchInstance(regName, baseType, config) {
        regName = regName.toUpperCase();
        var _stre = Ioc.fGetFunName(baseType);
        var _meta = this.fInstanceClassList[_stre + "_" + regName];
        if (_meta) {
            let _fun = _meta.InstanceType;
            var _f = config && config.Args ? applyNew(_fun, config.Args) : new _meta.InstanceType();
            return _f;
        }
        else {
            console.log("注册名为: " + regName + "  类型为" + baseType + "没有注册");
            return null;
        }
    }
    FetchInstance(regName, baseType, config) {
        regName = regName.toUpperCase();
        return this.fFetchInstance(regName, baseType, config);
    }
    static fGetFunName(s) {
        if (typeof s == "string")
            return s;
        s = s.toString();
        var m = s.match(/function\s+([^(]+)/);
        if (m)
            return m[1];
        else
            return "";
    }
    GetTypeList(baseType) {
        var _list = new Array();
        var _stre = Ioc.fGetFunName(baseType);
        for (var _m in this.fInstanceClassList) {
            var _strM = _m;
            if (_strM.indexOf(_stre + "_") == 0) {
                var _col = this.fInstanceClassList[_strM];
                _list.push(_col);
            }
        }
        for (var _m in this.fInstanceSrcList) {
            var _strM = _m;
            if (_strM.indexOf(_stre + "_") == 0) {
                if (!this.fInstanceClassList[_strM]) {
                    var _col = this.fInstanceSrcList[_strM];
                    _list.push(_col);
                }
            }
        }
        return _list;
    }
}
Ioc.fIoc = new Ioc();
export function PlugIn(plugMeta) {
    return function (constructor) {
        Ioc.Current().RegisterType(plugMeta.RegName, plugMeta.BaseType, constructor, undefined, {
            Author: plugMeta.Author,
            CreateDate: plugMeta.CreateDate,
            Message: plugMeta.Doc
        });
    };
}
export function getType(baseClass, name) {
    const _list = Ioc.Current().GetTypeList("vue");
    if (_list.length > 0) {
        const _num = _list.findIndex(a => a.RegName.toLocaleLowerCase() == name.toLocaleLowerCase());
        if (_num >= 0) {
            return _list[_num].InstanceType;
        }
    }
    return null;
}
