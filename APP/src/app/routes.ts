import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

// Every time add a "component", need to add "import" at here first
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NotLogInComponent } from './not-log-in/not-log-in.component';

import { AuthGuard } from './auth/auth.guard';

// After adding "import", add "routes" here
export const appRoutes: Routes = [

    { path: '', component: HomeComponent },

    { path: 'about', component: AboutComponent },

    { path: 'signup', component: UserComponent,
        children: [{ path: '', component: SignUpComponent }]},

    { path: 'login', component: UserComponent,
        children: [{ path: '', component: SignInComponent }]},

    { path: 'userprofile', component: UserProfileComponent,canActivate:[AuthGuard] }, // No access without login, add: canActivate:[AuthGuard] !!!!!!!!!!!!!!!!!!

    { path: 'notlogin', component: NotLogInComponent },

];