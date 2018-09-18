import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  url = 'https://localhost:44331/api/author';
  constructor(private http:HttpClient) { }

  getFullNameAuthor(){
    return this.http.get(`${this.url}/fullname`);
  } // đừng quan tâm tới cái này . tự viết api khác mà xài.
}
