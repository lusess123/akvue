import * as iView from 'iview';
import * as Cookies from 'js-cookie';
export const Notify = (mesg) => {
    iView.Message.error({
        content: mesg,
        closable: true,
        duration: 5
    });
};
export const getCookie = (key) => {
    return Cookies.get(key);
};
export const setCookie = (key, val) => {
    Cookies.set(key, val);
};
