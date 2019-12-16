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
  plinfo: any;
  showSucessMessage: boolean;
  showFailedMessage: boolean;
  serverErrorMessages: string;

  constructor(private songService: SongService, private userService: UserService, private playlistService: PlaylistService, private appComponent: AppComponent, private router : Router) { }

  ngOnInit() {
    // get current user and current playlist
    this.sbuser = this.appComponent.owner;
    this.sbplaylist = this.appComponent.selectedplaylist;
    console.log(this.sbuser);
    console.log(this.sbplaylist);

    this.playlistService.searchPLinfo(this.sbplaylist.ID).subscribe(
      res => { // function 1
        console.log(res);
        this.plinfo = res;
        this.showSucessMessage = true;
        this.showFailedMessage = false;
      },
      err => { // function 2
        this.showSucessMessage = false;
        this.showFailedMessage = true;
      }
    )
  }

  remove(key) {
    // Update playlist status
    console.log(key.ID);
    this.playlistService.deletePlaylist(key.ID).subscribe(
      res => { // function 1
        console.log("yes");
        //this.showSucessMessage = true;
        //setTimeout(() => this.showSucessMessage = false, 6000);
        this.ngOnInit();
      },
      err => { // function 2
        console.log("no");
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else
          this.serverErrorMessages = 'We don\'t know what\'s wrong';
      }
    );
  }

}
