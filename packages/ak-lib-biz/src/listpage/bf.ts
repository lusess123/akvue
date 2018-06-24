import {pageview} from "./data";

export const getTableData = (s : pageview) => {

    const _cols = s
        .ListForm
        .Columns
        .filter(a => a.ControlType != "Hidden")
        .map(col => {

            return {title: col.DisplayName, key: col.Name}
        });

    return [
        {
            type: 'selection',
            width: 55,
            align: 'center'
        },
        ..._cols, {
            title: '操作',
            key: 'action',
            fixed: 'right',
            width: 120
        }
    ]

}

export const getBtnData = (s : pageview) => (groupName : string) => {}

export const getBtnGroup = (s : pageview) => {
    return s.ListForm.BtnGroups;
}

export const getNoGroupBtns = (s : pageview) => {
    const _res = [];
    for (const name in s.ListForm.Btns) {
        if (!s.ListForm.Btns[name].GroupName) {
            _res.push(s.ListForm.Btns[name]);
        }
    }
    return _res;
}

export const getBtnsByGroupName = (s : pageview) => (gname : string) => {
    const _res = [];
    for (const name in s.ListForm.Btns) {
        if (s.ListForm.Btns[name].GroupName == gname) {
            _res.push(s.ListForm.Btns[name]);
        }
    }
    return _res;
}