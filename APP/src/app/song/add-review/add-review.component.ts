import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

// Step 4: add service to component
import { SongService } from '../../shared/song.service';

import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.scss'],
  // Step 5: add providers
  providers : [SongService]
})
export class AddReviewComponent implements OnInit {

  showSucessMessage: boolean;
  serverErrorMessages: string;

  song: any;
  songname: any;
  newnor: any;
  newrate: any;
  newar:any;
  newjson: any;

  constructor(private songService: SongService, private appComponent: AppComponent) { }

  ngOnInit() {
    this.song = this.appComponent.selectedsong;
    console.log(this.appComponent.owner);
    console.log(this.song.Title);
    console.log(this.song.ID);
    this.songname = this.song.Title;
  }

  // function start
  onSubmit(form: NgForm) {
    // Put global variables into form before form transfer
    form.value.addname = this.appComponent.owner;
    form.value.title = this.song.Title;
    form.value.titleid = this.song.ID;
    this.newrate = form.value.rate;
    this.songService.createReview(form.value).subscribe(
      res => { // function 1
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.resetForm(form);
        this.calculate();
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
    this.songService.selectedReview = {
      title: '',
      titleid: '',
      addname: '',
      addtime: null,
      rate: null,
      text: ''
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }

  calculate() {

    this.newnor = this.song.Nor+1; // New "nor" = "nor" + 1
    // this.song.Ar = Original average rating
    // this.song.Nor = Original numbers of review
    // this.newrate = New rating
    // this.newnor = New numbers of review
    // this.newar = New average rating
    this.newar = String((((parseFloat(this.song.Ar) * parseFloat(this.song.Nor)) + parseFloat(this.newrate)) / parseFloat(this.newnor)).toFixed(2))
    this.newjson = {
      "ar"  : this.newar,
      "nor" : this.newnor
    }

    this.songService.updateSong(this.song.ID, this.newjson).subscribe(
      res => { // function 1
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
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

}
