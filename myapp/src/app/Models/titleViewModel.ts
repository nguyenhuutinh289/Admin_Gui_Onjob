import { TitleView } from "./titleView";
import { Title } from "./Title";

export class TitleViewModel{
    title : Title;
    authors : number[];
    categories : number[];
   
    constructor(_title : Title, _authors : number[],_categories : number[]) {

        this.title = _title;
        this.authors = _authors;
        this.categories = _categories;
    }
}