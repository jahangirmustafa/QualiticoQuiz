import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/throw';

import { environment } from '../../../environments/environment';
const apiUrl = environment.apiUrl; 

@Injectable()
export class AuthService {  

  constructor(private http: Http) {
   
  }

  login(username: string, password: string): Observable<Response> {

    let data = { username: username, password: password };
    let body = JSON.stringify(data);

    let header = new Headers();
    header.append('Content-Type', 'application/json')
    let options = new RequestOptions({ headers: header });

    return this.http.post(apiUrl + 'users/authenticate', body, options)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let user = response.json();
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return response;
      })
      .catch((err: Response) => {
        return Observable.throw(err);
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

  currentUser(): any {
    return JSON.parse(localStorage.getItem('currentUser'));
  }


  /**  
  * @param options if options are not supplied the default content type is application/json
  */
  AuthGet(url: string): Observable<Response> {
    return this.http.get(url, this.setAuthHeaders())
      .map(response => response)
      .catch((err: Response) => {        
        return Observable.throw(err);
      });
  }
  /**
   * @param options if options are not supplied the default content type is application/json
   */
  AuthPut(url: string, data: any): Observable<Response> {
    let body = JSON.stringify(data);    
    return this.http.put(url, body, this.setAuthHeaders())
      .map(response => response)
      .catch((err: Response) => {        
        return Observable.throw(err);
      });
  }

  /**
   * @param options if options are not supplied the default content type is application/json
   */
  AuthDelete(url: string): Observable<Response> {   
    return this.http.delete(url, this.setAuthHeaders())
      .map(response => response)
      .catch((err: Response) => {        
        return Observable.throw(err);
      });
  }

  /**
   * @param options if options are not supplied the default content type is application/json
   */
  AuthPost(url: string, data: any): Observable<Response> {

    let body = JSON.stringify(data);    
    return this.http.post(url, body, this.setAuthHeaders())
      .map(response => response)
      .catch((err: Response) => {       
        return Observable.throw(err);
      });
  }

  private setAuthHeaders() {
    // create authorization header with jwt token    
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
      headers.append('Content-Type', 'application/json');
      return new RequestOptions({ headers: headers });
    }
  }

  //private _setAuthHeaders(user: any): void {
  //  this.authHeaders = new Headers();
  //  this.authHeaders.append('Content-Type', 'application/json');
  //  this.authHeaders.append('Authorization', user.token_type + ' ' + user.access_token);
  //  if (this.authHeaders.get('Content-Type')) {

  //  } else {
  //    this.authHeaders.append('Content-Type', 'application/json');
  //  }
  //}

  //private _setRequestOptions(options?: RequestOptions) {
  //  if (this.loggedIn) {
  //    if (this.currentUser.expired) {
  //      this.signInRnRecruiter();
  //    }
  //    this._setAuthHeaders(this.currentUser);
  //  }
  //  if (options) {
  //    options.headers.append(this.authHeaders.keys[0], this.authHeaders.values[0]);
  //  } else {
  //    options = new RequestOptions({ headers: this.authHeaders });
  //  }

  //  return options;
  //}
}
