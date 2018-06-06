import { IPageView, IDataButton } from "./../contract/PageView";
import { SearchForm } from "./SearchForm";
import { ListForm } from "./ListForm";
import { BizPage } from "./../BizPage";
export declare class ListPage extends BizPage {
    Title: string;
    private IsLoad;
    PageStyle: string;
    SearchFormObj: SearchForm;
    ListFormObj: ListForm;
    protected loadPage(): void;
    readonly PageView: IPageView;
    readonly PageTitle: string;
    readonly PageButtons: IDataButton;
    pageButtonClick(btn: IDataButton): void;
}
