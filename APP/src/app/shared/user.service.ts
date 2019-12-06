import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

// Step 2: add model to service
import { User } from './user.model';

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

  constructor(private http: HttpClient) { }

   //HttpMethods

  postUser(user: User){
    return this.http.post(environment.apiBaseUrl+'/register',user);
  }

}