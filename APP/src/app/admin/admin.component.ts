import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  godmode : boolean;

  constructor(private appComponent: AppComponent) { }

  ngOnInit() {
    this.godmode = this.appComponent.godmode;
  }

}
