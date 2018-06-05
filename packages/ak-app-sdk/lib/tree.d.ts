export interface ITreeNode {
    title: string;
    expand?: boolean;
    disabled?: boolean;
    disableCheckbox?: boolean;
    selected?: boolean;
    checked?: boolean;
    children?: ITreeNode[];
    render?: (h: any, renderObj: IRenderObj) => any;
}
export interface IRenderObj {
    root: ITreeNode[];
    node: any;
    data: ITreeNode;
}
