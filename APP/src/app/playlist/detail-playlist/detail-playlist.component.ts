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
  showdelete: boolean;
  songinfo1: any;
  songinfo2: any;

  constructor(private songService: SongService, private userService: UserService, private playlistService: PlaylistService, private appComponent: AppComponent, private router : Router) { }

  ngOnInit () {
    // get current user and current playlist
    this.sbuser = this.appComponent.owner;
    this.sbplaylist = this.appComponent.selectedplaylist;
    this.showdelete = this.appComponent.showdplinfoelete; // show the delete icon or not
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

  remove (key) {
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

  goback () {
    this.router.navigate([this.appComponent.route]);
  }

  infopage (song) {
    this.songService.searchSongbyID(song.SONGid).subscribe(
      res => { // function 1
        console.log(res);
        this.songinfo1 = res;
        this.songinfo2 = {
          "Addname" : this.songinfo1.addname,
          "Addtime": this.songinfo1.addtime,
          "Album": this.songinfo1.album,
          "Ar": this.songinfo1.ar,
          "Artist": this.songinfo1.artist,
          "Comment": this.songinfo1.comment,
          "Genre": this.songinfo1.genre,
          "Header": this.songinfo1.header,
          "ID": this.songinfo1._id,
          "Nor": this.songinfo1.nor,
          "Reserve": this.songinfo1.reserve,
          "Status": this.songinfo1.status,
          "Title": this.songinfo1.title,
          "Track": this.songinfo1.track,
          "Year": this.songinfo1.year
        }
        this.appComponent.selectedsong = this.songinfo2;
        this.appComponent.route = 'playlist/details_playlist';
        this.router.navigateByUrl('/songs/details_song');
      },
      err => { // function 2
      }
    )
  }

}
