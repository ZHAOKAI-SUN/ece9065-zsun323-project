import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { UserService } from '../../shared/user.service';

import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(private userService: UserService, private router : Router, private appComponent: AppComponent) { }

  model ={
    email :'',
    password:''
  };

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages: string;

  ngOnInit() {
    if(this.userService.isLoggedIn())
    this.router.navigateByUrl('/userprofile'); // !!!!!!!!!! Important function: jump if you logged in !!!!!!!!!!
  }

  onSubmit(form : NgForm){
    this.userService.login(form.value).subscribe(
      res => {
        this.userService.setToken(res['token']);
        this.router.navigateByUrl('/'); // !!!!!!!!!! Important function: jump if you succeed !!!!!!!!!!
        // Create global variable: owner
        this.appComponent.owner = this.model.email;
        console.log(this.appComponent.owner);
      },
      err => {
        this.serverErrorMessages = err.error.message; // serverErrorMessages, related to HTML
      }
    );
  }

  ReSend(form : NgForm){
    this.userService.resend(form.value).subscribe(
      res => {
        this.serverErrorMessages = "Already resend email !";
      },
      err => {

      }
    );
  }

}
