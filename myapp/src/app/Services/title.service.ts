import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TitleViewModel,Title } from '../Models/Title';


@Injectable({
  providedIn: 'root'
})
export class TitleService {

  public url: string = 'https://localhost:44331/api/title';
  constructor(private http: HttpClient) { }

  getAllShortTitle() {
    return this.http.get(`${this.url}/shorttitle`);
  }

  addTitle(t: Title, authorsID: number[],categoriesID:number[]) {

    let title = new Title(t.languageID, t.publisherID,
      t.code, t.name, t.tableOfContent, t.description, t.edition, t.isbn,
      t.image, t.price, t.publishingDate);

    let titleModelView = new TitleViewModel(title, authorsID, categoriesID);

    var x = JSON.stringify(titleModelView);
    console.log(x);

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    // return this.http.post(this.url, x, httpOptions).subscribe(data => {
    //   console.log(data);
    // });

  }
  getTitleViewById(id : number){
    return this.http.get(`${this.url}/${id}`)
  }

}