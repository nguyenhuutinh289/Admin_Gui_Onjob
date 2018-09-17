export class Title {
    public id: number;
    public code: string;
    public name: string;
    public tableOfContent: string;
    public description: string;
    public edition: number;
    public isbn: string;
    public price: number;
    public publishingDate: string;
    public publisherID: number;
    public languageID: number;
    public image: string;


    constructor(lang?: number, pub?: number, code?: string, name?: string, toc?: string, des?: string,
        edition?: number, isbn?: string, img?: string, price?: number,
        pubdate?: string) {
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