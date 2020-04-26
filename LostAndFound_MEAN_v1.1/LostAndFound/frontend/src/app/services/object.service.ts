import { Objet } from './../models/object';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ObjectService {
  selectedObject:Objet;
  objects:Objet[];
  message: string;
  readonly URL_API ='http://localhost:3000/'
  constructor(private http:HttpClient) { 
    this.selectedObject = new Objet();
  }

  getMessage(){
    return this.http.get(this.URL_API);
  }


  postObject(objet:Objet){
    return this.http.post(this.URL_API+'object-found',objet);
  }

  getObjects(){
    return this.http.get(this.URL_API+'object-lost');
  }

}
