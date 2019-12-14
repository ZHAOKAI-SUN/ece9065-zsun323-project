// Built-in
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
// Add Component
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NotLogInComponent } from './not-log-in/not-log-in.component';
import { SignInG3rdComponent } from './user/sign-in-g3rd/sign-in-g3rd.component';
import { SongComponent } from './song/song.component';
import { TOP10Component } from './song/top10/top10.component';
import { SearchSongComponent } from './song/search-song/search-song.component';
import { AddSongComponent } from './song/add-song/add-song.component';

// Routes
import { appRoutes } from './routes';
// Services
import { UserService } from './shared/user.service';
import { SongService } from './shared/song.service';
// Other
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from 'ng4-social-login'; // 3rd log in

//3 party
const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('1014484554576-6b96ie10lcsgfqh3efhl12qhct1abgj6.apps.googleusercontent.com')
  }
], false);
export function provideConfig() {
  return config;
}


// Add Module
@NgModule({
  declarations: [    //// declarations start
    AppComponent,
    AboutComponent,
    HomeComponent,
    UserComponent,
    SignUpComponent,
    UserProfileComponent,
    SignInComponent,
    NotLogInComponent,
    SignInG3rdComponent,
    SongComponent,
    TOP10Component,
    SearchSongComponent,
    AddSongComponent
  ],//STOP
  imports: [    //// imports start
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    SocialLoginModule
  ],//STOP
  providers: [    //// providers start
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide:AuthServiceConfig,
      useFactory: provideConfig
    },
    AuthGuard,
    UserService
  ],//STOP
  bootstrap: [    //// bootstrap start
    AppComponent
  ]//STOP
})
export class AppModule { }
