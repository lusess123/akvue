export let TableMetaDict = {};
export function Column(config) {
    return function (target, key) {
        let _config = Object.assign({}, config, { Name: key });
        //debugger;
        let _cons = target.constructor.toString().match(/function\s*([^(]*)\(/);
        if (!_cons || _cons.length <= 1) {
            _cons = target.constructor.toString().match(/class\s*([^{\s]*)/);
        }
        if (_cons && _cons.length > 1) {
            const _tableName = _cons[1];
            if (!TableMetaDict[_tableName])
                TableMetaDict[_tableName] =
                    {
                        Columns: []
                    };
            TableMetaDict[_tableName].Columns.push(_config);
        }
    };
}
//
