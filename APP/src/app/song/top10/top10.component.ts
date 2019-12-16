import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SongService } from '../../shared/song.service';
import { AppComponent } from '../../app.component';
import { Router } from "@angular/router"; // Use for jump
import { UserService } from '../../shared/user.service'; // Use for jump

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

  constructor(private songService: SongService, private appComponent: AppComponent, private router : Router) { }

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

  infopage(i){ // Use for jump
    this.appComponent.selectedsong = i;
    this.appComponent.route = 'songs/TOP10';
    console.log(this.appComponent.selectedsong);
    console.log(this.appComponent.route);
    this.router.navigateByUrl('/songs/details_song');
  }

  addreview(info){ // Use for jump
    this.appComponent.selectedsong = info;
    this.appComponent.route = 'songs/TOP10';
    console.log(this.appComponent.selectedsong);
    console.log(this.appComponent.route);
    this.router.navigateByUrl('/songs/add_review');
  }

  addtoplaylist(info){ // Use for jump
    this.appComponent.selectedsong = info;
    this.appComponent.route = 'songs/TOP10';
    console.log(this.appComponent.selectedsong);
    console.log(this.appComponent.route);
    this.router.navigateByUrl('/playlist/add_to_playlist');
  }

}