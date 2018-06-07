export interface IMenu
{
    text:string ;
    name :String ;
    icon?:string ;
    children?: IMenu[];
}