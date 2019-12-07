import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-not-log-in',
  templateUrl: './not-log-in.component.html',
  styleUrls: ['./not-log-in.component.scss']
})
export class NotLogInComponent implements OnInit {

  constructor(private userService: UserService,private router : Router) { }

  ngOnInit() {
  }

  onSubmit(){
    this.router.navigateByUrl('/login');
  }

}