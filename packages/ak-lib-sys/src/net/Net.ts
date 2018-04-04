import axios from 'axios'
import * as core from "./../Core"
import HTTP_STATUS from "./code";



/**
 * Created by nihilism on 03/06/2017.
 */

import Vue from 'vue'
//import axios from 'axios'
import vueAxios from 'vue-axios'

// load iview-ui components for notifying

import iView from 'iview'

// load config

//import config from '@/requests/base'

// load locale message template

//import Message from '@/locale/zh_CN'

// load http status config
//import HTTP_STATUS from '@/requests/code'

Vue.use(vueAxios, axios)
axios.defaults.baseURL = 'http://172.16.134.2:11536'
axios.defaults.withCredentials = true
axios.defaults.timeout = 120000

// axios.defaults.xsrfCookieName = '_xsrf'
// axios.defaults.xsrfHeaderName = 'X-Xsrftoken'

// `onDownloadProgress` allows handling of progress events for download
axios.defaults.onDownloadProgress = function (progressEvent) {
    // Do whatever you want with the native progress event
}

// interceptor

axios.interceptors.request.use(function (config) {
  iView.LoadingBar.start()
  return config
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (resp) {
 // debugger ;
  if (resp.data.code !== undefined && resp.data.code !== HTTP_STATUS.OK) {
    iView.Message.error({
      content: resp.data.msg,
      closable: true,
      duration: 5
    })
    iView.LoadingBar.finish()
    return Promise.reject(resp.data)
  }
  iView.LoadingBar.finish()
  return resp
}, function (error) {
  //debugger ;
  iView.LoadingBar.finish()
  if (error.response.status === HTTP_STATUS.UNAUTHORIZED) {
    iView.Message.warning({
      content: "您未认证或者未登录，即将跳转到登录界面",
      duration: 1.5,
      onClose: () => {}
    })
  } else {
    let errorText = ''
    switch (error.response.status) {
      case 500:
        errorText = '服务器内部错误'
        break
      case 403:
        errorText = '禁止访问'
        break
      case 404:
        errorText = '请求的api不存在'
        break
    }
    iView.Message.error({
      content: error.response.data.description || errorText,
      closable: true,
      duration: 5
    })
  }
  return Promise.reject(error)
})




 const _ajax = async function ({url, params, ispost}) {
    let _p1;
    
    const _config = {
        headers: {'User-Name': 'zhangsan'}
    };

    if (ispost) {
        _p1 = await axios.post(url, params,_config);
    }
    else {
        _p1 = await axios.get(url, {...params,..._config});
    }

    return new Promise((a, b) => {
        //debugger ;
        core.requestHook(_p1, a);

    });
}


export const post =  async  function({url,params}){
    return await _ajax({url,params,ispost : 1});
}

export const get =  async  function({url,params}){
    return await _ajax({url,params,ispost:0});
}





