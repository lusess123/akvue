import { BaseSource } from "ak-lib-biz/source/BaseSource";
import { ioc, net } from "ak-lib-sys";
import * as pageView from "ak-lib-biz/contract/PageView";
import { TableMetaDict } from "ak-lib-biz/contract/TableMeta";
import * as contractFile from "ak-lib-biz/contract/net";
//import { timeout } from "_rxjs@5.5.6@rxjs/operator/timeout";
import * as  codeTables from "./DwhCodeTable";
import { core } from "ak-lib-sys";


export abstract class dwhBaseSource extends BaseSource {

    Title: string = "标题";
    ListFormName: string = "ListForm";
    SearchFormName: string = "SearchForm";
    ModelName: string = "dwh_search_tables";
    Url: string = "/dwh/data/tables";
    PageView: pageView.IPageView;
    TableName:string = "tables";
   
    initData(){
        this.setFormConfig();
    }

    async asyncLoadData() {
      
        const _data = await _$searchTable(this.Url, {});
        // debugger ;
        this.setData(_data);
 
    }
    protected setData(data: any){
        this.PageView.Data[this.ListFormName] = data[this.TableName];
        this.PageView.Data[this.ListFormName+"_PAGER"] = [{
            order : data.order ,
            page :data.page,
            size:data.size,
            total:data.total
        }] ;

    }

     
     protected setFormConfig()
     {
        // core.alert(codeTables);
        this.PageView = {
            Title: this.Title,
            Data: {
                ListForm: []
                
            },
            ListFormName: this.ListFormName,
            SearchFormName: this.SearchFormName,
            CodeTables: {...codeTables},
    
            Forms: {
                ListForm: {
                    Columns: [],
                    ColumnGroups:[]
                }
            }
    
        };

        const _tm = TableMetaDict;
        this.PageView.Forms.ListForm.Columns = _tm[this.ModelName].Columns;
     }


    async  asyncSearch(postData){
         const _param = this.setPostData(postData);       
         const _data = await _$searchTable(this.Url, _param);
         this.setData(_data);
     }

     protected  setPostData(postData):contractFile.IGetReq{
        let query  = [];
        if(postData){
            for(const n  in postData){
                query.push(n + ":" + postData[n]);
            }
        }

        const _param = {query :  query.join(',')};
        return _param ;
     }

     

     
}


const _$searchTable = async function (url, params: contractFile.IGetReq) {
    return await _$get(url, { params: params });
}

const _$get = async function (url, params?) {
    return net.get({ url, params });
}

const _$post = async function (url, params?) {
    return net.post({ url, params });
}