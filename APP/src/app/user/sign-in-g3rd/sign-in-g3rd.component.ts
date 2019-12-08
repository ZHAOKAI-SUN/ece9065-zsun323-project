import { Component, OnInit } from '@angular/core';
import { AuthService, SocialUser, GoogleLoginProvider,} from 'ng4-social-login';
import { NgForm } from '@angular/forms';
import { UserService } from '../../shared/user.service'
import { User } from '../../shared/user.model';

@Component({
  selector: 'app-sign-in-g3rd',
  templateUrl: './sign-in-g3rd.component.html',
  styleUrls: ['./sign-in-g3rd.component.scss'],
  providers : [UserService]
})
export class SignInG3rdComponent implements OnInit {

  showSucessMessage: boolean;
  serverErrorMessages: string;

  title = 'app';
  public user: any = SocialUser;

  constructor(private socialAuthService: AuthService, private userService: UserService) { }

  ngOnInit() {
  }

  googlelogin() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData) => {
      this.user = userData;
      console.log(this.user);
    })
  }

  
  onSubmit(form: NgForm) {
    form.value.email = this.user.email;
    console.log(form.value.email);
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
