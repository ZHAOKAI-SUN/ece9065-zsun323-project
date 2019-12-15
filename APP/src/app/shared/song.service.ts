import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

// Step 2: add model to service
import { Song } from './song.model';
import { NgForm } from '@angular/forms';
import { Review } from './song.model';

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

  selectedReview: Review = {
    title: '',
    titleid: '',
    addname: '',
    addtime: null,
    rate: null,
    text: ''
  };

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  ////// HttpMethods //////

  postSong(song: Song){
    return this.http.post(environment.apiBaseUrl+'/song/secure/createSong',song,this.noAuthHeader); // No need to authorize access, add: this.noAuthHeader !!!!!!!!!
  }

  topSong(){
    return this.http.get(environment.apiBaseUrl+'/song/open/readTOP10',this.noAuthHeader); // No need to authorize access, add: this.noAuthHeader !!!!!!!!!
  }

  searchSong(key){
    return this.http.get(environment.apiBaseUrl+'/song/open/searchSong/'+key,this.noAuthHeader); // No need to authorize access, add: this.noAuthHeader !!!!!!!!!
  }

  searchReview(key){
    return this.http.get(environment.apiBaseUrl+'/review/open/searchReview/'+key,this.noAuthHeader); // No need to authorize access, add: this.noAuthHeader !!!!!!!!!
  }

  createReview(review: Review){
    return this.http.post(environment.apiBaseUrl+'/review/secure/createReview',review,this.noAuthHeader); // No need to authorize access, add: this.noAuthHeader !!!!!!!!!
  }

  updateSong(key, song: Song){
    return this.http.put(environment.apiBaseUrl+'/song/secure/'+key+'/updateSong',song,this.noAuthHeader); // No need to authorize access, add: this.noAuthHeader !!!!!!!!!
  }


}
