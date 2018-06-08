import { ioc } from "ak-lib-sys";
let _apps;
const fetchApps = () => {
    const _res = ioc
        .Ioc
        .Current()
        .GetTypeList("IApp");
    const _apps = _res.map(info => {
        return ioc
            .Ioc
            .Current()
            .FetchInstance(info.RegName, "IApp");
    });
    return _apps;
};
export default () => {
    if (!_apps) {
        _apps = fetchApps();
    }
    return _apps;
};
