import { Component, OnInit } from '@angular/core';
import { AuthService, SocialUser, GoogleLoginProvider,} from 'ng4-social-login';

@Component({
  selector: 'app-sign-in-g3rd',
  templateUrl: './sign-in-g3rd.component.html',
  styleUrls: ['./sign-in-g3rd.component.scss']
})
export class SignInG3rdComponent implements OnInit {

  title = 'app';
  public user: any = SocialUser;

  constructor(private socialAuthService: AuthService) { }

  ngOnInit() {
  }

  googlelogin() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData) => {
      this.user = userData;
    })
  }

}
