import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Book } from '../Models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  url = 'https://localhost:44331/api/book';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  constructor(private http:HttpClient) { }

  addBook(book : Book){
    console.log(book);
    if(book.id === undefined)
    {
         return this.http.post(this.url,book);
    }
    return this.http.put(`${this.url}/${book.id}`,book);
  }

  deleteBook(id : number){
     return this.http.delete(`${this.url}/${id}`);
  }

  getBookByTitle(id : number){
    return this.http.get(`${this.url}/getbookbytitle/${id}`);
  }
}
