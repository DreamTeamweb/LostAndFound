import { ServerResponse } from './../models/server-response';
import { Objet } from './../models/object';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { Observable,throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  message: string;
  email: string;
  password: string;

  confirm_password: string;
  selectedUser: User;
  readonly URL_API = 'http://localhost:3000/'

  constructor(private http: HttpClient) {
    this.selectedUser = new User();
    this.confirm_password = '';
  }


  postUser(user: User) {
    return this.http.post(this.URL_API + 'signup', user, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
  }

  postLogin(user: User):Observable<ServerResponse> {
    return this.http.post<ServerResponse>(this.URL_API + 'signin', user, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError(errorResponse: HttpErrorResponse){
    return throwError(errorResponse);
  }

  getUser(user: string) {
    console.log('getUSer: ' + user)
    return this.http.get(this.URL_API + 'user/in/' + user, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  getUserHome() {
    return this.http.get(this.URL_API + 'user', {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
  }

  putUser(user: Objet) {
    return this.http.put(this.URL_API + 'user/edit/' + user._id, user, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
  }

  logout() {
    return this.http.get(this.URL_API + 'logout', {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
  }

}
