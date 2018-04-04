export let TableMetaDict = {};
export function Column(config) {
    return function (target, key) {
        let _config = Object.assign({}, config, { Name: key });
        //debugger;
        const _tableName = target.constructor.toString().match(/function\s*([^(]*)\(/)[1];
        if (!TableMetaDict[_tableName])
            TableMetaDict[_tableName] =
                {
                    Columns: []
                };
        TableMetaDict[_tableName].Columns.push(_config);
    };
}
//
