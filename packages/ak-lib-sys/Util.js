export var getFunName = function (s) {
    if (typeof s == "string")
        return s;
    s = s.toString();
    var m = s.match(/function\s+([^(]+)/);
    if (m)
        return m[1];
    else
        return "";
};
export var sortBy = function (attr, rev) {
    //第二个参数k没有传递 默认升序排列
    if (rev == undefined) {
        rev = 1;
    }
    else {
        rev = (rev) ? 1 : -1;
    }
    return function (a, b) {
        a = a[attr];
        b = b[attr];
        if (a < b) {
            return rev * -1;
        }
        if (a > b) {
            return rev * 1;
        }
        return 0;
    };
};
export function formatTimeFormCode(code, fmt) {
    code = code * 1000;
    return formatDate(new Date(code), fmt);
}
export function formatDate(date, fmt) {
    var o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        'S': date.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
    return fmt;
}
export function getTimeCodeFromDate(d) {
    return Math.round(d.getTime() / 1000);
}
var handleCircular = function () {
    var cache = [];
    var keyCache = [];
    return function (key, value) {
        if (typeof value === 'object' && value !== null) {
            var index = cache.indexOf(value);
            if (index !== -1) {
                return '[Circular ' + keyCache[index] + ']';
            }
            cache.push(value);
            keyCache.push(key || 'root');
        }
        return value;
    };
};
var tmp = JSON.stringify;
export var safeJson = function (value, replacer, space) {
    replacer = replacer || handleCircular();
    return tmp(value, replacer, space);
};
