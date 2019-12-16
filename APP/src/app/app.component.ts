import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  title = 'APP';

  public owner: String; // Username of the person logged in to the website
  public selectedsong: JSON; // Selected songs in TOP10, search, etc.
  public route: String; // Departure path. Used to return back
  public selectedplaylist: JSON; // Selected playlist
  public showdplinfoelete: boolean; // In the details page playlist, can delete songs or not
}