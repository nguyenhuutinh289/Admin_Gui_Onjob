import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TitleViewModel, Title } from '../Models/Title';


@Injectable({
  providedIn: 'root'
})
export class TitleService {

  public url: string = 'https://localhost:44331/api/title';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  getFullTitle() {
    return this.http.get(`${this.url}`);
  }

  getAllShortTitle(){
    return this.http.get(`${this.url}/shorttitle`);
  }
  
  addTitle(t: Title, authorsID: number[], categoriesID: number[]) {

    let title = new Title(t.languageID, t.publisherID,
      t.code, t.name, t.tableOfContent, t.description, t.edition, t.isbn,
      t.image, t.price, t.publishingDate);

    let titleModelView = new TitleViewModel(title, authorsID, categoriesID);

    var x = JSON.stringify(titleModelView);
    console.log(x);

    if (t.id === undefined) {
      return this.http.post(this.url, x, this.httpOptions);
      // .subscribe(data => {
      // //  console.log(data);
      // });
    }
    else {
      return this.http.put(`${this.url}/${t.id}`, x, this.httpOptions);
      // .subscribe(data => {
      //  // console.log(data);
      // });
    }
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, this.httpOptions);
  }

  getTitleViewById(id: number) {
    return this.http.get(`${this.url}/${id}`)
  }

}