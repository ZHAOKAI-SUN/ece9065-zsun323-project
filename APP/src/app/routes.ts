import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

// Every time add a "component", need to add "import" at here first
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { SignInG3rdComponent } from './user/sign-in-g3rd/sign-in-g3rd.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NotLogInComponent } from './not-log-in/not-log-in.component';
import { SongComponent } from './song/song.component';
import { TOP10Component } from './song/top10/top10.component';
import { SearchSongComponent } from './song/search-song/search-song.component';
import { AddSongComponent } from './song/add-song/add-song.component';
import { SongDetailComponent } from './song/song-detail/song-detail.component';

import { AuthGuard } from './auth/auth.guard';

// After adding "import", add "routes" here
export const appRoutes: Routes = [

    { path: '', component: HomeComponent },

    { path: 'about', component: AboutComponent },

    { path: 'songs', component: SongComponent },

    { path: 'signup', component: UserComponent,
            children: [{ path: '', component: SignUpComponent }]},

    { path: 'login', component: UserComponent,
            children: [{ path: '', component: SignInComponent }]},

    { path: 'login3rd', component: UserComponent,
            children: [{ path: '', component: SignInG3rdComponent }]},

    { path: 'userprofile', component: UserProfileComponent,canActivate:[AuthGuard] }, // No access without login, add: canActivate:[AuthGuard] !!!!!!!!!!!!!!!!!!

    { path: 'notlogin', component: NotLogInComponent }, // Account not logged in, automatically jump to this path  !!!!!!!!!!!!!!!!!!

    { path: 'songs/TOP10', component: SongComponent,
            children: [{ path: '', component: TOP10Component }]},

    { path: 'songs/search_song', component: SongComponent,
            children: [{ path: '', component: SearchSongComponent }]},

    { path: 'songs/add_song', component: SongComponent,
            children: [{ path: '', component: AddSongComponent, canActivate:[AuthGuard] }]}, // No access without login

    { path: 'songs/details_song', component: SongComponent,
            children: [{ path: '', component: SongDetailComponent }]},

];