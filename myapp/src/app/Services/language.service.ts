import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
url ='https://localhost:44331/api/language';
  constructor(private http:HttpClient) { }

  getAllLanguage(){
    return this.http.get(this.url);
  }
}
