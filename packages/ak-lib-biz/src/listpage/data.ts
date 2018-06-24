export type dict<T> =  {
     [index:string]:T 
}

export type controlType =  "Text"|"DateTime"|"Combo" |"Radio"|"Detail"|"Hidden";

export type column = {
      DisplayName :string ,
      Name :string ,
      ControlType : controlType
}

export type btn = {
    Name :string ,
    DisplayName ?:string ;
    Kind?: "single"|"page"|"batch";
    GroupName?:string ;
    Icon ?:string ;
}

export type btnGroup = {
    Name ?:string ;
    DisplayName ?:string ;
    Icon?:string ;
}

export type form = {
    Columns? : column[],
    Name :string ,
    DisplayName? :string ,
    BtnGroups ?: dict<btnGroup>,
    Btns?:dict<btn>
}





export type pageview ={
     Data? : dict<any[]> ,
     SearchForm? : form ,
     ListForm? : form ,
     Title?:string ;
}