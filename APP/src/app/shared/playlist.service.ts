import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

// Step 2: add model to service
import { Playlist } from './playlist.model';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})



export class PlaylistService {

    // Step 3: add class
  selectedPlaylist: Playlist = {
    pname: '',
    description: '',
    addname: '',
    addtime: null,
    status: '',
    pname0addname: ''
  };

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  ////// HttpMethods //////

  searchmyPlaylist(key){ // Only MY MY MY playlist !!!
    return this.http.get(environment.apiBaseUrl+'/playlist/open/searchmyPlaylist/'+key,this.noAuthHeader); // No need to authorize access, add: this.noAuthHeader !!!!!!!!!
  }

}