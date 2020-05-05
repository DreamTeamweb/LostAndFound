import { Objet } from './../models/object';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  getConnection(){
    return this.http.get(this.URL_API+'object-found',{
      observe:'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type','application/json')
    })
  }

  postObject(objet:Objet){
    return this.http.post(this.URL_API+'object-found',objet,{
      observe:'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type','application/json')
    });
  }

  getObjects(){
    return this.http.get(this.URL_API+'object-lost',{
      observe:'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type','application/json')
    })
  }

  getObjectsUser(user:string){
    console.log('getUSer: '+user)
    return this.http.get(this.URL_API+'user/objects/'+user,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

  deleteObject(_id:string){
    return this.http.delete(this.URL_API+'user/objects/'+_id,{
      observe:'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type','application/json')
    });
  }

  putObject(object:Objet){
    console.log('Aqui '+object._id);
    return this.http.put(this.URL_API+'user/objects/'+object._id,object,{
      observe:'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type','application/json')
    });
  }


}
