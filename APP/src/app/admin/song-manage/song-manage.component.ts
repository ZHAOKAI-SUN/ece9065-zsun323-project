import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppComponent } from '../../app.component';
import { Router } from "@angular/router"; // Use for jump
import { SongService } from '../../shared/song.service'; // Use for jump

@Component({
  selector: 'app-song-manage',
  templateUrl: './song-manage.component.html',
  styleUrls: ['./song-manage.component.scss']
})
export class SongManageComponent implements OnInit {

  songlist : any;
  newsong : any;

  constructor(private songService: SongService, private router : Router, private appComponent: AppComponent) { }

  ngOnInit() {
    this.songService.allSong().subscribe(
      res => { // function 1
        console.log(res);
        this.songlist = res;
      },
      err => { // function 2
        // No need to fill in, because TOP10 will definitely have results
      }
    )
  }

  changetoNormal(i) {
    console.log(i._id);
    this.newsong = {
      "status" : "Normal"
    }
    // Update user
    this.songService.updateSong(i._id, this.newsong).subscribe(
      res => { // function 1
        console.log("1");
        this.ngOnInit();
      },
      err => { // function 2
        console.log("2");
      }
    );
  }

  changetoHidden(i) {
    console.log(i._id);
    this.newsong = {
      "status" : "Hidden"
    }
    // Update user
    this.songService.updateSong(i._id, this.newsong).subscribe(
      res => { // function 1
        console.log("1");
        this.ngOnInit();
      },
      err => { // function 2
        console.log("2");
      }
    );
  }

  deletesong(i) {
    console.log(i._id);
    // Update user
    this.songService.deletesong(i._id).subscribe(
      res => { // function 1
        console.log("1");
        this.ngOnInit();
      },
      err => { // function 2
        console.log("2");
      }
    );
  }

}
