



export interface IClassMeta {
    RegName?: string;
    Author?: string;
    Message?: string;
    BaseType?: any;
    InstanceType?: any;
    customData?: any;
    CreateDate?: string;
}

export function applyNew(ctor, args: any[]) {
    if (args && args.length > 0) {

        return new ctor(...args);

        // }
    }
    else {
        return new ctor();
    }
}

export interface IErrorData {
    Path: string;
    error: string;
}
export interface IInstanceMeta {
    ClassMeta: IClassMeta;
    InstanceObj: any;
}

export interface IInstanceDict {
    [index: string]: IInstanceMeta;
}

export interface IClassList {
    [index: string]: IClassMeta;
}


export interface IIocAsy<T> {
    (obj: T): void;
}
export interface IRegisterTypeSrcConfig {
    NullFun?: INullFun;
    Args?: any[];
}
export interface INullFun {
    (regName: string, baseTypeStr: string): void
}

export interface IFetchConfig {
    Args?: any[];
}


export class Ioc {
    private static fIoc: Ioc = new Ioc();
    public static Current() {

        return this.fIoc;
    }

    public IocModel(): IClassList {
        return this.fInstanceClassList;
    }

    public IocSrcModel(): IClassList {
        return this.fInstanceSrcList;
    }

    private fInstanceClassList: IClassList = {};
    private fInstanceSrcList: IClassList = {};



    public RegisterType(regName: string, baseType, instaceType, customData?: any, meta?: IClassMeta) {
        // var _f = typeof (TTo);
        // alert(baseType.toString());
        regName = regName.toUpperCase();
        var _stre = Ioc.fGetFunName(baseType);
        var _meta: IClassMeta = {
            ...{
                RegName: regName,
                BaseType: baseType,
                InstanceType: instaceType,
                customData: customData
            }, ...meta ? meta : {}
        };
        this.fInstanceClassList[_stre + "_" + regName] = _meta;

    }

    public RegisterTypeSrc(regName: string, baseType, src: string) {
        regName = regName.toUpperCase();
        var _stre = Ioc.fGetFunName(baseType);
        var _meta: IClassMeta = { RegName: regName, BaseType: baseType, InstanceType: src };
        this.fInstanceSrcList[_stre + "_" + regName] = _meta;

    }



    public FetchAsyInstance<T>(regName: string, baseType, fun: IIocAsy<T>, error?: Function, config?: IRegisterTypeSrcConfig): void {
        this.fFetchAsyInstance<T>(regName, baseType, fun, error, config);
    }

    private fFetchAsyInstance<T>(regName: string, baseType, fun: IIocAsy<T>, error?: Function, config?: IRegisterTypeSrcConfig): void {
        regName = regName.toUpperCase();
        var _obj: T = this.FetchInstance<T>(regName, baseType, config ? { Args: config.Args } : null);
        if (!_obj) {
            var _stre = Ioc.fGetFunName(baseType);
            var _meta: IClassMeta = this.fInstanceSrcList[_stre + "_" + regName];
            if (_meta) {
                window["require"]([_meta.InstanceType], (file) => {
                    var obj: T = this.fFetchInstance<T>(regName, baseType, config && config.Args ? { Args: config.Args } : null);
                    fun(obj);
                }, (a) => {
                    console.warn(a);
                    error(_meta.InstanceType + "      " + a);
                });
            }
            else {
                console.log("注册名为 " + regName + "的类 " + _stre + "未注册 或者 不存在 ");
                var _isNull: boolean = false;
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

    private fFetchInstance<T>(regName: string, baseType, config?: IFetchConfig): T {
        regName = regName.toUpperCase();
        var _stre = Ioc.fGetFunName(baseType);
        var _meta: IClassMeta = this.fInstanceClassList[_stre + "_" + regName];



        if (_meta) {

            let _fun: Function = _meta.InstanceType;


            var _f = config && config.Args ? applyNew(_fun, config.Args) : new _meta.InstanceType();
            return _f;
        } else {
            console.log("注册名为: " + regName + "  类型为" + baseType + "没有注册");
            return null;
        }
    }

    public FetchInstance<T>(regName: string, baseType, config?: IFetchConfig): T {
        regName = regName.toUpperCase();
        return this.fFetchInstance<T>(regName, baseType, config);
    }

    public static fGetFunName(s) {
        if (typeof s == "string")
            return s;

        s = s.toString();
        var m = s.match(/function\s+([^(]+)/);
        if (m)
            return m[1];
        else
            return "";

    }

    public GetTypeList(baseType): Array<IClassMeta> {

        var _list = new Array<IClassMeta>();
        var _stre = Ioc.fGetFunName(baseType);

        for (var _m in this.fInstanceClassList) {
            var _strM: string = _m;
            if (_strM.indexOf(_stre + "_") == 0) {

                var _col = this.fInstanceClassList[_strM];
                _list.push(_col);
            }
        }



        for (var _m in this.fInstanceSrcList) {
            var _strM: string = _m;
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

export interface IPlugMeta {
    RegName: string;
    BaseType: any;
    CreateDate?: string;
    Doc?: string;
    Author?: string;
}

export function PlugIn(plugMeta: IPlugMeta) {
    return function (constructor: Function) {
        Ioc.Current().RegisterType(plugMeta.RegName, plugMeta.BaseType, constructor, undefined, {
            Author: plugMeta.Author,
            CreateDate: plugMeta.CreateDate,
            Message: plugMeta.Doc

        });
    }
}

export function getType(baseClass: any, name: string) {

    const _list = Ioc.Current().GetTypeList("vue");
    if (_list.length > 0) {
        const _num = _list.findIndex(a => a.RegName.toLocaleLowerCase() == name.toLocaleLowerCase());
        if(_num >= 0 ){
        return _list[_num].InstanceType;
        }
    }
    return null;

}


