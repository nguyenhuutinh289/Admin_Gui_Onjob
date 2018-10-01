export class Title {
    public id: number;
    public code: string;
    public name: string;
    public tableOfContent: string;
    public description: string;
    public edition: number;
    public isbn: string;
    public price: number;
    public publishingDate: Date;
    public publisherID: number;
    public languageID: number;
    public image: string;

    constructor(lang?: number, pub?: number, code?: string, name?: string, toc?: string, des?: string,
        edition?: number, isbn?: string, img?: string, price?: number,
        pubdate?: Date) {
        this.code = code;
        this.name = name;
        this.tableOfContent = toc;
        this.description = des;
        this.edition = edition;
        this.isbn = isbn;
        this.price = price;
        this.publishingDate = pubdate;
        this.publisherID = pub;
        this.languageID = lang;
        this.image = img;
    }
}

export class ShortTitle{
    
   id  : number;
   name : string;
   image : string;
  
   constructor(id? : string, name? : string, image?:string) {
   }
    
}

export class GetFullTitle{
    
    title : Title;
    authors : string[];
    categories : string[];
   
    constructor(title? : Title, authors? : string[], categories?:string[]) {
    }
     
 }

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