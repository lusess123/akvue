
import {pageview} from "./data";
import {getTableData, getBtnGroup,getNoGroupBtns,getBtnsByGroupName} from "./bf";
export default {
    state() {

        const _res : pageview = {
            Title: "终端",
            Data: {
                dev_search: [],
                dev: []
            },
            SearchForm: {
                Name: "dev_search",
                Columns: [
                    {
                        Name: "mobile",
                        DisplayName: "手机号",
                        ControlType: "Text"
                    }, {
                        Name: "policename",
                        DisplayName: "警员姓名",
                        ControlType: "Text"
                    }, {
                        Name: "imei",
                        DisplayName: "IMEI号",
                        ControlType: "Text"
                    }
                ]
            },
            ListForm: {
                Name: "dev",
                Columns: [
                    {
                        Name: "id",
                        DisplayName: "编号",
                        ControlType: "Hidden"
                    }, {
                        Name: "mobile",
                        DisplayName: "手机号",
                        ControlType: "Text"
                    }, {
                        Name: "policename",
                        DisplayName: "警员姓名",
                        ControlType: "Text"
                    }, {
                        Name: "imei",
                        DisplayName: "IMEI号",
                        ControlType: "Text"
                    }, {
                        Name: "orgName",
                        DisplayName: "所属组织",
                        ControlType: "Text"
                    }, {
                        Name: "mobilesate",
                        DisplayName: "手机状态",
                        ControlType: "Text"
                    }, {
                        Name: "isonline",
                        DisplayName: "是否在线",
                        ControlType: "Text"
                    }, {
                        Name: "isroot",
                        DisplayName: "是否root",
                        ControlType: "Text"
                    }, {
                        Name: "isout",
                        DisplayName: "是否外出",
                        ControlType: "Text"
                    }, {
                        Name: "lastconnecttime",
                        DisplayName: "最后连接",
                        ControlType: "DateTime"
                    }
                ],
                BtnGroups: {
                    "操作": {
                        Name: "操作",
                        DisplayName: "操作",
                        Icon: "cogs"
                    },
                    "限制/禁用功能": {
                        Name: "限制/禁用功能",
                        DisplayName: "限制/禁用功能",
                        Icon: "plug"
                    },
                    "网络相关操作": {
                        Name: "网络相关操作",
                        DisplayName: "网络相关操作",
                        Icon: "wifi"
                    }
                },
                Btns: {
                    ...setBtn("详情"),
                    ...setBtn("定位服务","操作"),
                    ...setBtn("分发文档","操作"),
                    ...setBtn("分发应用","操作"),

                    ...setBtn("禁止安装","限制/禁用功能"),
                    ...setBtn("禁用相机","限制/禁用功能"),
                    ...setBtn("限制通话","限制/禁用功能"),
                    ...setBtn("禁用麦克风","限制/禁用功能"),
                    ...setBtn("锁机","限制/禁用功能"),
                    ...setBtn("禁用usb调试","限制/禁用功能"),

                    ...setBtn("禁用蓝牙","网络相关操作","bluetooth"),
                    ...setBtn("禁用gps","网络相关操作","location-arrow"),
                    ...setBtn("禁用飞行模式","网络相关操作"),
                    ...setBtn("禁用个人热点","网络相关操作"),

                    ...setBtn("限制网络访问","网络相关操作"),
                    ...setBtn("强制开启移动数据","网络相关操作"),
                    ...setBtn("禁用移动数据","网络相关操作"),
                    ...setBtn("禁用WIFI","网络相关操作","wifi"),



                }
                    
            }
        };

        return _res;
    },
    mutations : {},
    actions : {
        btnClick:(context,obj)=>{
           // console.log(btn);
           alert(obj.btn.DisplayName);
        }
    },
    getters : {
        getSearchColList(s) {
            return s.SearchForm.Columns;
        },
        Columns(s) {
            return getTableData(s);
        },
        Datasource: (s) => {
            return s.Data.dev;
        },
        getBtnGroup,
        getNoGroupBtns,
        getBtnsByGroupName

    }

}

const setBtn = (name : string, group?:string,icon?: string) => {
    let _a = {};
     _a[name] = {
        Name: name,
        DisplayName: name,
        Icon: icon,
        Kind: "batch",
        GroupName:group
    };

    return _a ;
}