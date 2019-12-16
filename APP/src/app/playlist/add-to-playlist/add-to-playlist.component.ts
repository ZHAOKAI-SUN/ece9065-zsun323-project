import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SongService } from '../../shared/song.service';
import { AppComponent } from '../../app.component';
import { Router } from "@angular/router"; // Use for jump
import { UserService } from '../../shared/user.service';
import { PlaylistService } from '../../shared/playlist.service';

@Component({
  selector: 'app-add-to-playlist',
  templateUrl: './add-to-playlist.component.html',
  styleUrls: ['./add-to-playlist.component.scss'],
  // Step 5: add providers
  providers : [UserService, SongService, PlaylistService]
})
export class AddToPlaylistComponent implements OnInit {

  showSucessMessage: boolean;
  showFailedMessage: boolean;
  serverErrorMessages: string;
  playlist : any;
  sbsong: any;
  sbplinfo: any;

  constructor(private songService: SongService, private userService: UserService, private playlistService: PlaylistService, private appComponent: AppComponent, private router : Router) { }

  ngOnInit() {
    // get the song
    this.sbsong = this.appComponent.selectedsong;
    console.log(this.sbsong);
    // get the playlist
    console.log(this.appComponent.owner);
    this.playlistService.searchmyPlaylist(this.appComponent.owner).subscribe(
      res => { // function 1
        this.playlist = res;
        console.log(this.playlist);
      },
      err => { // function 2
      }
    )
  }

  choosethis(info){
    // Create JSON array
    this.sbplinfo = {
      "plid" : info.ID,
      "plname" : info.Pname,
      "songid": this.sbsong.ID,
      "songname" : this.sbsong.Title,
      "songartist" : this.sbsong.Artist
    }
    console.log(this.sbplinfo);
    // Create playlist info with the above JSON array
    this.playlistService.createPLinfo(this.sbplinfo).subscribe(
      res => { // function 1
        console.log(res);
        this.showSucessMessage = true;
        this.serverErrorMessages = "";
        setTimeout(() => this.showSucessMessage = false, 6000);
      },
      err => { // function 2
        if (err.status === 422) {
          this.showSucessMessage = false;
          this.serverErrorMessages = err.error.join('<br/>');
          setTimeout(() => this.serverErrorMessages = "", 6000);
        }
        else
          this.serverErrorMessages = 'We don\'t know what\'s wrong';
      }
    );
    
  }



}
