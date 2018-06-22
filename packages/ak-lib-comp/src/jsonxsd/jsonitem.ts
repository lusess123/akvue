export interface IJsonItem {
    title ?: string ;
    type :"object" | "array" | "string" | "integer" | "number" | "boolean" ;
    description?:string ;
    required?: string[];

    items? : IJsonItem;
    minItems?:number ;
    maxItems?:number ;
    uniqueItems?:boolean;


    maxLength?:number ;
    minLength?:number;
    pattern?:string ;

    minimum?:number ;
    maximum?:number;

    properties?:IDictJsonItem;
    enum ?:string[];

    $ref?:string ;
    definitions?:IDictJsonItem;

    default ?: any ;
    format?:string ;
}

export interface IDictJsonItem
{
    [index:string]:IJsonItem;
}

export interface IRoot extends  IJsonItem{
    $schema? :string ;
}

