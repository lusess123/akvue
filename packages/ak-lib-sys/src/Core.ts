
import * as domFile from "./Dom";
export const ErrorCode =
    {
        "-1": "SYS_ERR",
        "0": "NO_ERR",
        "40400": "NOT_FOUND",
        "43001": "REQ_MUST_GET",
        "43002": "REQ_MUST_POST",
        "44000": "PARAMS_INVALID"

    }

export const ErrorDesc = {
    SYS_ERR: "系统繁忙，此时请开发者稍候再试",
    NO_ERR: "请求成功",
    NOT_FOUND: "API不存在",
    REQ_MUST_POST: "需要POST请求",
    REQ_MUST_HTTPS: "需要HTTPS请求",
    PARAMS_INVALID: "参数不合法"

}



export const requestHook = (req, callback) => {
    const _reqData = req.data;
    const _data = _reqData.data;
    const _error = _reqData.error;
    if (_error) {
        const _errorCode = ErrorCode[_error.toString()];
        if (_errorCode) {
            const _errorTxt = ErrorDesc[_errorCode];
            domFile.Notify(_errorTxt);
        }
        else {
            domFile.Notify("未知错误");
        }
    }
    else {
        callback(_data);
    }
}



export const json = (obj,replacer?: (key: string, value: any) => any , space?: string | number ) => {
    replacer =replacer?replacer:null;
    space = space ?space:2;
    return JSON.stringify(obj,replacer,space);
}
export const parseJson = (str) => {
    return JSON.parse(str);
}
export const alert = function (msg) {
    if (typeof (msg) == "object") {
        alertObj(msg);
    }
    else
        window["alert"](msg);
}
export const notify = (mesg) => {
    domFile.Notify(mesg);

};

export const alertObj = function (obj) {
    alert(json(obj));
}

export const pureObj = function (obj) {
    const _str = json(obj);
    return parseJson(_str);
}

let UniId: number = 0;

export const getUniId = function (): string {
    return (UniId++).toString();
}

export const cast = function<T>(obj:any) :T {
       let _res :T = obj ;
       return _res ;
}


export interface ILog
{
    info?:string ;
    sign?:string ;
}

export const log = (a:any,{sign,info} = {sign:"" ,info:"" })=>{
      //let sign = config.sign ;
      //let info = config.sign ;
      info = info + "\r\n"+ new Date();
      if(Options.IsDev ){

        if (typeof (a) == "object") {
             a = json(a);
        }

        if(sign)
        {
            if(Options.Point[sign]){
                alert(info + "\r\n" + a);
            }
            else{
                console.log(info);
                console.log(a);
            }

        }
        else{
          alert(info + "\r\n" + a);
        }
      }
      else{
          console.log(info);
          console.log(a);
      }
}

export  let  Options = {
   IsDev : true ,
   Point : {
       //app :true 
    }
};

export function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}
