
    export interface ICodeTable extends IDict<string> {

    }


    export interface ICodeTables extends IDict<ICodeTable>{

    }

    export interface IDict<T> {
        [index: string]: T;
    } 

    //-----------------IData-----------------
    export interface IDataRow extends IDict<any> {
       
    }


    export interface IDataSet extends IDict<Array<IDataRow>> {
        [index: string]: IDataRow[];
    }
    //----------------------------------------------


    //----------------IScript-----------------------
    export interface IScript {
        InternalStyle?: string;
        Path?: string;
        Function?: string;
    }
    //----------------------------------------------

    //-----------------IHeader----------------------
    export interface IHeader {
        IsValid?: boolean;
        Message?: string;
    }
    //----------------------------------------------
     
    //-----------------ILayout-----------------------
    export interface Ilayout {
        ShowKind?: string;
        VerticalTab?: boolean;
        Panels?: IPanel[];
    }
    export interface IPanel {
        FormName?: string;
    }
    //-------------------------------------------

    //-----------------IPageButton--------------
    export interface IPageButton {
        Insert?: IInsert;
    }

    export interface IInsert {
        Name?: string;
        Text?: string;
        Unbatchable?: boolean;
        Client?: IClient;
        Server?: string;
        Icon?: string;
        BtnCss?: string;
    }

    export interface IClient {
        Function?: string;
    }
    //------------------------------------------

    //----------------IForms----------------
    export interface IForms extends IDict<IForm> {
        [index: string]: IForm;
    }

    export interface IForm {
        
        TableName?: string;
        PrimaryKey?: string;
        ParentKey?: string;
        FormType?: string;
        VerticalTab?: boolean;
        HasSearch?: boolean;
        HasPager?: boolean;
        HasNavigation?: boolean;
        Columns?: IColumn[];
        ColumnGroups?: IColumnGroup[];
        NavigationColumns?: INavigationColumn[];
        Action?: string;
        IsDetailForm?: boolean;
        AfterInitFunName?: string;
        ParentFieldName?: string;
        TextFieldName?: string;
        IsParentFieldName?: string;
        CodeValueFieldName?: string;
        CodeTextFieldName?: string;
        IsSafeMode?: boolean;
        HasReview?: boolean;
        IsInner?: boolean;
        HaveNoSwitchForm?: boolean;
        HaveNoSortBar?: boolean;
        Tpl?: string;
        Calendar?: string;
        DisableColumnGroup?: boolean;
        ExpandDetailPlug?: string;
        RowTpl?: string;
        ContentTpl?: string;
        Name?: string;
        Title?: string;
        ShowKind?: string;
        ShowType?: number;
        Width?: number;
       
    }

   

    export interface IColumn {
        Name?: string;
        DisplayName?: string;
        Prompt?: string;
        ValPrompt?: string;
        Kind?: string;
        ControlType?: string;
        ShowType?: number;
        Sortable?: boolean;
        IsDetailLink?: boolean;
        Options?: IOption;
        ChangeEventFun?: string;
        MarkDown?: string;
        Report?: IReport;
        Editor?: string;
        QingColumnName?: string;
        TreeConfig?: string;
        Amount?: string;

        Changer?: IChager;

        LinkFormat?: string;
        NormalStyle?: string;
        Width?: string;
        TdStyle?: string;
        ShortCutName?: string;
        CustomControl?: string;
        IsHiddenCol?: boolean;

        PxWidth?: number;
        PxHeight?: number;

        IsMulitText?: boolean;
        TextRegName ?:string ;
        Border?: string;
        Search?:ISearch ;

        //NoShowAllPage?:boolean;
        ShowPage? : string;
        IsRequire?:boolean;
        
        
    }

    export interface ITableData
    {
        Colums?: ITableDataColumn[];
    }
    export interface ITableDataColumn
    {
        title?: string,
        type?: string,
        width?: number,
        align?: string,
        key?:string
    }


    export interface ISearch {
        IsLike? :boolean ;
        ControlType?:string ;
        IsNavi?:boolean;
    }

    export interface IChager {
        Expression?: string;

        DependColums?: IDependColum[];

        NotifyColums?: INotifyColum[];
    }

    export interface IDependColum extends IDict<string> {
        [index: string]: string;
    }

    export interface INotifyColum extends IDict<string> {
        [index: string]: string;
    }

    export interface IOption{
        RegName?: string;
        DataValue?: IDataValue;
        IsKey?: boolean;
        IsParentColumn?: boolean;
        Id?: string;
        Legal?: IControlLegal;
        PostSetting?: any;
        IsReadOnly?: boolean;
        DetialFormatFun?: string;
        IsLike?: boolean;
        DisplayName?: string;
        Prompt?: string;
        ValPrompt?: string;
        IsOpenByDefault?: boolean;
        TableData?:ITableData;
    }

    export interface IUploadOption extends IOption {
        FileSize?: number;
        FileExtension?: string;
        StorageName?: string;
        UploadName?: string;
        ImageSizeHeight?: number;
        ImageSizeWidth?: number;
        HasDocumentCenter?: boolean;
        IsCut?: boolean;
        MinUploadCount?: number;
    }

    export interface IControlLegal {
        Kind?: string;
        CustomLegalFun?: string;
        reg?: string;
        ErrMsg?: string;
        LegalExpression?: string;
    }

    export interface IDataValue {
        TableName?: string;
        ColumnName?: string;
        Index?: number;
        FunString?: string;
        DataValueType?: string;
        Value?: string;
        IsChange?: boolean;
    }

    export interface IReport {
        FormatText?: string;
        Enable?: boolean;
    }


    export interface IColumnGroup {
        ShowType?: number;
        Name?: string;
        DisplayName?: string;
        Columns?: string[];
        IsHidden?: boolean;
        Children?: IColumnGroup[];
    }

    export interface INavigationColumn {
        IsRefrech?: boolean;
        IsAvailable?: boolean;
        IsExpand?: boolean;
        Name?: string;
        DisplayName?: string;
        Prompt?: string;
        ValPrompt?: string;
        Kind?: string;
        ControlType?: string;
        ShowType?: number;
        Sortable?: boolean;
        IsDetailLink?: boolean;
        Options?: IOption;
        ChangeEventFun?: string;
        MarkDown?: string;
        Report?: IReport;
        Editor?: string;
        QingColumnName?: string;
        TreeConfig?: string;
        Amount?: string;
        Changer?: IChager;
        LinkFormat?: string;
        NormalStyle?: string;
        Width?: string;
        TdStyle?: string;
        ShortCutName?: string;
        CustomControl?: string;
        IsHiddenCol?: boolean;

    }
    //--------------------------------------

    //--------------IDataButtons-------------
    export interface IDataButtons extends IDict<IDataButton> {
        [index: string]: IDataButton;
    }

    export interface IDataButton {
        Name?: string;
        Text?: string;
        Unbatchable?: boolean;
        Client?: IClient;
        Server?: string;
        Icon?: string;
        BtnCss?: string;
        Url ?: string ;
      
    }

    export interface IClient {
        EFunction?: string;
    }
    //---------------------------------------


    //-------------------SeaForms---------------
    export interface ISeaForms {

    }

    //-----------------MvcForms--------------
    export interface IMvcForms {

    }

    //------------ScriptForms---------------
    export interface IScriptForms {

    }

   


    export interface IPageView {
        //类
        Header?: IHeader;
        Scripts?: IScript[];
        Data?: IDataSet;
        Forms?: IForms;
        CodeTables ?:ICodeTables ;

        Layout?: Ilayout[];
        DataButtons?: IDataButtons;
        PageButtons?: IDataButtons;

        //这三个是空的 未知
        SeaForms?: ISeaForms;
        MvcForms?: IMvcForms;
        ScriptForms?: IScriptForms;

        //字段
        SearchFormName?: string;
        ListFormName?: string;
        RegName?: string;
        Title?: string;
        PageLayout?: string;
        ReturnUrl?: string;
        Route?: string;
        IsPart?: boolean;
        ExtData?: any;
        KeyValue?: string;

        //可能是类
        PageSelector?: string;
        PageSourceData?: string;
        TsHook?: string;
        TsSkinName?: string;

    }

    export interface ITreeCodeTableModel {
        CODE_VALUE?: string;
        CODE_TEXT?: string;
        ExtData?: IExtData;
        Children?: ITreeCodeTableModel[];
    }

    export interface IExtData {
        RightValue?: string;
        Icon?: string;
        RightType?: string | number;
    }

