import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SongService } from '../../shared/song.service';
import { AppComponent } from '../../app.component';
import { Router } from "@angular/router"; // Use for jump
import { UserService } from '../../shared/user.service'; // Use for jump

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.scss'],
  // Step 5: add providers
  providers : [SongService]
})
export class SongDetailComponent implements OnInit {

  showSucessMessage: boolean;
  showFailedMessage: boolean;

  song: any;
  review : any;

  constructor(private songService: SongService, private appComponent: AppComponent, private router : Router) { }

  ngOnInit() {
    this.song = this.appComponent.selectedsong;
    console.log(this.song);
    this.songService.searchReview(this.song.ID).subscribe(
      res => { // function 1
        console.log(res);
        this.review = res;
        this.showSucessMessage = true;
        this.showFailedMessage = false;
      },
      err => { // function 2
        this.showSucessMessage = false;
        this.showFailedMessage = true;
      }
    )
  }

  addtoplaylist(){
    this.appComponent.route = 'songs/details_song';
    this.router.navigateByUrl('/playlist/add_to_playlist');
  }

  onLogout(){
    this.router.navigate([this.appComponent.route]);
  }

}
