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

  song: JSON;

  constructor(private songService: SongService, private appComponent: AppComponent, private router : Router) { }

  ngOnInit() {
    this.song = this.appComponent.selectedsong;
  }

  onLogout(){
    this.router.navigate([this.appComponent.route]);
  }

}
