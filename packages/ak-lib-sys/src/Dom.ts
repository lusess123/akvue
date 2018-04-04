import * as iView from 'iview'
import * as Cookies from 'js-cookie';


export const Notify = (mesg)=>{
    iView.Message.error({
        content: mesg,
        closable: true,
        duration: 5
      })
}

export const getCookie = ( key:string)=>
{
   return  Cookies.get(key);
}

export const setCookie = (key :string ,val :string)=>{
    Cookies.set(key ,val);
}