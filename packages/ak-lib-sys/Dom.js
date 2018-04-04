import * as iView from 'iview';
import * as Cookies from 'js-cookie';
export var Notify = function (mesg) {
    iView.Message.error({
        content: mesg,
        closable: true,
        duration: 5
    });
};
export var getCookie = function (key) {
    return Cookies.get(key);
};
export var setCookie = function (key, val) {
    Cookies.set(key, val);
};
