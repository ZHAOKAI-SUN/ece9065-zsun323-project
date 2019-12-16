import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SongService } from '../../shared/song.service';
import { AppComponent } from '../../app.component';
import { Router } from "@angular/router"; // Use for jump
import { UserService } from '../../shared/user.service';
import { PlaylistService } from 'src/app/shared/playlist.service';

@Component({
  selector: 'app-search-playlist',
  templateUrl: './search-playlist.component.html',
  styleUrls: ['./search-playlist.component.scss'],
  // Step 5: add providers
  providers : [SongService, UserService, PlaylistService]
})
export class SearchPlaylistComponent implements OnInit {

  showSucessMessage: boolean;
  serverErrorMessages: string;
  playlist: any;

  constructor(private songService: SongService, private userService: UserService, private playlistService: PlaylistService, private appComponent: AppComponent, private router : Router) { }

  ngOnInit() {
  }

  // function start
  onSubmit(form: NgForm) {
    this.playlistService.searchallPlaylist(form.value.title).subscribe(
      res => { // function 1
        this.showSucessMessage = true;
        this.serverErrorMessages = '';
        //setTimeout(() => this.showSucessMessage = false, 4000);
        console.log(res);
        this.playlist = res;
      },
      err => { // function 2
        if (err.status === 404) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else
          this.serverErrorMessages = 'We don\'t know what\'s wrong';
      }
    );
  }

  infopage(i){ // Use for jump
    console.log("jump to info");
    this.appComponent.selectedplaylist = i;
    this.appComponent.route = 'playlist/search_playlist';
    this.router.navigateByUrl('playlist/details_playlist');
    this.appComponent.showdplinfoelete = false; // Don't allow deletion if from "Search Playlist"
  }

}
