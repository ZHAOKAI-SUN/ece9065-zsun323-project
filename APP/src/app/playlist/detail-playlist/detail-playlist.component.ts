import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SongService } from '../../shared/song.service';
import { AppComponent } from '../../app.component';
import { Router } from "@angular/router"; // Use for jump
import { UserService } from '../../shared/user.service';
import { PlaylistService } from 'src/app/shared/playlist.service';

@Component({
  selector: 'app-detail-playlist',
  templateUrl: './detail-playlist.component.html',
  styleUrls: ['./detail-playlist.component.scss'],
  // Step 5: add providers
  providers : [SongService, UserService, PlaylistService]
})
export class DetailPlaylistComponent implements OnInit {

  sbuser: any;
  sbplaylist: any;

  constructor(private songService: SongService, private userService: UserService, private playlistService: PlaylistService, private appComponent: AppComponent, private router : Router) { }

  ngOnInit() {
    // get current user and current playlist
    this.sbuser = this.appComponent.owner;
    this.sbplaylist = this.appComponent.selectedplaylist;
    console.log(this.sbuser);
    console.log(this.sbplaylist);
  }

}
