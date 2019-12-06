import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

// Step 4: add service to component
import { UserService } from '../../shared/user.service'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  // Step 5: add providers
  providers : [UserService]
})
export class SignUpComponent implements OnInit {
      // related to: sign-up.component.html
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSucessMessage: boolean;
  serverErrorMessages: string;

  // Step 6: add constructor
  constructor(private userService: UserService) {}

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.userService.postUser(form.value).subscribe(
      res => { // function 1
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.resetForm(form);
      },
      err => { // function 2
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else
          this.serverErrorMessages = 'We don\'t know what\'s wrong';
      }
    );
  }

  resetForm(form: NgForm) {
    this.userService.selectedUser = {
      email: '',
      password: '',
      status: '',
      level: '',
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }

}
