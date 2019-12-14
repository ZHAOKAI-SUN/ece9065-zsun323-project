import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

// Step 4: add service to component
import { SongService } from '../../shared/song.service';

import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.scss'],
  // Step 5: add providers
  providers : [SongService]
})
export class AddSongComponent implements OnInit {

  showSucessMessage: boolean;
  serverErrorMessages: string;

  constructor(private songService: SongService, private appComponent: AppComponent) { }

  ngOnInit() {
  }

  // function start
  onSubmit(form: NgForm) {
    // Put global variables into form before form transfer
    form.value.addname = this.appComponent.owner;
    this.songService.postSong(form.value).subscribe(
      res => { // function 1
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
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
    this.songService.selectedSong = {
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
      addname: this.appComponent.owner,
      addtime: null,
      title0artist: ''
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }

}
