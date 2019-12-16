import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SongService } from '../../shared/song.service';
import { AppComponent } from '../../app.component';
import { Router } from "@angular/router"; // Use for jump
import { UserService } from '../../shared/user.service'; // Use for jump

@Component({
  selector: 'app-search-song',
  templateUrl: './search-song.component.html',
  styleUrls: ['./search-song.component.scss'],
  // Step 5: add providers
  providers : [SongService]
})
export class SearchSongComponent implements OnInit {

  showSucessMessage: boolean;
  serverErrorMessages: string;
  song: any;

  constructor(private songService: SongService, private appComponent: AppComponent, private router : Router) { }

  ngOnInit() {
  }

  // function start
  onSubmit(form: NgForm) {
    this.songService.searchSong(form.value.title).subscribe(
      res => { // function 1
        this.showSucessMessage = true;
        this.serverErrorMessages = '';
        //setTimeout(() => this.showSucessMessage = false, 4000);
        console.log(res);
        this.song = res;
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
    this.appComponent.selectedsong = i;
    this.appComponent.route = 'songs/search_song';
    console.log(this.appComponent.selectedsong);
    console.log(this.appComponent.route);
    this.router.navigateByUrl('/songs/details_song');
  }

  addreview(info){ // Use for jump
    this.appComponent.selectedsong = info;
    this.appComponent.route = 'songs/search_song';
    console.log(this.appComponent.selectedsong);
    console.log(this.appComponent.route);
    this.router.navigateByUrl('/songs/add_review');
  }

  addtoplaylist(info){ // Use for jump
    this.appComponent.selectedsong = info;
    this.appComponent.route = 'songs/search_song';
    console.log(this.appComponent.selectedsong);
    console.log(this.appComponent.route);
    this.router.navigateByUrl('/playlist/add_to_playlist');
  }

}
