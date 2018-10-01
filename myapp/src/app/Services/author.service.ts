import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Author } from '../Models/author';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  url = 'https://localhost:44331/api/author';
  constructor(private http:HttpClient) { }

  getFullNameAuthor(){
    return this.http.get(`${this.url}/fullname`);
  } // đừng quan tâm tới cái này . tự viết api khác mà xài.

  getAlllib() {
    return this.http.get(this.url);
  }

  addlib(lib: Author) {
    this.http.post(this.url, lib)
      .subscribe(data => {
        console.log(data);
      }, (error: any) => {
        console.log("---")
      }, () => {
        console.log('thêm thành công');

      });
  }
  
  deleteLang(id:string)
  {
    return this.http.delete(`${this.url}/${id}`);
  }

  updatelib(lib : Author,id:number){ 
  return  this.http.put(`${this.url}/${id}`, lib);
  }
}
