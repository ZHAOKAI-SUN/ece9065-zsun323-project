import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SongService } from '../../shared/song.service';
import { AppComponent } from '../../app.component';
import { Router } from "@angular/router"; // Use for jump
import { UserService } from '../../shared/user.service';
import { PlaylistService } from '../../shared/playlist.service';

@Component({
  selector: 'app-edit-playlist',
  templateUrl: './edit-playlist.component.html',
  styleUrls: ['./edit-playlist.component.scss'],
  // Step 5: add providers
  providers : [UserService, SongService, PlaylistService]
})
export class EditPlaylistComponent implements OnInit {

  showSucessMessage: boolean;
  showFailedMessage: boolean;
  serverErrorMessages: string;
  editplaylist: any;

  constructor(private songService: SongService, private userService: UserService, private playlistService: PlaylistService, private appComponent: AppComponent, private router : Router) { }

  ngOnInit() {
    console.log(this.appComponent.selectedplaylist);
    this.editplaylist = this.appComponent.selectedplaylist;
  }

  // function start
  onSubmit(form: NgForm) {

    if ( form.value.pname == "") {
      form.value.pname = this.editplaylist.Pname;
    };
    if ( form.value.description == "") {
      form.value.description = this.editplaylist.Description;
    };
    // Update playlist status
    this.playlistService.updatePlaylist(this.editplaylist.ID, form.value).subscribe(
      res => { // function 1
        console.log("yes");
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 6000);
        this.resetForm(form);
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
