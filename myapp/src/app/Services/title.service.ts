import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Title } from './../Models/Title';
import { TitleViewModel } from '../Models/titleViewModel';


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

    //console.log(title);

    //let authors = [1, 2, 3];
    //let categories = [4, 5, 6];

    let titleModelView = new TitleViewModel(title, authorsID, categoriesID);

    console.log(titleModelView);
    var x = JSON.stringify(titleModelView);
    console.log(x);

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post(this.url, x, httpOptions).subscribe(data => {
      console.log(data);
    });

  }

}