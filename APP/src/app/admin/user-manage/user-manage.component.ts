import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppComponent } from '../../app.component';
import { Router } from "@angular/router"; // Use for jump
import { UserService } from '../../shared/user.service'; // Use for jump

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.scss']
})
export class UserManageComponent implements OnInit {

  userlist : any;
  newusers : any;

  constructor(private userService: UserService, private router : Router, private appComponent: AppComponent) { }

  ngOnInit() {
    this.userService.allUser().subscribe(
      res => { // function 1
        console.log(res);
        this.userlist = res;
      },
      err => { // function 2
        // No need to fill in, because TOP10 will definitely have results
      }
    )
  }

  changetoActivate(i){ // Use for jump
    console.log(i._id);
    this.newusers = {
      "status" : "Normal"
    }
    if (i.email == this.appComponent.owner) {
      console.log("can change yourself");
      alert('You cannot change your own status !');
      return;
    }
    if (i.email == "admin@uwo.ca") {
      console.log("can change yourself");
      alert('You are not authorized to change the status of the SUPER administrator !');
      return;
    }
    // Update user
    this.userService.updateUser(i._id, this.newusers).subscribe(
      res => { // function 1
        console.log("1");
        this.ngOnInit();
      },
      err => { // function 2
        console.log("2");
      }
    );
  }

  changetoLock(i){ // Use for jump
    console.log(i._id);
    this.newusers = {
      "status" : "Locked"
    }
    if (i.email == this.appComponent.owner) {
      console.log("can change yourself");
      alert('You cannot change your own status !');
      return;
    }
    if (i.email == "admin@uwo.ca") {
      console.log("can change yourself");
      alert('You are not authorized to change the status of the SUPER administrator !');
      return;
    }
    // Update user
    this.userService.updateUser(i._id, this.newusers).subscribe(
      res => { // function 1
        console.log("1");
        this.ngOnInit();
      },
      err => { // function 2
        console.log("2");
      }
    );
  }

  changetoNormal(i){ // Use for jump
    console.log(i._id);
    this.newusers = {
      "level" : "Normal"
    }
    if (i.email == this.appComponent.owner) {
      console.log("can change yourself");
      alert('You cannot change your own level !');
      return;
    }
    if (i.email == "admin@uwo.ca") {
      console.log("can change yourself");
      alert('You are not authorized to change the level of the SUPER administrator !');
      return;
    }
    // Update user
    this.userService.updateUser(i._id, this.newusers).subscribe(
      res => { // function 1
        console.log("1");
        this.ngOnInit();
      },
      err => { // function 2
        console.log("2");
      }
    );
  }

  changetoAdmin(i){ // Use for jump
    console.log(i._id);
    this.newusers = {
      "level" : "Admin"
    }
    if (i.email == this.appComponent.owner) {
      console.log("can change yourself");
      alert('You cannot change your own level !');
      return;
    }
    if (i.email == "admin@uwo.ca") {
      console.log("can change yourself");
      alert('You are not authorized to change the level of the SUPER administrator !');
      return;
    }
    // Update user
    this.userService.updateUser(i._id, this.newusers).subscribe(
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
