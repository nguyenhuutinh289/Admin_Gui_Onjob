import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Publisher } from '../Models/publisher';

@Injectable({
  providedIn: 'root'
})
export class PublisherService {

  url ='https://localhost:44331/api/publisher';
  constructor(private http:HttpClient) { }

  getPublishers(){
    return this.http.get(this.url);
  }

  getAllPublisher(){
    return this.http.get(`${this.url}/shortpublisher`);
  }

  addPub(pub: Publisher) {
  return  this.http.post(this.url, pub);
  }
  deleteLang(id:string)
  {
    return this.http.delete(`${this.url}/${id}`);
  }

  updatePub(pub : Publisher,id:string){ 
  return  this.http.put(`${this.url}/${id}`, pub);
  }
  
}
