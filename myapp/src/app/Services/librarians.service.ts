import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Librarian } from './../Models/librarians'
@Injectable({
  providedIn: 'root'
})
export class LibrariansService {

  url: string = 'https://localhost:44331/api/librarian';
  constructor(private http: HttpClient) { }

  getAllLib() {
    return this.http.get(this.url);
  }

  addLib(lib: Librarian) {
    // console.log(lib);
    // {fistname : lib.firstname, lastname : lib.lastname, gender : lib.gender,
    //   phone : lib.phone, email : lib.email,status : lib.status , images : lib.images}
    this.http.post(this.url, lib)
      .subscribe(data => {
        console.log(data);
      }, (error: any) => {
        console.log("---")
      }, () => {
        console.log('thêm thành công');

      });
  }

  updateLib(lib : Librarian,id:string){
    console.log(id);
  return  this.http.put(`${this.url}/${id}`, lib);
    // .subscribe(data => {
    //   console.log(data);
    // }, (error: any) => {
    //   console.log("---");
    // }, () => {
    //   console.log('cập nhật thành công');

    // });
  }

}
