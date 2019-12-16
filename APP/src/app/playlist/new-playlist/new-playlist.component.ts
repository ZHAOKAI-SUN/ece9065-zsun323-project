import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";

// Step 4: add service to component
import { SongService } from '../../shared/song.service';
import { UserService } from '../../shared/user.service';
import { AppComponent } from '../../app.component';
import { PlaylistService } from 'src/app/shared/playlist.service';

@Component({
  selector: 'app-new-playlist',
  templateUrl: './new-playlist.component.html',
  styleUrls: ['./new-playlist.component.scss'],
  // Step 5: add providers
  providers : [SongService, UserService, PlaylistService]
})
export class NewPlaylistComponent implements OnInit {

  showSucessMessage: boolean;
  serverErrorMessages: string;

  constructor(private songService: SongService, private userService: UserService, private playlistService: PlaylistService, private appComponent: AppComponent, private router : Router) { }

  ngOnInit() {
  }

  // function start
  onSubmit(form: NgForm) {
    // Put global variables into form before form transfer
    form.value.addname = this.appComponent.owner;
    this.playlistService.createPlaylist(form.value).subscribe(
      res => { // function 1
        console.log(res);
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 6000);
        this.resetForm(form);
      },
      err => { // function 2
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else
          this.serverErrorMessages = 'We don\'t know what\'s wrong';
      }
    );
  }

  resetForm(form: NgForm) {
    this.playlistService.selectedPlaylist = {
      pname: '',
      description: '',
      addname: '',
      addtime: null,
      status: '',
      pname0addname: ''
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }

  backtoPL(){
    this.router.navigateByUrl('/playlist/my_playlist');
  }

}
