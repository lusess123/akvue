export interface IMenu
{
    text:string ;
    name :String ;
    icon?:string ;
    title?:string ;
    children?: IMenu[];
}