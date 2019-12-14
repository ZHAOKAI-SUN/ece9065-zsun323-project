import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SongService } from '../../shared/song.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-top10',
  templateUrl: './top10.component.html',
  styleUrls: ['./top10.component.scss'],
  // Step 5: add providers
  providers : [SongService]
})
export class TOP10Component implements OnInit {

  showSucessMessage: boolean;
  serverErrorMessages: string;
  song: any;

  constructor(private songService: SongService, private appComponent: AppComponent) { }

  ngOnInit() {
    // When opening the page, load ngFor
    this.songService.topSong().subscribe(
      res => { // function 1
        console.log(res);
        this.song = res;
      },
      err => { // function 2
        // No need to fill in, because TOP10 will definitely have results
      }
    )
  }
}
