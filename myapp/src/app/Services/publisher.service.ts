import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PublisherService {

  url ='https://localhost:44331/api/publisher';
  constructor(private http:HttpClient) { }

  getAllPublisher(){
    return this.http.get(`${this.url}/shortpublisher`);
  }
  
}
