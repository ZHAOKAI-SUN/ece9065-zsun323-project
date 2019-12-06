import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

// Every time add a "component", need to add "import" at here first
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';

// After adding "import", add "routes" here
export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'signup', component: UserComponent,
        children: [{ path: '', component: SignUpComponent }]},
];