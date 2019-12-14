import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

// Step 2: add model to service
import { Song } from './song.model';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  // Step 3: add class
  selectedSong: Song = {
    header: '',
    title: '',
    artist: '',
    album: '',
    year: '',
    comment: '',
    reserve: '',
    track: '',
    genre: '',
    nor: null,
    ar: '',
    status: '',
    addname: '',
    addtime: null,
    title0artist: ''
  };

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  ////// HttpMethods //////

  postSong(song: Song){
    return this.http.post(environment.apiBaseUrl+'/song/secure/createSong',song,this.noAuthHeader); // No need to authorize access, add: this.noAuthHeader !!!!!!!!!
  }


}
