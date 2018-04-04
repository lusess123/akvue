import * as domFile from "./Dom";
export var ErrorCode = {
    "-1": "SYS_ERR",
    "0": "NO_ERR",
    "40400": "NOT_FOUND",
    "43001": "REQ_MUST_GET",
    "43002": "REQ_MUST_POST",
    "44000": "PARAMS_INVALID"
};
export var ErrorDesc = {
    SYS_ERR: "系统繁忙，此时请开发者稍候再试",
    NO_ERR: "请求成功",
    NOT_FOUND: "API不存在",
    REQ_MUST_POST: "需要POST请求",
    REQ_MUST_HTTPS: "需要HTTPS请求",
    PARAMS_INVALID: "参数不合法"
};
export var requestHook = function (req, callback) {
    var _reqData = req.data;
    var _data = _reqData.data;
    var _error = _reqData.error;
    if (_error) {
        var _errorCode = ErrorCode[_error.toString()];
        if (_errorCode) {
            var _errorTxt = ErrorDesc[_errorCode];
            domFile.Notify(_errorTxt);
        }
        else {
            domFile.Notify("未知错误");
        }
    }
    else {
        callback(_data);
    }
};
export var json = function (obj, replacer, space) {
    replacer = replacer ? replacer : null;
    space = space ? space : 2;
    return JSON.stringify(obj, replacer, space);
};
export var parseJson = function (str) {
    return JSON.parse(str);
};
export var alert = function (msg) {
    if (typeof (msg) == "object") {
        alertObj(msg);
    }
    else
        window["alert"](msg);
};
export var notify = function (mesg) {
    domFile.Notify(mesg);
};
export var alertObj = function (obj) {
    alert(json(obj));
};
export var pureObj = function (obj) {
    var _str = json(obj);
    return parseJson(_str);
};
var UniId = 0;
export var getUniId = function () {
    return (UniId++).toString();
};
export var cast = function (obj) {
    var _res = obj;
    return _res;
};
export var log = function (a, _a) {
    var _b = _a === void 0 ? { sign: "", info: "" } : _a, sign = _b.sign, info = _b.info;
    //let sign = config.sign ;
    //let info = config.sign ;
    info = info + "\r\n" + new Date();
    if (Options.IsDev) {
        if (typeof (a) == "object") {
            a = json(a);
        }
        if (sign) {
            if (Options.Point[sign]) {
                alert(info + "\r\n" + a);
            }
            else {
                console.log(info);
                console.log(a);
            }
        }
        else {
            alert(info + "\r\n" + a);
        }
    }
    else {
        console.log(info);
        console.log(a);
    }
};
export var Options = {
    IsDev: true,
    Point: {
    //app :true 
    }
};
export function applyMixins(derivedCtor, baseCtors) {
    baseCtors.forEach(function (baseCtor) {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(function (name) {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}
