import {IApp} from "./iapp"
import {ioc} from "ak-lib-sys/src"

let _apps : IApp[];

const fetchApps = () : IApp[] => {
    const _res : ioc.IClassMeta[] = ioc
    .Ioc
    .Current()
    .GetTypeList("IApp");
  const _apps = _res.map(info => {

    return ioc
      .Ioc
      .Current()
      .FetchInstance < IApp > (info.RegName, "IApp");

  });
    return _apps;
}

export default  () : IApp[] => {
    if (!_apps) {
        _apps = fetchApps();
    }
    return _apps;
}
