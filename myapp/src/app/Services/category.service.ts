import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url = 'https://localhost:44331/api/category';
  constructor(private http: HttpClient) { }

  getAllCategory() {
    return this.http.get(this.url);
  }
}
