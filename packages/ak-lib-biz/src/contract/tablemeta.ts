import * as PageViewFile from './PageView';

export let TableMetaDict: PageViewFile.IForms = {


};

export function Column(config: PageViewFile.IColumn = {}) {
    return function (target: any, key: string) {
        let _config = { ...{Name:key,DisplayName:key}, ...config, ...{ Name: key } };
        //debugger;
        let _cons: string[] = target.constructor.toString().match(/function\s*([^(]*)\(/);
        if (!_cons || _cons.length <= 1) {
            _cons = target.constructor.toString().match(/class\s*([^{\s]*)/);

        }
        if (_cons && _cons.length > 1) {
            const _tableName: string = _cons[1];
            if (!TableMetaDict[_tableName]) TableMetaDict[_tableName] =
                {
                    Columns: []

                };
            TableMetaDict[_tableName].Columns.push(_config);
        }

    }
}
//