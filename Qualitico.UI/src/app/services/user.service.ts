import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { User } from '../common/models/user.model';
import { AuthService } from '../common/auth/auth.service';
import { environment } from '../../environments/environment';

const apiUrl = environment.apiUrl; 

@Injectable()
export class UserService {
  constructor(private http: Http, private authService: AuthService) { }

  getAllUser() {
    return this.authService.AuthGet(apiUrl + '/users/GetAllUser').map((response: Response) => response.json());
  }

  getAll() {
    return this.http.get(apiUrl + '/users').map((response: Response) => response.json());
  }

  getById(id: number) {
    return this.http.get(apiUrl + '/users/' + id, this.jwt()).map((response: Response) => response.json());
  }

  create(user: User) {
    return this.http.post(apiUrl + '/users', user, this.jwt());
  }

  update(user: User) {
    return this.http.put(apiUrl + '/users/' + user.id, user, this.jwt());
  }

  delete(id: number) {
    return this.http.delete(apiUrl + '/users/' + id, this.jwt());
  }

  // private helper methods

  private jwt() {
    // create authorization header with jwt token
    debugger;
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
      return new RequestOptions({ headers: headers });
    }
  }
}
