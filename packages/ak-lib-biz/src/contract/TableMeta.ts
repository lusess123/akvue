import * as PageViewFile  from './PageView';

export let TableMetaDict : PageViewFile.IForms = {
    

};

export function Column(config:PageViewFile.IColumn){
    return function(target:any ,key:string){
        let _config = { ...{}, ...config,...{Name:key} };
        //debugger;
        const _tableName :string  =  target.constructor.toString().match(/function\s*([^(]*)\(/)[1];
        if(!TableMetaDict[_tableName]) TableMetaDict[_tableName] = 
        { 
            Columns: [] 
           
        };
        TableMetaDict[_tableName]. Columns.push(_config);
    }
}
//