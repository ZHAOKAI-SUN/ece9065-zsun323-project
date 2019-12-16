import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SongService } from '../../shared/song.service';
import { AppComponent } from '../../app.component';
import { Router } from "@angular/router"; // Use for jump
import { UserService } from '../../shared/user.service';
import { PlaylistService } from '../../shared/playlist.service';

@Component({
  selector: 'app-my-playlist',
  templateUrl: './my-playlist.component.html',
  styleUrls: ['./my-playlist.component.scss'],
  // Step 5: add providers
  providers : [UserService, SongService, PlaylistService]
})
export class MyPlaylistComponent implements OnInit {

  showSucessMessage: boolean;
  showFailedMessage: boolean;
  serverErrorMessages: string;

  playlist : any;
  newstatus : any;

  constructor(private songService: SongService, private userService: UserService, private playlistService: PlaylistService, private appComponent: AppComponent, private router : Router) { }

  ngOnInit() {

    console.log(this.appComponent.owner);
    this.playlistService.searchmyPlaylist(this.appComponent.owner).subscribe(
      res => { // function 1
        console.log(res);
        this.playlist = res;
        this.showSucessMessage = true;
        this.showFailedMessage = false;
      },
      err => { // function 2
        this.showSucessMessage = false;
        this.showFailedMessage = true;
      }
    )
  }

  createPL(){
    this.router.navigateByUrl('/playlist/add_playlist');
  }

  infopage(i){ // Use for jump
    console.log("jump to info");
    this.appComponent.selectedplaylist = i;
    this.router.navigateByUrl('playlist/details_playlist');
    this.appComponent.showdplinfoelete = true; // Allow deletion if from "My Playlist"
  }

  changestatus(i){ // Use for jump

    // Judge the current state and change to the opposite
    if (i.Status == "Private") {
      this.newstatus = {
        "status" : "Public"
      }
    } else {
      this.newstatus = {
        "status" : "Private"
      }
    }
    // Update playlist status
    this.playlistService.updatePlaylist(i.ID, this.newstatus).subscribe(
      res => { // function 1
        console.log("1");
        this.ngOnInit();
      },
      err => { // function 2
        console.log("2");
      }
    );
  }

  edit(i){ // Use for jump
    console.log("jump to edit");
    this.appComponent.selectedplaylist = i;
    this.router.navigateByUrl('/playlist/edit_playlist');
  }



}
