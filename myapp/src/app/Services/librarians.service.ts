import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LibrariansService {

  url : string = 'https://5b94c2304f35ad001474db91.mockapi.io/get';
  constructor(private http:HttpClient) { }

  getAllLib(){
    return this.http.get(this.url);
  }

}
