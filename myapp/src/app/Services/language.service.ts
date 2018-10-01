import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Language } from '../Models/language';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
url ='https://localhost:44331/api/language';
  constructor(private http:HttpClient) { }

  getAllLanguage(){
    return this.http.get(this.url);
  }

  deleteLang(id:string)
  {
    return this.http.delete(`${this.url}/${id}`);
  }

  addLang(lang: Language) {
   return this.http.post(this.url, lang);
      // .subscribe(data => {
      //   console.log(data);
      // }, (error: any) => {
      //   console.log("---")
      // }, () => {
      //   console.log('thêm thành công');
      // });
  }

  updateLang(lang : Language,id:string){
  return  this.http.put(`${this.url}/${id}`, lang);
  }
  
}
