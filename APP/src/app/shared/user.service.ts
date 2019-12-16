import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

// Step 2: add model to service
import { User } from './user.model';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // Step 3: add class
  selectedUser: User = {
    email: '',
    password: '',
    status: '',
    level: ''
  };

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }


////// HttpMethods //////


  postUser(user: User){
    return this.http.post(environment.apiBaseUrl+'/user/open/register',user,this.noAuthHeader); // No need to authorize access, add: this.noAuthHeader !!!!!!!!!
  }

  login(authCredentials) {
    return this.http.post(environment.apiBaseUrl + '/user/open/authenticate', authCredentials,this.noAuthHeader);
  }

  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + '/user/secure/userProfile');
  }

  // Resend verification email
  resend(form:NgForm) {
    return this.http.post(environment.apiBaseUrl + '/user/open/resend', form,this.noAuthHeader)
  }

  // All user
  allUser() {
    return this.http.get(environment.apiBaseUrl + '/user/secure/readallUser');
  }


////// Helper Methods //////


  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }
}